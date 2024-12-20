import { StyleSheet, View, Dimensions, Text } from 'react-native'
import React from 'react'
import MapView, {Marker} from 'react-native-maps'
import { ATTRACTIONS } from '../../data/attractions'
const TabAttractionsMapScreen = () => {
  // Las Vegas coordinates (center of the Strip)
  const LAS_VEGAS_REGION = {
    latitude: 36.1147,
    longitude: -115.1728,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
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