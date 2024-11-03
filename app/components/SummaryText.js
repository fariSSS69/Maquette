import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SummaryText = ({ comment }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingVertical: 25,
    paddingHorizontal: 15,
    width: '100%',
    alignSelf: 'center',
    marginVertical: -5,
    borderColor: '#f8f8f8',
    borderWidth: 2,
  },
  text: {
    color: '#333',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
    flexWrap: 'wrap',  
  },
});

export default SummaryText;
