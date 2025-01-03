import {StyleSheet, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const CustomQR = ({qrValue}) => {
  
  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        <QRCode
          value={`Spot password: ${qrValue}`}
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
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#00ff00',
    overflow: 'hidden',
    padding: 4,
  },
});
