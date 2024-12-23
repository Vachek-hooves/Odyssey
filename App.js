import {AppContext} from './store/context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import TabNavigation from './NavigationMenu/TabNavigation';
import {StackAttracktionDetailsScreen} from './screens/stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AppContext>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Tab" component={TabNavigation} />
          <Stack.Screen
            name="StackAttracktionDetailsScreen"
            component={StackAttracktionDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext>
  );
}

export default App;
