import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/account/Login'

const Stack = createStackNavigator()
export default function AccountStack() {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={Login}
            options={{title: "Iniciar Sesión"}}
          />
        </Stack.Navigator>
    )
}
