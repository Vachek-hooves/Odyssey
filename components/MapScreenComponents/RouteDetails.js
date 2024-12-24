import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {WalkingMan} from '../Lottie';

const RouteDetails = ({routeData, onClose}) => {
  if (!routeData) return null;

  return (
    <View style={styles.routeDetailsContainer}>
      <LinearGradient
        colors={['rgba(43, 52, 103, 0.75)', 'rgba(26, 31, 60, 0.85)']}
        style={styles.routeDetailsGradient}>
        <View style={styles.routeHeader}>
          <Text style={styles.routeTitle}>Route Details</Text>
          <TouchableOpacity style={styles.closeRouteButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.routeInfo}>
          <View style={styles.routeRow}>
            <View style={styles.routeDetail}>
              <Text style={styles.detailLabel}>Distance</Text>
              <Text style={styles.detailValue}>
                {(routeData.distance / 1000).toFixed(1)} km
              </Text>
            </View>
            <View style={styles.routeDetail}>
              <WalkingMan />
            </View>
            <View style={styles.routeDetail}>
              <Text style={styles.detailLabel}>Duration</Text>
              <Text style={styles.detailValue}>
                {Math.round(routeData.duration / 60)} min
              </Text>
            </View>
          </View>

          <View style={styles.routeStreets}>
            <View style={styles.streetContainer}>
              <Text style={styles.streetLabel}>From</Text>
              <Text style={styles.streetName} numberOfLines={1}>
                {routeData.startStreet || 'Current Location'}
              </Text>
            </View>

            <View style={styles.arrowContainer}>
              <Text style={styles.arrow}>→</Text>
            </View>

            <View style={styles.streetContainer}>
              <Text style={styles.streetLabel}>To</Text>
              <Text style={styles.streetName} numberOfLines={1}>
                {routeData.endStreet || 'Destination'}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default RouteDetails;

const styles = StyleSheet.create({
  routeDetailsContainer: {
    position: 'absolute',
    top: '10%', // Below the hint message
    left: 20,
    right: 20,
    zIndex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  routeDetailsGradient: {
    // padding: 15,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 12,
    margin: 15,
  },
  routeTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: '#00ff00',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
  },
  closeRouteButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  routeInfo: {
    gap: 12,
  },
  routeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  routeDetail: {
    alignItems: 'center',
  },
  detailLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginBottom: 4,
  },
  detailValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: '#00ff00',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  routeStreets: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  streetContainer: {
    flex: 1,
  },
  streetLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginBottom: 4,
  },
  streetName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    margin: 5,
  },
  arrowContainer: {
    paddingHorizontal: 10,
  },
  arrow: {
    color: '#00ff00',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
