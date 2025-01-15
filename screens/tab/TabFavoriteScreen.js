import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useAppContext} from '../../store/context';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import MainLayout from '../../components/layout/MainLayout';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

const TabFavoriteScreen = () => {
  const {favoriteSpots, removeFromFavorites} = useAppContext();
  const navigation = useNavigation();

  const handleSpotPress = spot => {
    if (spot.id.startsWith('custom-')) {
      navigation.navigate('StackCustomPointDetailsScreen', {spot});
    } else {
      navigation.navigate('StackAttracktionDetailsScreen', {attraction: spot});
    }
  };

  const renderSpotCard = ({item}) => {
    const spotImage =
      item.images?.[0]?.uri ||
      item.image ||
      require('../../assets/image/noImage.png');
    // const spotImage = item.images?.[0]?.uri || item.image || '';
    const formattedDate = new Date(
      item.addedToFavoritesAt,
    ).toLocaleDateString();

    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleSpotPress(item)}>
        <LinearGradient
          colors={['rgba(255, 41, 117, 0.9)', 'rgba(81, 20, 175, 0.9)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={
                typeof spotImage === 'string' ? {uri: spotImage} : spotImage
              }
              style={styles.image}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(81, 20, 175, 0.95)']}
              style={styles.imageOverlay}
            />
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.headerRow}>
              <Text style={styles.emoji}>{item.emoji}</Text>
              <Text style={styles.title} numberOfLines={1}>
                {item.name}
              </Text>
            </View>

            {item.description && (
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
            )}

            <View style={styles.footer}>
              <Text style={styles.date}>Added: {formattedDate}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromFavorites(item.id)}>
                <LinearGradient
                  colors={['#FF2975', '#FF1493']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  // style={styles.removeButtonGradient}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  if (favoriteSpots.length === 0) {
    return (
      <MainLayout>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorite spots yet</Text>
          <Text style={styles.emptySubtext}>
            Add spots to your favorites to see them here
          </Text>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* <LinearGradient colors={['#1a0033', '#330066']} style={styles.container}> */}
      <Text style={styles.headerTitle}>Favorite Spots</Text>
      <FlatList
        data={favoriteSpots}
        renderItem={renderSpotCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{height: 90}} />}
      />
      {/* </LinearGradient> */}
    </MainLayout>
  );
};

export default TabFavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    textShadowColor: '#FF2975',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
    fontFamily: 'System',
    letterSpacing: 1,
  },
  listContainer: {
    paddingHorizontal: width * 0.05,
    paddingBottom: 20,
  },
  cardContainer: {
    marginBottom: 20,
    borderRadius: 15,
    elevation: 8,
    shadowColor: '#FF2975',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FF2975',
  },
  imageContainer: {
    height: 200,
    width: CARD_WIDTH,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '102%',
  },
  contentContainer: {
    padding: 15,
    backgroundColor: 'rgba(26, 0, 51, 0.3)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  emoji: {
    fontSize: 24,
    marginRight: 10,
    textShadowColor: '#fff',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textShadowColor: '#FF2975',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  date: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    textShadowColor: '#FF2975',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  removeButton: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#FF2975',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  removeButtonGradient: {
    borderRadius: 20,
  },
  removeButtonText: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    letterSpacing: 0.5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#1a0033',
  },
  emptyText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: '#FF2975',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  emptySubtext: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    paddingHorizontal: 40,
    textShadowColor: '#FF2975',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
    letterSpacing: 0.5,
  },
});
