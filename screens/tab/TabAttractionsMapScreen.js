import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
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
import LinearGradient from 'react-native-linear-gradient';
import {useAppContext} from '../../store/context';
import {
  CustomSpotModal,
  RoutingControls,
  SpotNotice,
} from '../../components/MapScreenComponents';
import RouteDetails from '../../components/MapScreenComponents/RouteDetails';
import LasVegasButton from '../../components/MapScreenComponents/LasVegasButton';

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
  // const [isBuildRoute, setIsBuildRoute] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [routeData, setRouteData] = useState(null);
  const [coordinatesForSave, setCoordinatesForSave] = useState(null);
  const [newSpot, setNewSpot] = useState({
    name: '',
    description: '',
    coordinate: null,
    emoji: '📍',
    image: [],
  });
  // console.log(newSpot, 'newSpot');
  console.log(customSpots);
  console.log(coordinatesForSave);

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
      setCoordinatesForSave(coordinate);
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
        setRouteData({
          distance: data.routes[0].distance,
          duration: data.routes[0].duration,
          startStreet: data.routes[0].legs[0].summary.split(' to ')[0],
          endStreet: data.routes[0].legs[0].summary.split(' to ')[1],
          geometry: data.routes[0].geometry,
        });

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

  const handleMapLongPress = event => {
    event.persist();
    
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
    setCoordinatesForSave(null);
  };

  const navigateToLasVegas = () => {
    mapRef.current?.animateToRegion(LAS_VEGAS_REGION, 1000); // 1000ms animation duration
  };

  const handleMarkerPress = (item, isCustomSpot = false) => {
    console.log('Marker pressed:', item);
    if (isCustomSpot) {
      navigation.navigate('StackCustomPointDetailsScreen', {spot: item});
    } else {
      navigation.navigate('StackAttracktionDetailsScreen', {attraction: item});
    }
  };

  const handleSpotChange = updatedSpot => {
    setNewSpot(updatedSpot);
  };

  return (
    <View style={styles.container}>
      <SpotNotice />
      {isRoutingMode && (
        <RouteDetails
          routeData={routeData}
          onClose={() => setRouteData(null)}
        />
      )}
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
        onLongPress={handleMapLongPress}
        zoomEnabled={true}>
        {isRouteReady && (
          <Polyline
            coordinates={route}
            strokeColor="#FF2975"
            strokeWidth={5}
            lineDashPattern={[1, 7]}
            zIndex={99}
            tappable={true}
          />
        )}

        {startPoint && (
          <Marker
            coordinate={startPoint}
            pinColor="#FF2975"
            title="Start Point"
            zIndex={2}
          />
        )}
        {endPoint && (
          <Marker
            coordinate={endPoint}
            pinColor="#5114AF"
            title="End Point"
            zIndex={2}
          />
        )}

        {ATTRACTIONS.map(attraction => (
          <Marker
            // onPress={e => {
            //   e.stopPropagation();
            // }}
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
              <LinearGradient
                colors={['#1a0033', '#330066']}
                style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{attraction.name}</Text>
                <TouchableOpacity
                  style={styles.calloutButton}
                  onPress={e => {
                    e.stopPropagation();
                    handleMarkerPress(attraction);
                  }}>
                  <LinearGradient
                    colors={['#FF2975', '#FF1493']}
                    style={styles.calloutButtonGradient}>
                    <Text style={styles.calloutButtonText}>View Details</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </Callout>
          </Marker>
        ))}

        {customSpots.map(spot => (
          <Marker key={spot.id} coordinate={spot.coordinate}>
            <View style={styles.customMarkerContainer}>
              <LinearGradient
                colors={['#FF2975', '#5114AF']}
                style={styles.customMarkerGradient}>
                <Text style={styles.emojiCustom}>{spot.emoji}</Text>
              </LinearGradient>
            </View>
            <Callout
              onPress={e => {
                e.stopPropagation();
                handleMarkerPress(spot, true);
              }}>
              <LinearGradient
                colors={['#1a0033', '#330066']}
                style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{spot.name}</Text>
                <TouchableOpacity
                  style={styles.calloutButton}
                  onPress={e => {
                    e.stopPropagation();
                    handleMarkerPress(spot, true);
                  }}>
                  <LinearGradient
                    colors={['#FF2975', '#FF1493']}
                    style={styles.calloutButtonGradient}>
                    <Text style={styles.calloutButtonText}>View Details</Text>
                  </LinearGradient>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={e => {
                    e.stopPropagation();
                    handleDeleteSpot(spot.id);
                  }}>
                  <LinearGradient
                    colors={['#FF2975', '#FF1493']}
                    style={styles.deleteButtonGradient}>
                    <Text style={styles.deleteButtonText}>Delete Spot</Text>
                  </LinearGradient>
                </TouchableOpacity> */}
              </LinearGradient>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Add Las Vegas button */}

      <LasVegasButton onPress={navigateToLasVegas} />

      {/* Routing controls */}
      <RoutingControls
        onCancelRouting={cancelRouting}
        onStartRouting={startRouting}
        hasLocationPermission={hasLocationPermission}
        isRoutingMode={isRoutingMode}
        startPoint={startPoint}
        endPoint={endPoint}
      />
      <CustomSpotModal
        visible={modalVisible}
        newSpot={newSpot}
        onClose={() => setModalVisible(false)}
        onCreateSpot={handleCreateSpot}
        onSpotChange={handleSpotChange}
      />
    </View>
  );
};

export default TabAttractionsMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    backgroundColor: 'rgba(26, 0, 51, 0.8)',
    borderRadius: 20,
    padding: 6,
    borderWidth: 2,
    borderColor: '#FF2975',
    shadowColor: '#FF2975',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  customMarkerContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow: 'hidden',
    shadowColor: '#FF2975',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  customMarkerGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
  },
  emoji: {
    fontSize: 24,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  emojiCustom: {
    fontSize: 24,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  calloutContainer: {
    minWidth: 180,
    backgroundColor: 'transparent',
    borderRadius: 15,
    overflow: 'hidden',
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    textShadowColor: '#FF2975',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  calloutButton: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 8,
  },
  calloutButtonGradient: {
    // paddingVertical: 8,
    // paddingHorizontal: 15,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  calloutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  deleteButton: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 8,
    marginTop:10
  },
  deleteButtonGradient: {
    // paddingVertical: 8,
    // paddingHorizontal: 15,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
});
