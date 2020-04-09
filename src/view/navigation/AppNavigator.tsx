import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Screens from "./Screens";

import Home from "../Home";
import ImageDetails from "../ImageDetails";

const Stack = createStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={Screens.Home}>
            <Stack.Screen name={Screens.Home} component={Home}/>
            <Stack.Screen name={Screens.ImageDetails} component={ImageDetails}/>
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;
