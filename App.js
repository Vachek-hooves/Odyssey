import {AppContext} from './store/context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './NavigationMenu/TabNavigation';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AppContext>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Tab" component={TabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext>
  );
}

export default App;
