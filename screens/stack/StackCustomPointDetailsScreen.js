import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const StackCustomPointDetailsScreen = ({route, navigation}) => {
  const {spot} = route.params;
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderImageSlider = () => {
    if (!spot.images || spot.images.length === 0) {
      return (
        <View style={styles.noImageContainer}>
          <Text style={styles.noImageText}>No images available</Text>
        </View>
      );
    }

    return (
      <View style={styles.sliderContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}>
          {spot.images.map((image, index) => (
            <Image
              key={index}
              source={{uri: image.uri}}
              style={styles.sliderImage}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {spot.images.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 34, 8],
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={[styles.dot, {width: dotWidth, opacity}]}
              />
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <LinearGradient colors={['#2B3467', '#1a1f3c']} style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView bounces={false}>
        <View style={styles.sliderContainer}>
          {renderImageSlider()}
          <LinearGradient
            colors={['#2B3A67', '#384BeE']}
            style={styles.backButton}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.customSpotBadge}>
            <Text style={styles.customSpotText}>My Custom Spot</Text>
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.emoji}>{spot.emoji}</Text>
            <Text style={styles.title}>{spot.name}</Text>
          </View>

          {spot.description ? (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.description}>{spot.description}</Text>
            </View>
          ) : null}

          <View style={styles.locationContainer}>
            <Text style={styles.locationTitle}>📍 Location</Text>
            <Text style={styles.locationText}>
              Latitude: {spot.coordinate.latitude.toFixed(6)}
            </Text>
            <Text style={styles.locationText}>
              Longitude: {spot.coordinate.longitude.toFixed(6)}
            </Text>
          </View>

          {/* <TouchableOpacity
            style={styles.returnToMapButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.returnToMapText}>Return to Map</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 400,
    width: width,
  },
  sliderImage: {
    width: width,
    height: 400,
  },
  backButton: {
    position: 'absolute',
    left: 30,
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    top: '25%',
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 25,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    backgroundColor: '#2B3467',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#00ff00',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
  },
  descriptionContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#00ff00',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: '#00ff00',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  locationContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#00ff00',
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: '#00ff00',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  locationText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  customSpotBadge: {
    backgroundColor: 'rgba(0,255,0,0.2)',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#00ff00',
    marginBottom: 20,
  },
  customSpotText: {
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: '#00ff00',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  returnToMapButton: {
    backgroundColor: 'rgba(0,255,0,0.2)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00ff00',
    marginTop: 10,
  },
  returnToMapText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#00ff00',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  noImageContainer: {
    width: Dimensions.get('window').width,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  noImageText: {
    color: '#fff',
    fontSize: 16,
    textShadowColor: '#00ff00',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
});

export default StackCustomPointDetailsScreen;
