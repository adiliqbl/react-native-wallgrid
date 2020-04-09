import {StackNavigationHelpers} from "@react-navigation/stack/lib/typescript/src/types";
import {RouteProp} from "@react-navigation/native";
import NavigationParams from "../../view/navigation/NavigationParams";

export type NavigationProp<RouteName extends keyof NavigationParams> = {
    navigation: StackNavigationHelpers,
    route: RouteProp<NavigationParams, RouteName>
}
