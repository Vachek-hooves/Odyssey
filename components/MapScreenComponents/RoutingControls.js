import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const RoutingControls = ({
  onCancelRouting,
  onStartRouting,
  isRoutingMode,
  hasLocationPermission,
  startPoint,
  endPoint,
}) => {
  const NoLocation = () => {
    return (
      <View style={styles.noLocation}>
        <Text style={styles.noLocationText}>
          You are have not enabled location permission
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.buttonContainer}>
      {hasLocationPermission ? (
        !isRoutingMode ? (
          <LinearGradient colors={['#2B3467', '#1a1f3c']} style={styles.button}>
            <TouchableOpacity onPress={onStartRouting}>
              <Text style={styles.buttonBuildRouteText}>Build Route</Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <View style={styles.routingControls}>
            <Text style={styles.routingText}>
              {!startPoint
                ? 'Select start point'
                : !endPoint
                ? 'Select end point'
                : 'Route created!'}
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancelRouting}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )
      ) : (
        <NoLocation />
      )}
    </View>
  );
};

export default RoutingControls;

const styles = StyleSheet.create({
  buttonBuildRouteText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 130,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  cancelButton: {
    backgroundColor: '#FF5252',
    marginTop: 10,
  },
  routingControls: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 10,
  },
  routingText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },button: {
    // backgroundColor: '#2196F3',
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
