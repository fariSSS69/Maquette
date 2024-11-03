// app/(tabs)/explore.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// TODO Mettre en place la possiblité de commenter
export default function CommentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
