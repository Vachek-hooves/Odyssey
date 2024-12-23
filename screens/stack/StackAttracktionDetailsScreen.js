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
    <View style={styles.container}>
      <ScrollView bounces={false}>
        {renderImageSlider()}
        <View style={styles.contentContainer}>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>★ {attraction.rating}</Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.emoji}>{attraction.emoji}</Text>
            <Text style={styles.title}>{attraction.name}</Text>
          </View>

          <TouchableOpacity style={styles.locationContainer}>
            <Text style={styles.locationTitle}>📍 Location</Text>
            <Text style={styles.locationText}>
              {attraction.streetName || `${attraction.location.lat}, ${attraction.location.long}`}
            </Text>
          </TouchableOpacity>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>✨ About this place</Text>
            <Text style={styles.descriptionText}>
              {attraction.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default StackAttracktionDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B3467',
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
    marginBottom: 25,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    backgroundColor: '#2B3467', // Dark blue background
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40, // Increased space between header and content
  },
  emoji: {
    fontSize: 70, // Larger emoji
    marginBottom: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
    textShadowColor: '#00ff00',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  ratingContainer: {
    position: 'absolute',
    top: -35, // Position above the content
    left: 20,
    backgroundColor: '#FFD700',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  locationContainer: {
    marginHorizontal: -20, // Extend full width
    padding: 20,
    backgroundColor: 'rgba(73, 215, 159, 0.2)', // Greenish with opacity
    marginBottom: 30,
  },
  locationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
  },
  descriptionContainer: {
    marginTop: 20,
  },
  descriptionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#fff',
    opacity: 0.9,
  },
});
