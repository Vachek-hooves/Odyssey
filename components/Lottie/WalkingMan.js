import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

const WalkingMan = () => {
  return (
    <LottieView
      source={require('../../assets/animation/walkingMan.json')}
      autoPlay
      loop
      style={styles.lottie}
    />
  );
};

export default WalkingMan;

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
