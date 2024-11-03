import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { parseFitFile } from '../../utils/parseFitFile';
import HeaderProfile from '../components/HeaderProfile';
import SummaryText from '../components/SummaryText';
import SessionStats from '../components/SessionStats';

const App = () => {
  const [sessionData, setSessionData] = useState({
    distance: 0,
    elevation: 0,
    duration: "0h0m",
    avgHeartRate: 0,
    comment: "Difficile mais super content de cette séance !",
  });

  const loadFitData = async () => {
    try {
      // Charger le fichier depuis les assets et le copier dans documentDirectory
      const asset = Asset.fromModule(require('../../assets/premierfit.fit'));
      await asset.downloadAsync(); // Télécharge l'asset si nécessaire

      const fitFileUri = `${FileSystem.documentDirectory}tonFichier.fit`;
      await FileSystem.copyAsync({
        from: asset.localUri,
        to: fitFileUri,
      });

      // Lire et parser le fichier .fit depuis documentDirectory
      const data = await parseFitFile(fitFileUri);

      if (data && data.records) {
        const distance = data.records.reduce((sum, record) => sum + (record.distance || 0), 0).toFixed(2); // km
        const elevation = data.records.reduce((max, record) => Math.max(max, record.altitude || 0), 0); // mètres
        const duration = `${Math.floor(data.records.length / 60)}h${data.records.length % 60}m`; // heures et minutes
        const avgHeartRate = (data.records.reduce((sum, record) => sum + (record.heart_rate || 0), 0) / data.records.length).toFixed(0); // bpm

        setSessionData({
          distance,
          elevation,
          duration,
          avgHeartRate,
          comment: "Difficile mais super content de cette séance !",
        });
      } else {
        console.error("Erreur : Les données FIT sont vides ou mal formatées.");
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données FIT :", error);
    }
  };

  useEffect(() => {
    loadFitData();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderProfile />
      <SessionStats
        distance={sessionData.distance}
        elevation={sessionData.elevation}
        duration={sessionData.duration}
        avgHeartRate={sessionData.avgHeartRate}
      />
      <SummaryText comment={sessionData.comment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
});

export default App;
