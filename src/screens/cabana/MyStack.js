import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cabana from './cabana'; // Ruta del archivo
import AddCabana from './addCabana'; // Ruta del archivo

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
    <Stack.Screen name="cabana" component={Cabana} />
    <Stack.Screen name="addCabana" component={AddCabana} />
  </Stack.Navigator>
  );
}
