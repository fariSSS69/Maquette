// index.js
import * as FileSystem from 'expo-file-system';
import FitParser from 'fit-file-parser';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
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

  const loadFitData = async () => {
    try {
      const url = 'https://firebasestorage.googleapis.com/v0/b/agrefiege-9e11a.appspot.com/o/premierfit.fit?alt=media';
      const fitFilePath = `${FileSystem.documentDirectory}premierfit.fit`;
      
      await FileSystem.downloadAsync(url, fitFilePath);
      const fileExists = await FileSystem.getInfoAsync(fitFilePath);

      if (!fileExists.exists) {
        console.error("Le fichier premierfit.fit est introuvable après le téléchargement :", fitFilePath);
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

          const totalSeconds = data.records.length;
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const totalDuration = `${hours}h${minutes}m`;

          const heartRates = data.records
            .map(record => record.heart_rate)
            .filter(heart_rate => heart_rate !== undefined);
          const avgHeartRate = heartRates.length > 0
            ? (heartRates.reduce((sum, heart_rate) => sum + heart_rate, 0) / heartRates.length).toFixed(0)
            : "N/A";

          const maxElevation = data.records
            .map(record => record.altitude)
            .filter(altitude => altitude !== undefined)
            .reduce((max, altitude) => Math.max(max, altitude), 0);

          const parsedCoordinates = data.records
            .filter(record => record.position_lat && record.position_long)
            .map(record => ({
              latitude: record.position_lat,
              longitude: record.position_long,
            }));

          setCoordinates(parsedCoordinates);

          setSessionData({
            distance: totalDistanceKm.toFixed(2),
            elevation: maxElevation,
            duration: totalDuration,
            avgHeartRate: avgHeartRate,
            comment: "Difficile mais super content de cette séance !",
            calories: 500,
            avgPace: "5:30",
            maxSpeed: 12.5,
          });
        }
      });
    } catch (error) {
      console.error("Erreur lors du téléchargement ou de la lecture du fichier FIT :", error);
    }
  };

  useEffect(() => {
    loadFitData();
  }, []);

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
    flex: 0.9, // Ajustes la hauteur pour ne pas occuper tout l’écran
    flexDirection: 'row',
    marginTop: -5, // Espace entre l’App Bar et les composants
  },
  mapContainer: {
    flex: 1, // Prend l'espace restant dans le conteneur rowContainer
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 5,
  },
  additionalStatsContainer: {
    flex: 1, // Prend l'espace restant dans le conteneur rowContainer
    backgroundColor: '#ededed',
    borderRadius: 20,
    marginLeft: 5,
  },
});


export default App;