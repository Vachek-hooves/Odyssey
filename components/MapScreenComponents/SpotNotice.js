import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const SpotNotice = () => {
  return (
    <View style={styles.hintContainer}>
      <LinearGradient
        colors={['rgba(43, 52, 103, 0.9)', 'rgba(26, 31, 60, 0.9)']}
        style={styles.hintGradient}>
        <Text style={styles.hintText}>
          Press and hold on map for 3 sec to create spot 📍
        </Text>
      </LinearGradient>
    </View>
  );
};

export default SpotNotice;

const styles = StyleSheet.create({
  hintContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 1,
    borderRadius: 15,
    overflow: 'hidden',
  },
  hintGradient: {
    // padding: 12,
    alignItems: 'center',
  },
  hintText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: '#00ff00',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
