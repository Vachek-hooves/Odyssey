import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CreateContext = createContext({});

const CUSTOM_SPOTS_KEY = 'customSpots';
const FAVORITE_SPOTS_KEY = 'favoriteSpots';

export const AppContext = ({children}) => {
  const [customSpots, setCustomSpots] = useState([]);
  const [favoriteSpots, setFavoriteSpots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data on initial render
  useEffect(() => {
    loadInitialData();
  }, []);

  // Load all data from AsyncStorage
  const loadInitialData = async () => {
    try {
      const [storedSpots, storedFavorites] = await Promise.all([
        AsyncStorage.getItem(CUSTOM_SPOTS_KEY),
        AsyncStorage.getItem(FAVORITE_SPOTS_KEY),
      ]);

      if (storedSpots) {
        setCustomSpots(JSON.parse(storedSpots));
      }
      if (storedFavorites) {
        setFavoriteSpots(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save favorites to AsyncStorage
  const saveFavoriteSpots = async (updatedFavorites) => {
    try {
      await AsyncStorage.setItem(
        FAVORITE_SPOTS_KEY,
        JSON.stringify(updatedFavorites),
      );
    } catch (error) {
      console.error('Error saving favorite spots:', error);
    }
  };

  // Add spot to favorites
  const addToFavorites = async (spot) => {
    try {
      const spotWithTimestamp = {
        ...spot,
        addedToFavoritesAt: new Date().toISOString(),
      };
      const updatedFavorites = [...favoriteSpots, spotWithTimestamp];
      setFavoriteSpots(updatedFavorites);
      await saveFavoriteSpots(updatedFavorites);
      return {success: true};
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return {success: false, error: error.message};
    }
  };

  // Remove spot from favorites
  const removeFromFavorites = async (spotId) => {
    try {
      const updatedFavorites = favoriteSpots.filter(spot => spot.id !== spotId);
      setFavoriteSpots(updatedFavorites);
      await saveFavoriteSpots(updatedFavorites);
      return {success: true};
    } catch (error) {
      console.error('Error removing from favorites:', error);
      return {success: false, error: error.message};
    }
  };

  // Check if spot is in favorites
  const isSpotFavorite = (spotId) => {
    return favoriteSpots.some(spot => spot.id === spotId);
  };

  // Save spots to AsyncStorage
  const saveCustomSpots = async (updatedSpots) => {
    try {
      await AsyncStorage.setItem(CUSTOM_SPOTS_KEY, JSON.stringify(updatedSpots));
    } catch (error) {
      console.error('Error saving custom spots:', error);
    }
  };

  // Create new custom spot
  const createCustomSpot = async (spotData) => {
    try {
      const newSpot = {
        id: `custom-${Date.now()}`,
        ...spotData,
        createdAt: new Date().toISOString(),
      };

      const updatedSpots = [...customSpots, newSpot];
      setCustomSpots(updatedSpots);
      await saveCustomSpots(updatedSpots);
      return { success: true, spot: newSpot };
    } catch (error) {
      console.error('Error creating custom spot:', error);
      return { success: false, error: error.message };
    }
  };

  // Delete custom spot
  const deleteCustomSpot = async (spotId) => {
    try {
      const updatedSpots = customSpots.filter(spot => spot.id !== spotId);
      setCustomSpots(updatedSpots);
      await saveCustomSpots(updatedSpots);
      return { success: true };
    } catch (error) {
      console.error('Error deleting custom spot:', error);
      return { success: false, error: error.message };
    }
  };

  // Update custom spot
  const updateCustomSpot = async (spotId, updatedData) => {
    try {
      const updatedSpots = customSpots.map(spot => 
        spot.id === spotId ? { ...spot, ...updatedData } : spot
      );
      setCustomSpots(updatedSpots);
      await saveCustomSpots(updatedSpots);
      return { success: true };
    } catch (error) {
      console.error('Error updating custom spot:', error);
      return { success: false, error: error.message };
    }
  };

  const providerValue = {
    customSpots,
    favoriteSpots,
    isLoading,
    createCustomSpot,
    deleteCustomSpot,
    updateCustomSpot,
    addToFavorites,
    removeFromFavorites,
    isSpotFavorite,
  };

  return (
    <CreateContext.Provider value={providerValue}>
      {children}
    </CreateContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(CreateContext);
  if (!context) {
    throw new Error('useAppContext must be used inside AppContext');
  }
  return context;
};
