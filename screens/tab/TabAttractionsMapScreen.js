import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import MapView, {Marker, PROVIDER_DEFAULT, Polyline} from 'react-native-maps';
import {ATTRACTIONS} from '../../data/attractions';
import {LAS_VEGAS_REGION} from '../../data/initialLocation';
import {CustomRoute} from '../../data/polylineData';

const TOKEN =
  'pk.eyJ1IjoidmFjaGVrbWFwMSIsImEiOiJjbTR3cHdkZXgwN2xxMmtyMHpkM3J1Ymc4In0.MQ2PHgJ_geG0AdbhlelR2Q';

const TabAttractionsMapScreen = () => {
  const mapRef = useRef(null);
  const [isRoutingMode, setIsRoutingMode] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [route, setRoute] = useState(null);
  //   const [routeKey, setRouteKey] = useState(0);
  const [isRouteReady, setIsRouteReady] = useState(true);
  const [routeDetails, setRouteDetails] = useState(null);

  useEffect(() => {
    if (route?.length > 0) {
      setIsRouteReady(true);
    }
  }, [route]);

  const handleMapPress = async event => {
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
        }>
        {/* Draw the route first (before markers) */}

        {/* {route  && (
          <Polyline
            key={routeKey}
            coordinates={route}
            // coordinates={route}
            strokeColor="#2196F3"
            strokeWidth={3}
            lineDashPattern={[0]}
            zIndex={99} // Make sure route is visible above the map
            tappable={true} // Make route interactive
            onPress={() => console.log('Route pressed')} // For debugging
          />
        )} */}
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
            key={attraction.id}
            coordinate={{
              latitude: attraction.location.lat,
              longitude: attraction.location.long,
            }}
            title={attraction.name}
            description={attraction.description}>
            <View style={styles.markerContainer}>
              <Text style={styles.emoji}>{attraction.emoji}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
      {/* Routing controls */}
      <View style={styles.buttonContainer}>
        {!isRoutingMode ? (
          <TouchableOpacity style={styles.button} onPress={startRouting}>
            <Text style={styles.buttonText}>Build Route</Text>
          </TouchableOpacity>
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
        )}
      </View>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
  emoji: {
    fontSize: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    fontSize: 16,
    fontWeight: 'bold',
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
});
