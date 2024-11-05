import * as FileSystem from 'expo-file-system';
import FitParser from 'fit-file-parser';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import HeaderProfile from '../components/HeaderProfile';
import SummaryText from '../components/SummaryText';
import SessionStats from '../components/SessionStats';
import HEREMap from '../components/Heremap';
import AdditionalStats from '../components/AdditionalStats';
import { Buffer } from 'buffer';

const App = () => {
  const [sessionData, setSessionData] = useState({
    distance: 0,
    elevation: 0,
    duration: "0h0m",
    avgHeartRate: 0,
    comment: "Difficile mais super content de cette séance !",
    calories: 500,
    avgPace: "5:30",
    maxSpeed: 12.5,
  });

  const [coordinates, setCoordinates] = useState([]);
  const [isPrimaryFile, setIsPrimaryFile] = useState(true);

  const primaryUrl = 'https://firebasestorage.googleapis.com/v0/b/agrefiege-9e11a.appspot.com/o/premierfit.fit?alt=media';
  const secondaryUrl = 'https://firebasestorage.googleapis.com/v0/b/agrefiege-9e11a.appspot.com/o/deuxiemefit.fit?alt=media&token=c0ff0d3a-96af-4cfe-b586-2617db8b271e';

  const loadFitData = async (url) => {
    try {
      const fitFilePath = `${FileSystem.documentDirectory}tempFitFile.fit`;

      await FileSystem.downloadAsync(url, fitFilePath);
      const fileExists = await FileSystem.getInfoAsync(fitFilePath);

      if (!fileExists.exists) {
        console.error("Le fichier FIT est introuvable après le téléchargement :", fitFilePath);
        return;
      }

      const fileDataBase64 = await FileSystem.readAsStringAsync(fitFilePath, { encoding: FileSystem.EncodingType.Base64 });
      const fileData = Buffer.from(fileDataBase64, 'base64');

      const fitParser = new FitParser({ force: true });

      fitParser.parse(fileData, (error, data) => {
        if (error) {
          console.error("Erreur lors du parsing du fichier FIT:", error);
        } else {
          const totalDistanceMeters = data.records[data.records.length - 1].distance || 0;
          const totalDistanceKm = totalDistanceMeters / 1000;

          let averagePaceMinutes;
          if (totalDistanceKm > 0 && data.session && data.session.avg_speed) {
            const avgSpeedKph = data.session.avg_speed * 3.6;
            averagePaceMinutes = 60 / avgSpeedKph;
          }

          let totalDuration;

          if (averagePaceMinutes && totalDistanceKm > 0) {
            const totalMinutes = totalDistanceKm * averagePaceMinutes;
            const hours = Math.floor(totalMinutes / 60);
            const minutes = Math.floor(totalMinutes % 60);
            const seconds = Math.round((totalMinutes * 60) % 60);

            totalDuration = `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
          } else {
            const firstTimestamp = data.records[0]?.timestamp;
            const lastTimestamp = data.records[data.records.length - 1]?.timestamp;

            if (firstTimestamp && lastTimestamp) {
              const startTime = new Date(firstTimestamp);
              const endTime = new Date(lastTimestamp);

              const totalSeconds = (endTime - startTime) / 1000;
              const hours = Math.floor(totalSeconds / 3600);
              const minutes = Math.floor((totalSeconds % 3600) / 60);
              const seconds = Math.floor(totalSeconds % 60);

              totalDuration = `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
            } else {
              totalDuration = "Durée non disponible";
            }
          }

          const heartRates = data.records
            .map(record => record.heart_rate)
            .filter(heart_rate => heart_rate !== undefined);
          const avgHeartRate = heartRates.length > 0
            ? (heartRates.reduce((sum, heart_rate) => sum + heart_rate, 0) / heartRates.length).toFixed(0)
            : "N/A";

          let totalElevationGain = 0;
          const altitudes = data.records
            .map(record => record.altitude || record.enhanced_altitude)
            .filter(altitude => altitude !== undefined);

          for (let i = 1; i < altitudes.length; i++) {
            const altitudeGain = altitudes[i] - altitudes[i - 1];
            if (altitudeGain > 0) {
              totalElevationGain += altitudeGain;
            }
          }

          const parsedCoordinates = data.records
            .filter(record => record.position_lat && record.position_long)
            .map(record => ({
              latitude: record.position_lat,
              longitude: record.position_long,
            }));

          setCoordinates(parsedCoordinates);

          setSessionData({
            distance: totalDistanceKm.toFixed(2),
            elevation: totalElevationGain.toFixed(0),
            duration: totalDuration,
            avgHeartRate: avgHeartRate,
            comment: "Difficile mais super content de cette séance !",
            calories: 500,
            avgPace: averagePaceMinutes ? `${Math.floor(averagePaceMinutes)}:${Math.round((averagePaceMinutes % 1) * 60).toString().padStart(2, "0")}` : "N/A",
            maxSpeed: averagePaceMinutes ? (60 / averagePaceMinutes).toFixed(2) : "N/A",
          });
        }
      });
    } catch (error) {
      console.error("Erreur lors du téléchargement ou de la lecture du fichier FIT :", error);
    }
  };




  useEffect(() => {
    loadFitData(primaryUrl);
  }, []);

  const toggleFitFile = () => {
    const newUrl = isPrimaryFile ? secondaryUrl : primaryUrl;
    loadFitData(newUrl);
    setIsPrimaryFile(!isPrimaryFile);
  };

  return (
    <View style={styles.container}>
      <HeaderProfile />
      <SummaryText comment={sessionData.comment} />
      <SessionStats
        distance={sessionData.distance}
        elevation={sessionData.elevation}
        duration={sessionData.duration}
        avgHeartRate={sessionData.avgHeartRate}
      />
      <View style={styles.rowContainer}>
        <View style={styles.mapContainer}>
          {coordinates.length > 0 && <HEREMap coordinates={coordinates} />}
        </View>
        <View style={styles.additionalStatsContainer}>
          <AdditionalStats
            avgHeartRate={sessionData.avgHeartRate}
            elevation={sessionData.elevation}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Changer de fichier FIT"
          onPress={toggleFitFile}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  rowContainer: {
    flex: 0.9,
    flexDirection: 'row',
    marginTop: -5,
  },
  mapContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 5,
  },
  additionalStatsContainer: {
    flex: 1,
    backgroundColor: '#ededed',
    borderRadius: 20,
    marginLeft: 5,
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: 'center',
    width: '80%',
  },
});

export default App;
