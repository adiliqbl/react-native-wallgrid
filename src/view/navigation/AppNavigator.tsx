import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Provider} from "react-redux";
import store from "../../store"
import Screens from "./Screens";

import Home from "../Home";
import ImageDetails from "../ImageDetails";

const Stack = createStackNavigator();

const AppNavigator = () => (
    <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Screens.Home}>
                <Stack.Screen name={Screens.Home} component={Home}/>
                <Stack.Screen name={Screens.ImageDetails} component={ImageDetails}/>
            </Stack.Navigator>
        </NavigationContainer>
    </Provider>
);

export default AppNavigator;
