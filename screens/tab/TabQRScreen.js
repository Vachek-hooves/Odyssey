import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import QrCode from '../../components/Lottie/QrCode';
import CustomQR from '../../components/UI/CustomQR';

const TabQRScreen = () => {
  const [qrValue, setQrValue] = useState('');

  return (
    <LinearGradient
      colors={['rgba(81, 20, 175, 0.8)', 'rgba(255, 41, 117, 0.8)']}
      style={styles.container}>
      <ScrollView style={{flexGrow: 1, height: '100%'}}>
        <View style={styles.gradientContainer}>
          <CustomQR qrValue={qrValue} />
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
      </ScrollView>
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
    marginTop: 80,
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
    textAlign: 'center',
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
