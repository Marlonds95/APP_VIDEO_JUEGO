import { StyleSheet, Text } from "react-native";
import { Coordinate } from "../types/types";
import { styles } from "../theme/styles";






export function Food ({x,y}: Coordinate):JSX.Element{
    return (<Text style={[{top: y *10, left: x*10}, styles.food]}>🍎</Text>
    )
}
