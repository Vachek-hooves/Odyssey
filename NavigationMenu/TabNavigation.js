import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  TabTouristScreen,
  TabAttractionsMapScreen,
  TabHotelsScreen,
} from '../screens/tab';
import TabFavoriteScreen from '../screens/tab/TabFavoriteScreen';

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="TabTouristScreen" component={TabTouristScreen} />
      <Tab.Screen
        name="TabAttractionMapScreen"
        component={TabAttractionsMapScreen}
      />
      {/* <Tab.Screen name="TabHotelsScreen" component={TabHotelsScreen} /> */}
      <Tab.Screen name="TabFavoriteScreen" component={TabFavoriteScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
