import {StyleSheet, Text, View, ImageBackground, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';

const StackWelcomeScreen = ({navigation}) => {
  // Animation values for each word
  const vegasOpacity = useRef(new Animated.Value(0)).current;
  const journeyOpacity = useRef(new Animated.Value(0)).current;
  const anOpacity = useRef(new Animated.Value(0)).current;
  const epicOpacity = useRef(new Animated.Value(0)).current;
  const odysseyOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      Animated.timing(vegasOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(journeyOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(anOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(epicOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(odysseyOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('Tab');
    });
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/image/Vegasbg.png')}
      style={styles.backgroundImage}>
      <LinearGradient
        colors={['rgba(26, 0, 51, 0.5)', 'rgba(51, 0, 102, 0.8)']}
        style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Animated.View style={[styles.wordContainer, {opacity: vegasOpacity}]}>
              <Text style={[styles.text, styles.vegasText]}>Vegas</Text>
            </Animated.View>

            <Animated.View style={[styles.wordContainer, {opacity: journeyOpacity}]}>
              <Text style={[styles.text, styles.journeyText]}>Journey</Text>
            </Animated.View>

            <View style={styles.subtitleContainer}>
              <Animated.View style={[styles.wordContainer, {opacity: anOpacity}]}>
                <Text style={[styles.text, styles.smallText]}>An</Text>
              </Animated.View>

              <Animated.View style={[styles.wordContainer, {opacity: epicOpacity}]}>
                <Text style={[styles.text, styles.epicText]}>Epic</Text>
              </Animated.View>

              <Animated.View style={[styles.wordContainer, {opacity: odysseyOpacity}]}>
                <Text style={[styles.text, styles.odysseyText]}>Odyssey</Text>
              </Animated.View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default StackWelcomeScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  wordContainer: {
    marginVertical: 5,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  vegasText: {
    fontSize: 60,
    color: '#FF2975',
    textShadowColor: '#FF2975',
    textShadowRadius: 10,
    textShadowOffset: {width: 0, height: 0},
    shadowColor: '#FF2975',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  journeyText: {
    fontSize: 48,
    color: '#5114AF',
    textShadowColor: '#5114AF',
    marginBottom: 20,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  smallText: {
    fontSize: 24,
    color: '#fff',
    textShadowColor: '#FF2975',
    marginRight: 8,
  },
  epicText: {
    fontSize: 36,
    color: '#FF2975',
    textShadowColor: '#FF2975',
    marginRight: 8,
  },
  odysseyText: {
    fontSize: 36,
    color: '#5114AF',
    textShadowColor: '#5114AF',
  },
});
