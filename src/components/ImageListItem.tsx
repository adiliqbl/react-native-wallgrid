import React from "react";
import {Image, TouchableNativeFeedback} from "react-native";

const style = {
    width: "100%",
    height: 200
};

export default (props: any) => (
    <TouchableNativeFeedback onPress={props.onPress}>
        <Image source={{uri: props.url, cache: 'only-if-cached'}}
               style={style}/>
    </TouchableNativeFeedback>
);
