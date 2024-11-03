import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome5, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#f8f8f8',
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          borderWidth: 1,
          borderColor: '#000',
          shadowColor: 'transparent',
        },
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#000',
        tabBarShowLabel: false, // Masque tous les labels d'onglets
      }}
    >
      {/* Onglet Commentaires à gauche */}
      <Tabs.Screen
        name="comment"
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Entypo name="chat" size={size} color={color} />
            </View>
          ),
        }}
      />

      {/* Onglet Montagne au centre */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.centerIconContainer}>
              <FontAwesome5 name="mountain" size={size} color={color} />
              <FontAwesome name="heart" size={10} color="black" style={styles.heartIcon} />
            </View>
          ),
        }}
      />

      {/* Onglet Partage à droite */}
      <Tabs.Screen
        name="share"
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <MaterialIcons name="share" size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    marginTop: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ededed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerIconContainer: {
    marginTop: 8,
    width: 50, // Plus grand pour le centre
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ededed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    position: 'absolute',
    top: 3,
    right: 3,
  },
});
