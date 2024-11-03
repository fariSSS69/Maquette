import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CyclisteImage from '../../assets/images/cycliste.jpg';

const HeaderProfile = () => {
  return (
    <View style={styles.container}>
      <Image source={CyclisteImage} style={styles.profileImage} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Jonas Darbellay</Text>
        <Text style={styles.details}>
          10 juin 2024 à 16:50 - Annecy, Haute-Savoie Trail - Seuil en côte pour préparer un Trail - Seuil en côte pour preparer un Trail de 90km 5500m D+ le 11.10.2024
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', 
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexWrap: 'wrap',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#f8f8f8',
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    flexShrink: 1,
  },
  name: { 
    fontWeight: 'bold', 
    fontSize: 16, 
  },
  details: { 
    color: 'gray',
    fontSize: 12,
    lineHeight: 16,
    flexWrap: 'wrap',
  },
});

export default HeaderProfile;
