/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Scanner from './src/screens/Scanner';
import Home from './src/screens/Home';
import auth from '@react-native-firebase/auth';
import Login from './src/screens/Login';
const Stack = createNativeStackNavigator();

function App() {
  const [user, setUser] = React.useState();

  const onAuthStateSave = (userd: any) => setUser(userd);

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateSave);
    return subscriber;
  }, [user]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={user ? 'Home' : 'Login'}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
