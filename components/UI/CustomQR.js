import {StyleSheet, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const CustomQR = ({qrValue}) => {
  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        <QRCode
          value={qrValue}
          size={200}
          backgroundColor="white"
          color="black"
        />
      </View>
    </View>
  );
};

export default CustomQR;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrContainer: {
    // padding: 20,
    borderRadius: 15,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 5,
    // elevation: 8,
    borderWidth: 1,
    borderColor: '#00ff00',
    overflow: 'hidden',
    padding: 4,
  },
});
