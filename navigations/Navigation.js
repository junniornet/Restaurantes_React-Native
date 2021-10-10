import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Icon } from 'react-native-elements'

import AccountStack from './AccountStack'
import RestaurantsStack from './RestaurantsStack'
import FavoritesStack from './FavoritesStack'
import TopRestaurantsStack from './TopRestaurantsStack'
import SearchStack from './SearchStack'

const Tab = createBottomTabNavigator()

export default function Navigation() {
    const screenOptions = (route, color) =>{
        let iconName
        switch (route.name) {
            case "restaurantes":
                iconName="compass-outline"
                break;
            case "favoritos":
                iconName="heart-outline"
                break;
            case "top-restaurantes":
                iconName="star-outline"
                break;
            case "busca":
                iconName="magnify"
                break;
            case "cuenta":
                iconName="home-outline"
                break;
        }
        return (
            <Icon type="material-community" name={iconName} size={22} color={color} />
        )
    }
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="restaurantes"
/*                 screenOptions={{
                    "tabBarInactiveTintColor": "#ec8484",
                    "tabBarActiveTintColor": "#ee1501",
                    "tabBarStyle": [
                        {
                          "display": "flex"
                        },
                        null
                      ]
                }} */
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color),
                    tabBarInactiveTintColor: "#ec8484",
                    tabBarActiveTintColor: "#ee1501",
                    tabBarStyle: [
                        {
                          "display": "flex"
                        },
                        null
                      ]
                })}
            >
                <Tab.Screen
                    name="restaurantes"
                    component={RestaurantsStack}
                    options={{ title: "Restaurantes" }}
                />
                <Tab.Screen
                    name="favoritos"
                    component={FavoritesStack}
                    options={{ title: "Favoritos" }}
                />
                <Tab.Screen
                    name="top-restaurantes"
                    component={TopRestaurantsStack}
                    options={{ title: "Top 10" }}
                />
                <Tab.Screen
                    name="busca"
                    component={SearchStack}
                    options={{ title: "Buscar" }}
                />
                <Tab.Screen
                    name="cuenta"
                    component={AccountStack}
                    options={{ title: "Cuenta" }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

/* inactiveTintColor:"#ec8484", 
               activeTintColor:"#ee1501" */