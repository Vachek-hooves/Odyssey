import { StyleSheet, View, Dimensions, Text } from 'react-native'
import React from 'react'
import MapView, {Marker} from 'react-native-maps'
import { ATTRACTIONS } from '../../data/attractions'
import { LAS_VEGAS_REGION } from '../../data/initialLocation'

const TabAttractionsMapScreen = () => {
    const handleUserLocationSelect = (event) => {
        console.log('User location selected:', event.nativeEvent.coordinate);
      }
    

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // provider={PROVIDER_DEFAULT}
        initialRegion={LAS_VEGAS_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        onUserLocationChange={(event) => console.log('User location changed:', event.nativeEvent.coordinate)}
        onPress={(event) => console.log('Map pressed:', event.nativeEvent.coordinate)}
        followsUserLocation={true}
        zoomEnabled={true}
        onPoiClick={(event) => console.log('POI clicked:', event.nativeEvent)}
        onMarkerPress={(event) => console.log('Marker pressed:', event.nativeEvent)}
      
      >
        {ATTRACTIONS.map((attraction) => (
          <Marker
            key={attraction.id}
            coordinate={{latitude: attraction.location.lat, longitude: attraction.location.long}}
            title={attraction.name}
            description={attraction.description}
          >
            <View style={styles.markerContainer}>
              <Text style={styles.emoji}>{attraction.emoji}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  )
}

export default TabAttractionsMapScreen

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
  }
})