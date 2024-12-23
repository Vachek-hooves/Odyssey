import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CreateContext = createContext({});

const CUSTOM_SPOTS_KEY = 'customSpots';

export const AppContext = ({children}) => {
  const [welcome, setWelcome] = useState('welcome');
  const [customSpots, setCustomSpots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load custom spots from storage on initial render
  useEffect(() => {
    loadCustomSpots();
  }, []);

  // Load spots from AsyncStorage
  const loadCustomSpots = async () => {
    try {
      const storedSpots = await AsyncStorage.getItem(CUSTOM_SPOTS_KEY);
      if (storedSpots) {
        setCustomSpots(JSON.parse(storedSpots));
      }
    } catch (error) {
      console.error('Error loading custom spots:', error);
    } finally {
      setIsLoading(false);
    }
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
    welcome,
    customSpots,
    isLoading,
    createCustomSpot,
    deleteCustomSpot,
    updateCustomSpot,
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
