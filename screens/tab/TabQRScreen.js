import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import QRCode from 'react-native-qrcode-svg'

const TabQRScreen = () => {
  const [qrValue, setQrValue] = useState('Hello World!')

  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        <QRCode
        value="http://awesome.link.qr"
          // value={qrValue}
          size={200}
          backgroundColor="white"
          color="black"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter text for QR code:</Text>
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
    </View>
  )
}

export default TabQRScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  qrContainer: {
    marginTop: 50,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    width: '100%',
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  helperText: {
    marginTop: 20,
    color: '#666',
    fontSize: 14,
  }
})