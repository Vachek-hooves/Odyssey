import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import QRCode from 'react-native-qrcode-svg';
import QrCode from '../../components/Lottie/QrCode';

const TabQRScreen = () => {
  const [qrValue, setQrValue] = useState('User Saved name');

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
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter text what you found in secret spot</Text>
        <TextInput
          style={styles.input}
          onChangeText={setQrValue}
          value={qrValue}
          placeholder="Enter text here"
          placeholderTextColor="#666"
        />
      </View>

      <Text style={styles.helperText}>
        The QR code updates automatically as you type
      </Text>

      
      <QrCode />
    </View>
  );
};

export default TabQRScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
    alignItems: 'center',
  },
  qrContainer: {
    marginTop: 50,
    padding: 20,
    backgroundColor: '#2D2D2D',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  inputContainer: {
    width: '100%',
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#3D3D3D',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#2D2D2D',
    color: '#FFFFFF',
  },
  helperText: {
    marginTop: 20,
    color: '#9E9E9E',
    fontSize: 14,
  },
});
