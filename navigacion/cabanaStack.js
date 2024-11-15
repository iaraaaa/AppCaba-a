import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'


import cabana from '../src/screens/cabana/cabana'

const Stack = createStackNavigator()

export default function cabanaStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="cabana"
                component={cabana}
                options={{ title: "Cabañas" }}
            />
        </Stack.Navigator>
    )
}