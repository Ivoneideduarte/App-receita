import 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native';
import { Routes } from './src/routes'
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>

  );
}

