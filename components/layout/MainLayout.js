import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';

const MainLayout = ({children}) => {
  return (
    <ImageBackground
      source={require('../../assets/image/Vegasbg.png')}
      style={styles.background}>
      {children}
    </ImageBackground>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
