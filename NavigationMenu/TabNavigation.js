import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StyleSheet, TouchableOpacity, AppState} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  TabAttractionsMapScreen,
  TabFavoriteScreen,
  TabQRScreen,
  TabTouristScreen,
} from '../screens/tab';
import {useState, useEffect} from 'react';
import {
  toggleBackgroundMusic,
  setupPlayer,
  pauseBackgroundMusic,
  playBackgroundMusic,
} from '../components/SoundSetUp/Sound';
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const [isPlayMusic, setIsPlayMusic] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active' && isPlayMusic) {
        playBackgroundMusic();
      } else if (nextAppState === 'inactive' || nextAppState === 'background') {
        pauseBackgroundMusic();
      }
    });
    const initMusic = async () => {
      await setupPlayer();
      await playBackgroundMusic();
      setIsPlayMusic(true);
    };
    initMusic();

    return () => {
      subscription.remove();
      pauseBackgroundMusic();
    };
  }, []);

  const handlePlayMusicToggle = () => {
    const newState = toggleBackgroundMusic();
    setIsPlayMusic(newState);
    // setIsPlayMusic(prev => !prev);
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#00ff00', // Neon green
        tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
        tabBarBackground: () => (
          <LinearGradient
            colors={['#2B3467', '#1a1f3c']}
            style={StyleSheet.absoluteFill}
          />
        ),
      }}>
      <Tab.Screen
        name="TabTouristScreen"
        component={TabTouristScreen}
        options={{
          tabBarLabel: ({focused, color}) => (
            <Text
              style={[
                styles.tabBarLabel,
                {
                  color: focused ? '#fff' : 'rgba(255,255,255,0.5)',
                  textShadowColor: focused ? '#00ff00' : 'transparent',
                  textShadowRadius: focused ? 10 : 0,
                },
              ]}>
              Tourist
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Text
                style={[
                  styles.tabBarIcon,
                  {
                    color: focused ? '#fff' : 'rgba(255,255,255,0.5)',
                    textShadowColor: focused ? '#00ff00' : 'transparent',
                    textShadowRadius: focused ? 10 : 0,
                  },
                ]}>
                👤
              </Text>
              {focused && (
                <LinearGradient
                  colors={['#00ff00', '#00cc00']}
                  style={styles.activeIndicator}
                />
              )}
            </View>
          ),
          tabBarIconStyle: styles.iconStyle,
        }}
      />
      <Tab.Screen
        name="TabAttractionMapScreen"
        component={TabAttractionsMapScreen}
        options={{
          tabBarLabel: ({focused, color}) => (
            <Text
              style={[
                styles.tabBarLabel,
                {
                  color: focused ? '#fff' : 'rgba(255,255,255,0.5)',
                  textShadowColor: focused ? '#00ff00' : 'transparent',
                  textShadowRadius: focused ? 10 : 0,
                },
              ]}>
              Map
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Text
                style={[
                  styles.tabBarIcon,
                  {
                    color: focused ? '#fff' : 'rgba(255,255,255,0.5)',
                    textShadowColor: focused ? '#00ff00' : 'transparent',
                    textShadowRadius: focused ? 10 : 0,
                  },
                ]}>
                🗺️
              </Text>
              {focused && (
                <LinearGradient
                  colors={['#00ff00', '#00cc00']}
                  style={styles.activeIndicator}
                />
              )}
            </View>
          ),
          tabBarIconStyle: styles.iconStyle,
        }}
      />
      <Tab.Screen
        name="TabFavoriteScreen"
        component={TabFavoriteScreen}
        options={{
          tabBarLabel: ({focused, color}) => (
            <Text
              style={[
                styles.tabBarLabel,
                {
                  color: focused ? '#fff' : 'rgba(255,255,255,0.5)',
                  textShadowColor: focused ? '#00ff00' : 'transparent',
                  textShadowRadius: focused ? 10 : 0,
                },
              ]}>
              Favorite
            </Text>
          ),

          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Text
                style={[
                  styles.tabBarIcon,
                  {
                    color: focused ? '#fff' : 'rgba(255,255,255,0.5)',
                    textShadowColor: focused ? '#00ff00' : 'transparent',
                    textShadowRadius: focused ? 10 : 0,
                  },
                ]}>
                💖
              </Text>
              {focused && (
                <LinearGradient
                  colors={['#00ff00', '#00cc00']}
                  style={styles.activeIndicator}
                />
              )}
            </View>
          ),
          tabBarIconStyle: styles.iconStyle,
        }}
      />
      <Tab.Screen
        name="TabQRScreen"
        component={TabQRScreen}
        options={{
          tabBarLabel: ({focused, color}) => (
            <Text
              style={[
                styles.tabBarLabel,
                {
                  color: focused ? '#fff' : 'rgba(255,255,255,0.5)',
                  textShadowColor: focused ? '#00ff00' : 'transparent',
                  textShadowRadius: focused ? 10 : 0,
                },
              ]}>
              QR
            </Text>
          ),

          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Text
                style={[
                  styles.tabBarIcon,
                  {
                    color: focused ? '#fff' : 'rgba(255,255,255,0.8)',
                    textShadowColor: focused ? '#00ff00' : 'transparent',
                    textShadowRadius: focused ? 10 : 0,
                  },
                ]}>
                🂾
              </Text>
              {focused && (
                <LinearGradient
                  colors={['#00ff00', '#00cc00']}
                  style={styles.activeIndicator}
                />
              )}
            </View>
          ),
          tabBarIconStyle: styles.iconStyle,
        }}
      />
      <Tab.Screen
        name="Sound"
        component={EmptySound}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.tabBarLabel,
                {
                  color: focused ? '#fff' : 'rgba(255,255,255,0.5)',
                  textShadowColor: isPlayMusic ? '#00ff00' : 'transparent',
                  textShadowRadius: isPlayMusic ? 10 : 0,
                },
              ]}>
              Sound
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={handlePlayMusicToggle}>
                <Text
                  style={[
                    styles.tabBarIcon,
                    {
                      color: isPlayMusic ? '#fff' : 'rgba(255,255,255,0.8)',
                      textShadowColor: isPlayMusic ? '#00ff00' : 'transparent',
                      textShadowRadius: isPlayMusic ? 10 : 0,
                    },
                  ]}>
                  🔊
                </Text>
              </TouchableOpacity>
              {focused && (
                <LinearGradient
                  colors={['#00ff00', '#00cc00']}
                  style={styles.activeIndicator}
                />
              )}
            </View>
          ),
          tabBarIconStyle: styles.iconStyle,
        }}
        listeners={{tabPress: e => e.preventDefault()}}
      />
    </Tab.Navigator>
  );
};

const EmptySound = () => null;

const styles = StyleSheet.create({
  tabBar: {
    height: 110,
    borderTopWidth: 0,
    elevation: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
    textShadowOffset: {width: 1, height: 1},
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 10,

    // width: 65,
    // height: 65,
  },
  tabBarIcon: {
    fontSize: 42,
    // marginBottom: 3,
    textShadowOffset: {width: 1, height: 1},
    borderRadius: '50%',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -4,
    width: 4,
    height: 4,
    borderRadius: 2,
    shadowColor: '#00ff00',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  iconStyle: {
    borderRadius: '50%',
    width: 75,
    height: 65,
    // borderRadius: '50%',
  },
});

export default TabNavigation;
