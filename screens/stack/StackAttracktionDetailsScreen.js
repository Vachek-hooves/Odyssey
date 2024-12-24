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
import CustomQR from '../../components/UI/CustomQR';

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
        <LinearGradient
          colors={['#FF2975', '#5114AF']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.backButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        </LinearGradient>

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
    <LinearGradient
      colors={['#1a0033', '#330066']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <ScrollView bounces={false}>
        {renderImageSlider()}
        <View style={styles.contentContainer}>
          <LinearGradient
            colors={['#FF2975', '#FF1493']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.ratingContainer}>
            <Text style={styles.rating}>★ {attraction.rating}</Text>
          </LinearGradient>

          <View style={styles.header}>
            <Text style={styles.emoji}>{attraction.emoji}</Text>
            <Text style={styles.title}>{attraction.name}</Text>
          </View>

          <LinearGradient
            colors={['rgba(255, 41, 117, 0.2)', 'rgba(81, 20, 175, 0.2)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.locationContainer}>
            <Text style={styles.locationTitle}>📍 Location</Text>
            <Text style={styles.locationText}>
              {attraction.streetName ||
                `${attraction.location.lat}, ${attraction.location.long}`}
            </Text>
          </LinearGradient>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>✨ About this place</Text>
            <Text style={styles.descriptionText}>{attraction.description}</Text>
          </View>
          <CustomQR />
        <View style={{height: 60}} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default StackAttracktionDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#2B3467',
  },
  sliderContainer: {
    height: 400, // Made taller for more impact
    width: width,
  },
  sliderImage: {
    width: width,
    height: 650,
  },
  backButton: {
    position: 'absolute',
    left: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    top: '10%',
    shadowColor: '#FF2975',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF2975',
    marginHorizontal: 4,
    shadowColor: '#FF2975',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    backgroundColor: '#1a0033',
    borderWidth: 2,
    borderColor: '#FF2975',
    borderBottomWidth: 0,
    shadowColor: '#FF2975',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 10,
    textShadowColor: '#FF2975',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: '#FF2975',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  ratingContainer: {
    position: 'absolute',
    top: -25,
    left: 20,
    borderRadius: 20,
    shadowColor: '#FF2975',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  rating: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 15,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  locationContainer: {
    marginHorizontal: 10,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FF2975',
  },
  locationTitle: {
    padding: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: '#FF2975',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  locationText: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    padding: 5,
  },
  descriptionContainer: {
    marginTop: 10,
  },
  descriptionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textShadowColor: '#FF2975',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  descriptionText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#fff',
    opacity: 0.9,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});
