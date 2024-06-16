import { Fragment } from "react";
import { Coordinate } from "../types/types";
import { StyleSheet, View } from "react-native";
import { Colors } from "../theme/colors";
interface SnackeProps{
    snake: Coordinate[];
}

export function Snake({snake}: SnackeProps):JSX.Element{
    return(
        <Fragment>
            {snake.map((segment:any, index: number)=>{
                const segmentStyle ={
                    left: segment.x * 10, // ajust size of each segment
                    top: segment.y *10,
                }
                return (<View key={index} style={[style.snake, segmentStyle]}/>)
            })}
        </Fragment>
    )
}

const style = StyleSheet.create({
    snake:{
        width:15,
        height:15,
        borderRadius:7,
        backgroundColor: Colors.primary,
        position: "absolute",
    }

})