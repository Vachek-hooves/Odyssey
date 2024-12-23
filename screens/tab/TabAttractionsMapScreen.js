import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Linking,
  Modal,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  Polyline,
  Callout,
} from 'react-native-maps';
import {ATTRACTIONS} from '../../data/attractions';
import {LAS_VEGAS_REGION} from '../../data/initialLocation';
import Geolocation from 'react-native-geolocation-service';
import {CustomRoute} from '../../data/polylineData';
import LinearGradient from 'react-native-linear-gradient';
import {useAppContext} from '../../store/context';

const TOKEN =
  'pk.eyJ1IjoidmFjaGVrbWFwMSIsImEiOiJjbTR3cHdkZXgwN2xxMmtyMHpkM3J1Ymc4In0.MQ2PHgJ_geG0AdbhlelR2Q';

const TabAttractionsMapScreen = ({navigation}) => {
  const {customSpots, createCustomSpot, deleteCustomSpot} = useAppContext();
  const mapRef = useRef(null);
  const [isRoutingMode, setIsRoutingMode] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [route, setRoute] = useState(null);
  //   const [routeKey, setRouteKey] = useState(0);
  const [isRouteReady, setIsRouteReady] = useState(true);
  const [routeDetails, setRouteDetails] = useState(null);
  const [isBuildRoute, setIsBuildRoute] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newSpot, setNewSpot] = useState({
    name: '',
    description: '',
    coordinate: null,
    emoji: '📍',
  });
  console.log(newSpot, 'newSpot');

  useEffect(() => {
    const initMap = async () => {
      const permissionGranted = await checkLocationPermission();
      setHasLocationPermission(permissionGranted);
    };
    initMap();
  }, []);

  useEffect(() => {
    if (route?.length > 0) {
      setIsRouteReady(true);
    }
  }, [route]);

  const checkLocationPermission = async () => {
    try {
      const granted = await Geolocation.requestAuthorization('whenInUse');
      if (granted === 'granted') {
        // await getCurrentLocation();
        console.log('Request granted');
        // setIsBuildRoute(true);
        return true;
      } else {
        console.log('Request denied');
        // showLocationPermissionDialog();
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
      //   showLocationPermissionDialog();
    }
  };

  const handleMapPress = async event => {
    console.log('Map pressed in routing mode:', event.nativeEvent);

    if (isRoutingMode) {
      const {coordinate} = event.nativeEvent;
      console.log('Map pressed in routing mode:', coordinate);

      if (!startPoint) {
        setStartPoint(coordinate);
      } else if (!endPoint) {
        setEndPoint(coordinate);
        // Once we have both points, fetch the route
        await fetchRoute(startPoint, coordinate);
      }
    }
  };

  const fetchRoute = async (start, end) => {
    try {
      // Using MapBox Directions API
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?access_token=${TOKEN}&geometries=geojson`,
      );
      const data = await response.json();

      if (data.routes && data.routes[0]) {
        console.log('data', data);
        console.log(data.routes[0].distance, 'distance');
        console.log(data.routes[0].duration, 'duration');
        console.log(data.routes[0].legs[0].weight, 'legs');
        console.log(data.routes[0].legs[0].summary, 'legs');

        const routeCoordinates = data.routes[0].geometry.coordinates.map(
          coord => ({
            latitude: coord[1],
            longitude: coord[0],
          }),
        );

        // console.log('Setting route with coordinates:', routeCoordinates);
        setRoute(routeCoordinates);
        setRouteDetails(data.routes[0]);
        // setRouteKey(prev => prev + 1);

        // Fit the map to show the entire route
        setTimeout(() => {
          if (mapRef.current && routeCoordinates.length > 0) {
            mapRef.current.fitToCoordinates(routeCoordinates, {
              edgePadding: {
                top: 100,
                right: 100,
                bottom: 100,
                left: 100,
              },
              animated: true,
            });
          }
        }, 100);
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  const NoLocation = () => {
    return (
      <View style={styles.noLocation}>
        <Text style={styles.noLocationText}>
          You are have not enabled location permission
        </Text>
      </View>
    );
  };

  const handleMapLongPress = event => {
    setNewSpot(prev => ({
      ...prev,
      coordinate: event.nativeEvent.coordinate,
    }));
    setModalVisible(true);
  };

  const handleCreateSpot = async () => {
    if (!newSpot.name.trim()) {
      Alert.alert('Error', 'Please enter a name for your spot');
      return;
    }

    const result = await createCustomSpot(newSpot);

    if (result.success) {
      setModalVisible(false);
      setNewSpot({
        name: '',
        description: '',
        coordinate: null,
        emoji: '📍',
      });
    } else {
      Alert.alert('Error', 'Failed to create custom spot');
    }
  };

  const handleDeleteSpot = spotId => {
    Alert.alert('Delete Spot', 'Are you sure you want to delete this spot?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const result = await deleteCustomSpot(spotId);
          if (!result.success) {
            Alert.alert('Error', 'Failed to delete spot');
          }
        },
      },
    ]);
  };

  const startRouting = () => {
    setIsRoutingMode(true);
    setStartPoint(null);
    setEndPoint(null);
    setRoute(null);
  };

  const cancelRouting = () => {
    setIsRoutingMode(false);
    setStartPoint(null);
    setEndPoint(null);
    setRoute(null);
  };

  const navigateToLasVegas = () => {
    mapRef.current?.animateToRegion(LAS_VEGAS_REGION, 1000); // 1000ms animation duration
  };

  const handleMarkerPress = attraction => {
    console.log('Marker pressed:', attraction);
    navigation.navigate('StackAttracktionDetailsScreen', {attraction});
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={LAS_VEGAS_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        onPress={handleMapPress}
        followsUserLocation={true}
        zoomEnabled={true}
        onPoiClick={event => console.log('POI clicked:', event.nativeEvent)}
        onMarkerPress={event =>
          console.log('Marker pressed:', event.nativeEvent)
        }
        onLongPress={handleMapLongPress}>
        {isRouteReady && (
          <Polyline
            coordinates={route}
            strokeColor="#2196F3"
            strokeWidth={5}
            lineDashPattern={[1, 7]}
            zIndex={99}
            tappable={true}
          />
        )}

        {/* Route markers on top */}
        {startPoint && (
          <Marker
            coordinate={startPoint}
            pinColor="green"
            title="Start Point"
            zIndex={2}
          />
        )}
        {endPoint && (
          <Marker
            coordinate={endPoint}
            pinColor="red"
            title="End Point"
            zIndex={2}
          />
        )}

        {/* Your existing attraction markers */}
        {ATTRACTIONS.map(attraction => (
          <Marker
            onPress={e => {
              e.stopPropagation();
            }}
            key={attraction.id}
            coordinate={{
              latitude: attraction.location.lat,
              longitude: attraction.location.long,
            }}
            title={attraction.name}>
            <View style={styles.markerContainer}>
              <Text style={styles.emoji}>{attraction.emoji}</Text>
            </View>
            <Callout
              onPress={e => {
                e.stopPropagation();
                handleMarkerPress(attraction);
              }}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{attraction.name}</Text>
                <TouchableOpacity
                  style={styles.calloutButton}
                  onPress={e => {
                    e.stopPropagation();
                    handleMarkerPress(attraction);
                  }}>
                  <Text style={styles.calloutButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}

        {customSpots.map(spot => (
          <Marker key={spot.id} coordinate={spot.coordinate}>
            <View style={styles.customMarkerContainer}>
              <LinearGradient
                colors={['#2B3467', '#1a1f3c']}
                style={styles.customMarkerGradient}>
                {/* <View style={styles.customMarkerContainer}> */}
                <Text style={styles.emojiCustom}>{spot.emoji}</Text>
                {/* </View> */}
              </LinearGradient>
            </View>
            <Callout
              onPress={e => {
                e.stopPropagation();
                handleDeleteSpot(spot.id);
              }}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{spot.name}</Text>
                {spot.description && (
                  <Text style={styles.calloutDescription}>{spot.description}</Text>
                )}
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={e => {
                    e.stopPropagation();
                    handleDeleteSpot(spot.id);
                  }}>
                  <Text style={styles.deleteButtonText}>Delete Spot</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      {/* <CustomSpotModal /> */}
      {/* Add Las Vegas button */}
      <LinearGradient
        colors={['#2B3467', '#1a1f3c']}
        style={styles.lasVegasButton}>
        <TouchableOpacity
          //   style={styles.lasVegasButton}
          onPress={navigateToLasVegas}>
          <Text style={styles.lasVegasButtonText}>🎆</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Routing controls */}
      <View style={styles.buttonContainer}>
        {hasLocationPermission ? (
          !isRoutingMode ? (
            <LinearGradient
              colors={['#2B3467', '#1a1f3c']}
              style={styles.button}>
              <TouchableOpacity onPress={startRouting}>
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
                onPress={cancelRouting}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          <NoLocation />
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={['#2B3467', '#1a1f3c']}
            style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Spot</Text>

            <View style={styles.emojiSelector}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                
                {['📍', '🎯', '⭐', '🎪', '🎭', '🎡', '🎢', '🎨', '🎰', '🍽️', '🏛️', '🏰', '🌟', '💫', '🌺', '🌴'].map(emoji => (
                  <TouchableOpacity
                    key={emoji}
                    onPress={() => setNewSpot(prev => ({...prev, emoji}))}
                    style={[
                      styles.emojiOption,
                      newSpot.emoji === emoji && styles.selectedEmoji,
                    ]}>
                    <Text style={styles.emojiText}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
                <View style={{width: 20}} />
              </ScrollView>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Spot Name"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={newSpot.name}
              onChangeText={text => setNewSpot(prev => ({...prev, name: text}))}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description (optional)"
              placeholderTextColor="rgba(255,255,255,0.5)"
              multiline
              numberOfLines={4}
              value={newSpot.description}
              onChangeText={text =>
                setNewSpot(prev => ({...prev, description: text}))
              }
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreateSpot}>
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </View>
  );
};

export default TabAttractionsMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    flex: 1,
  },
  markerContainer: {
    backgroundColor: 'pink',
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  customMarkerContainer: {
    backgroundColor: 'green',
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  emojiCustom: {
    fontSize: 28,
    padding: 8,
  },
  emoji: {
    fontSize: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 130,
    width: '100%',
    alignItems: 'center',
  },
  button: {
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
  buttonText: {
    color: 'white',
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
  },
  noLocation: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  noLocationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#4CAF50', // Green color for the retry button
    marginTop: 10,
  },
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
  calloutContainer: {
    padding: 10,
    width: 200,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calloutButton: {
    marginTop: 5,
    padding: 8,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  calloutButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonBuildRouteText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  //   CustomSpotModal
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'pink',
    borderRadius: 50,
  },
  markerEmoji: {
    fontSize: 42,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    // paddingHorizontal: 10,
  },
  modalContent: {
    width: '100%',
    maxWidth: '90%', // Added maxWidth to control modal size
    // padding: 20,
    borderRadius: 20,
    backgroundColor: '#2B3467',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
    textShadowColor: '#00ff00',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 30,
  },
  emojiSelector: {
    // width: '100%', // Added width
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginHorizontal: 20,
  },
  emojiOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  selectedEmoji: {
    backgroundColor: 'rgba(0,255,0,0.2)',
    borderWidth: 2,
    borderColor: '#00ff00',
  },
  emojiText: {
    fontSize: 22,
  },
  input: {
    // width: '100%', // Ensure input takes full width of parent
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#00ff00',
    fontSize: 16,
    marginRight: 10,
    marginLeft: 10,
    width: '90%',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  modalButtons: {
    // width: '100%', // Added width
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBlock: 20,
    marginHorizontal: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 15,
    borderRadius: 15,
    marginRight: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 15,
    borderRadius: 15,
    marginRight: 8,
  },
  createButton: {
    flex: 1,
    backgroundColor: '#50C878',
    padding: 15,
    borderRadius: 15,
    marginLeft: 8,
  },
  //   custom marker
  customMarkerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  customMarkerGradient: {
    // width: 44,
    // height: 44,
    // alignItems: 'center',
    // justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#00ff00',
    borderRadius: 22,
  },
  customMarkerEmoji: {
    fontSize: 24,
  },
  calloutContainer: {
    padding: 12,
    minWidth: 150,
    maxWidth: 250,
    backgroundColor: '#2B3467',
    borderRadius: 10,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: '#00ff00',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  calloutDescription: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 12,
    opacity: 0.9,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  deleteButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
