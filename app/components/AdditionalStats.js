// components/AdditionalStats.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height;

const AdditionalStats = ({ avgHeartRate, elevation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <View style={[styles.iconBox, { backgroundColor: '#ff0033' }]}>
          <FontAwesome5 name="heartbeat" size={32} color="#fff" />
        </View>
        <View style={[styles.iconBox, { backgroundColor: '#3333cc' }]}>
          <MaterialCommunityIcons name="chart-line" size={32} color="#fff" />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValueRed}>{avgHeartRate}</Text>
          <Text style={styles.statUnitRed}>bpm</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValueBlue}>{elevation}</Text>
          <Text style={styles.statUnitBlue}>m</Text>
        </View>
      </View>

      <View style={styles.labelRow}>
        <Text
          style={styles.statLabelRed}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          Moyenne
        </Text>
        <Text
          style={styles.statLabelBlue}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          Moyenne
        </Text>
      </View>

      <View style={styles.alpiContainer}>
        <Text style={styles.alpiText}>Séance prévue par ALPI</Text>
      </View>

      {/* Rectangle blanc avec la barre horizontale et les barres verticales chevauchant légèrement */}
      <View style={styles.emptyBox}>
        <View style={styles.weekProgressBar} />
        <View style={styles.daysContainer}>
          <View style={styles.dayBar} />
          <View style={styles.dayBar} />
          <View style={styles.dayBar} />
          <View style={styles.dayBar} />
          <View style={styles.dayBar} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ededed',
    borderRadius: 20,
    padding: 15,
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
  },
  iconBox: {
    width: '48%',
    height: '80%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
    marginBottom: 10,
  },
  statBox: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statValueRed: {
    color: '#ff0033',
    fontSize: 32,
    fontWeight: 'bold',
  },
  statUnitRed: {
    color: '#ff0033',
    fontSize: 20,
  },
  statValueBlue: {
    color: '#3333cc',
    fontSize: 32,
    fontWeight: 'bold',
  },
  statUnitBlue: {
    color: '#3333cc',
    fontSize: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  statLabelRed: {
    color: '#ff0033',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    width: '48%',
  },
  statLabelBlue: {
    color: '#3333cc',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    width: '48%',
  },
  alpiContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 5,
  },
  alpiText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  weekProgressBar: {
    width: '90%',
    height: 10,
    backgroundColor: '#ff0033',
    borderRadius: 5,
    marginBottom: -5, // Positionne la barre légèrement au-dessus
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '90%',
    position: 'absolute',
    bottom: 15, // Ajuste les barres verticales pour qu'elles commencent à la barre horizontale
  },
  dayBar: {
    width: 5,
    height: Math.min(screenHeight * 0.07, 50),
    backgroundColor: '#ff0033',
    borderRadius: 2,
    marginHorizontal: 2,
  },
});

export default AdditionalStats;
