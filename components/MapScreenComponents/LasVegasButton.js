import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const LasVegasButton = ({onPress}) => {
  return (
    <LinearGradient
      colors={['#2B3467', '#1a1f3c']}
      style={styles.lasVegasButton}>
      <TouchableOpacity
        //   style={styles.lasVegasButton}
        onPress={onPress}>
        <Text style={styles.lasVegasButtonText}>🎆</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default LasVegasButton;

const styles = StyleSheet.create({
  lasVegasButton: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    // width: 50,
    // height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 50,
  },
  lasVegasButtonText: {
    fontSize: 32,
    padding: 10,
  },
});
