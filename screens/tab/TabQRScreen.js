import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import QrCode from '../../components/Lottie/QrCode';

const TabQRScreen = () => {
  const [qrValue, setQrValue] = useState('User Saved name');

  return (
    <LinearGradient colors={['#2B3467', '#1a1f3c']} style={styles.container}>
      <View style={styles.gradientContainer}>
        {/* <LinearGradient colors={['#1a1f3c', '#2B3467']} style={styles.qrContainer}> */}
        <View style={styles.qrContainer}>
          <QRCode
            value={qrValue}
            size={200}
            backgroundColor="white"
            color="black"
          />
        </View>
        {/* </LinearGradient> */}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Enter text what you found in secret spot
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setQrValue}
          value={qrValue}
          placeholder="Enter text here"
          placeholderTextColor="rgba(255,255,255,0.5)"
        />
      </View>

      <Text style={styles.helperText}>
        The QR code updates automatically as you type
      </Text>

      <QrCode />
    </LinearGradient>
  );
};

export default TabQRScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    alignItems: 'center',
  },
  gradientContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
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
    padding:4
  },
  inputContainer: {
    width: '90%',
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#FFFFFF',
    fontWeight: '600',
    textShadowColor: '#00ff00',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#00ff00',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#FFFFFF',
  },
  helperText: {
    marginTop: 20,
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
    textShadowColor: '#00ff00',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
});
