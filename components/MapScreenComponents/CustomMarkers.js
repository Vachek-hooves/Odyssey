import {StyleSheet, Text, View} from 'react-native';
import {useAppContext} from '../../store/context';
import LinearGradient from 'react-native-linear-gradient';

const CustomMarkers = () => {
  const {customSpots} = useAppContext();
  return (
    <View>
      <Text>CustomMarkers</Text>
    </View>
  );
};

export default CustomMarkers;

const styles = StyleSheet.create({});
