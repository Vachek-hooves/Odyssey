import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const StackAttracktionDetailsScreen = ({route, navigation}) => {
  const {attraction} = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const renderImageSlider = () => {
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
          {attraction.images.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={styles.sliderImage}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
        <TouchableOpacity
          style={[styles.backButton, {top: insets.top + 10}]}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {attraction.images.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 24, 8],
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
    <View style={styles.container}>
      {/* <StatusBar translucent backgroundColor="transparent" /> */}
      <ScrollView bounces={false}>
        {renderImageSlider()}
        <LinearGradient
          colors={['#2B3A67', '#384B7E']}
          style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.emoji}>{attraction.emoji}</Text>
            <Text style={styles.title}>{attraction.name}</Text>
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.ratingContainer}>
              <Text style={styles.rating}>★ {attraction.rating}</Text>
            </LinearGradient>
          </View>

          <LinearGradient
            colors={['rgba(41, 128, 185, 0.4)', 'rgba(52, 152, 219, 0.4)']}
            style={styles.locationContainer}>
            <Text style={styles.locationTitle}>📍 Location</Text>
            <Text style={styles.locationText}>
              {attraction.location.lat}, {attraction.location.long}
            </Text>
          </LinearGradient>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>✨ About this place</Text>
            <Text style={styles.descriptionText}>{attraction.description}</Text>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default StackAttracktionDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d2d2d',
  },
  sliderContainer: {
    height: 400, // Made taller for more impact
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
  },
  contentContainer: {
    // padding: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -35,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  emoji: {
    fontSize: 70,
    marginBottom: 15,
    textShadow: '0px 2px 4px rgba(0,0,0,0.2)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: '#00ff00',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  ratingContainer: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  locationContainer: {
    marginBottom: 25,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#00ff00',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#00ff00',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    opacity: 0.95,
  },
  descriptionContainer: {
    marginBottom: 50,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#fff',
    opacity: 0.95,
    textAlign: 'justify',
  },
});
