import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const LogIn = () => {
  return (
    <LottieView
      source={require('../../assets/animation/logIn.json')}
      autoPlay
      loop
      style={styles.lottie}
    />
  );
};

export default LogIn;

const styles = StyleSheet.create({
  lottie: {
    width: '80%',
    height: '30%',
    marginTop: 40,
  },
});
