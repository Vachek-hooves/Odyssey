import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

const QrCode = () => {
  return (
    <LottieView
      source={require('../../assets/animation/qrcode.json')}
      autoPlay
      loop
      style={styles.lottie}
    />
  );
};

export default QrCode;

const styles = StyleSheet.create({
  lottie: {
    width: '100%',
    height: '30%',
  },
});
