import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigator/StackNavigator';
import { theme } from "../TALLER_I/src/theme/theme"
const App = () => {
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <StackNavigator />
      </PaperProvider>
    </NavigationContainer>
    </GestureHandlerRootView>
  )
}
export default App;
