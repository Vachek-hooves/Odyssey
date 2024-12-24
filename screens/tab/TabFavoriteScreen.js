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
    // const spotImage = item.images?.[0]?.uri || item.image || require('../../assets/images/no-image.png');
    const spotImage = item.images?.[0]?.uri || item.image || '';
    const formattedDate = new Date(
      item.addedToFavoritesAt,
    ).toLocaleDateString();

    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleSpotPress(item)}>
        <LinearGradient
          colors={['rgba(43, 52, 103, 0.9)', 'rgba(26, 31, 60, 0.9)']}
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
              colors={['transparent', 'rgba(0,0,0,0.8)']}
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
                <LinearGradient colors={['#ff4444', '#cc0000']}>
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
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite spots yet</Text>
        <Text style={styles.emptySubtext}>
          Add spots to your favorites to see them here
        </Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#2B3467', '#1a1f3c']} style={styles.container}>
      <Text style={styles.headerTitle}>My Favorite Spots</Text>
      <FlatList
        data={favoriteSpots}
        renderItem={renderSpotCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{height: 50}} />}
      />
    </LinearGradient>
  );
};

export default TabFavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: '15%',
    textShadowColor: '#00ff00',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: width * 0.05,
    paddingBottom: 20,
  },
  cardContainer: {
    marginBottom: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#00ff00',
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
    height: '50%',
  },
  contentContainer: {
    padding: 15,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  emoji: {
    fontSize: 24,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textShadowColor: '#00ff00',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  description: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  date: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.6,
  },
  removeButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },

  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B3467',
  },
  emptyText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: '#00ff00',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
