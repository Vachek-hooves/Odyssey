import React, {useRef, useState} from 'react';
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
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAppContext} from '../../store/context';

const {width} = Dimensions.get('window');

const StackCustomPointDetailsScreen = ({route, navigation}) => {
  const {spot} = route.params;
  const scrollX = useRef(new Animated.Value(0)).current;
  const {addToFavorites, removeFromFavorites, isSpotFavorite, deleteCustomSpot} = useAppContext();
  const [isFavorite, setIsFavorite] = useState(isSpotFavorite(spot.id));

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        const result = await removeFromFavorites(spot.id);
        if (result.success) {
          setIsFavorite(false);
        }
      } else {
        const result = await addToFavorites(spot);
        if (result.success) {
          setIsFavorite(true);
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleDeleteSpot = () => {
    Alert.alert(
      'Delete Spot',
      'Are you sure you want to delete this spot?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const result = await deleteCustomSpot(spot.id);
              if (result.success) {
                navigation.goBack();
              } else {
                Alert.alert('Error', 'Failed to delete spot');
              }
            } catch (error) {
              console.error('Error deleting spot:', error);
              Alert.alert('Error', 'Failed to delete spot. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

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
              source={{uri: image.uri }}
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
    <LinearGradient
      colors={['#1a0033', '#330066']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView bounces={false}>
        <View style={styles.sliderContainer}>
          {renderImageSlider()}
          <LinearGradient
            colors={['#FF2975', '#5114AF']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.backButton}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* Favorite Button */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}>
            <LinearGradient
              colors={
                isFavorite ? ['#FFD700', '#FFA500'] : ['#FF2975', '#5114AF']
              }
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.favoriteGradient}>
              <Text style={styles.favoriteButtonText}>
                {isFavorite ? '★' : '☆'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Delete Button */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteSpot}>
            <LinearGradient
              colors={['#FF2975', '#5114AF']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.deleteGradient}>
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <LinearGradient
            colors={['#FF2975', '#FF1493']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.customSpotBadge}>
            <Text style={styles.customSpotText}>Custom Spot</Text>
          </LinearGradient>

          <View style={styles.headerContainer}>
            <Text style={styles.emoji}>{spot.emoji}</Text>
            <Text style={styles.title}>{spot.name}</Text>
          </View>

          {spot.description ? (
            <LinearGradient
              colors={['rgba(255, 41, 117, 0.2)', 'rgba(81, 20, 175, 0.2)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>✨ Description</Text>
              <Text style={styles.description}>{spot.description}</Text>
            </LinearGradient>
          ) : null}

          <LinearGradient
            colors={['rgba(255, 41, 117, 0.2)', 'rgba(81, 20, 175, 0.2)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.locationContainer}>
            <Text style={styles.locationTitle}>📍 Location</Text>
            <Text style={styles.locationText}>
              Latitude: {spot.coordinate.latitude.toFixed(6)}
            </Text>
            <Text style={styles.locationText}>
              Longitude: {spot.coordinate.longitude.toFixed(6)}
            </Text>
          </LinearGradient>
        <View style={{height:100}}/>
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
  noImageContainer: {
    width: width,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 0, 51, 0.9)',
  },
  noImageText: {
    color: '#fff',
    fontSize: 18,
    textShadowColor: '#FF2975',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
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
    top: '30%',
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
  favoriteButton: {
    position: 'absolute',
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    zIndex: 10,
    top: '30%',
    shadowColor: '#FF2975',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  favoriteGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  favoriteButtonText: {
    color: 'white',
    fontSize: 24,
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
  customSpotBadge: {
    // paddingVertical: 8,
    // paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#FF2975',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  customSpotText: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  headerContainer: {
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
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#FF2975',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  descriptionContainer: {
    // padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FF2975',
  },
  descriptionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: '#FF2975',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    padding: 10,
  },
  description: {
    fontSize: 18,
    color: '#fff',
    lineHeight: 28,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    paddingHorizontal: 10,
  },
  locationContainer: {
    // padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FF2975',
  },
  locationTitle: {
    padding: 15,
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
    marginBottom: 5,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    paddingHorizontal: 10,
  },
  deleteButton: {
    position: 'absolute',
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    zIndex: 10,
    top: '55%',
    shadowColor: '#FF2975',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  deleteGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  deleteButtonText: {
    fontSize: 24,
    color: 'white',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
});

export default StackCustomPointDetailsScreen;
