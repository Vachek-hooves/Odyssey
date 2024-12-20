import { StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'
import MapView, {Marker} from 'react-native-maps'

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
      />
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
  }
})