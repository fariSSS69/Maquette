import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SessionStats = ({ distance, elevation, duration }) => {
  return (
    <View style={styles.container}>
      {/* Bloc principal gris avec les bords arrondis */}
      <View style={styles.statsContainer}>
        
        {/* Ligne avec Distance, Dénivelé et Durée */}
        <View style={styles.row}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Distance</Text>
            <Text style={styles.statValue}>{distance} km</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Dénivelé</Text>
            <Text style={styles.statValue}>{elevation} m</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Durée</Text>
            <Text style={styles.statValue}>{duration}</Text>
          </View>
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  statsContainer: {
    backgroundColor: '#ededed', // Fond gris pour le bloc principal
    borderRadius: 25,
    padding: 5,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: '#000', // Couleur grise pour le label
    marginBottom: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000', // Couleur noire pour la valeur
  },
});

export default SessionStats;
