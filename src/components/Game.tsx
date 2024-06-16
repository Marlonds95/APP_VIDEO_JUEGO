import React from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../theme/colors'
import { Header } from './Header'
import { Coordinate, Direction, GestureEventType } from '../types/types'
import { Snake } from './Snake'
import { checkGameOver } from '../utils/checkGameOver'
import { Food } from './Food';
import { checkEatsFood } from '../utils/checkEatsFood'
import { randomFoodPosition } from '../utils/randomFoodPosition'
import { reload } from 'firebase/auth'
import Score from './Score';
import GameOverModal from './GameOverModal';

const screenWidth = Math.round(Dimensions.get('window').width).toString().charAt(0) + '0';
const screenHeight = Math.round(Dimensions.get('window').height).toString().charAt(0) + '0';
const firstDigit = screenHeight.charAt(0);
const firstWidthDigit = screenWidth.charAt(0);
const adjustedNumber = parseInt((parseInt(firstDigit) - 1) + '2');
const adjustedNumberX = parseInt((parseInt(firstWidthDigit) - 1) + '7');
const SNAKE_INITIAL_POSITION =[{ x: 5 , y : 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0 , xMax: adjustedNumberX , yMin: 0 , yMax: adjustedNumber};
const MOVE_INTERVAL=50;
const SCORE_INCREMENT=10;

export function Game ():JSX.Element  {
    const [direction, setDirection] = React.useState<Direction>(Direction.Right);
    const [snake, setSnake] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);
    const [isGameOver, setIsGameOver]= React.useState<boolean>(false);
    const [score, setScore] = React.useState<number>(0);
    const [isPaused, setIsPaused] = React.useState<boolean>(false);
    React.useEffect(()=>{
        if (!isGameOver){
            const intervalID = setInterval(()=>{
                !isPaused && moveSnake();
            }, MOVE_INTERVAL);
            return() => clearInterval(intervalID);
        
            
        }

    },[snake, isGameOver, isPaused]);

    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead ={...snakeHead};


        //Game over
if (checkGameOver(snakeHead, GAME_BOUNDS)){
    setIsGameOver((prev) => !prev);
    return;
}
        switch(direction){
            case Direction.Up:
                newHead.y -= 1;
                break;
            case Direction.Down:
                newHead.y += 1;
                break;
            case Direction.Left:
                newHead.x -=1;
                break;
            case Direction.Right:
                newHead.x +=1;
                break;
            default:
                break;
        }

        // check if eats food
        if (checkEatsFood(newHead, food, 2)){
        setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
         setSnake([newHead, ...snake]);
         setScore(score +SCORE_INCREMENT);
        }else{
            setSnake([newHead, ...snake.slice(0, -1)]);
        }   
    };

    const handleGesture = (event: GestureEventType) =>{
        const { translationX, translationY}=(event.nativeEvent);
        // console.log(translationX, translationY);

        if (Math.abs(translationX)> Math.abs(translationY)){
            if (translationX > 0){
                setDirection(Direction.Right);
            } else{
                setDirection(Direction.Left)
            }
        } else {
            if (translationY > 0){
                setDirection(Direction.Down);
        } else {
            setDirection(Direction.Up);
        }
    }
    };

    const reloadGame = () => {
        setSnake(SNAKE_INITIAL_POSITION);
        setFood(FOOD_INITIAL_POSITION);
        setIsGameOver(false);
        setScore(0);
        setDirection(Direction.Right);
        setIsPaused(false);
      };
    const pauseGame =() =>{
        setIsPaused(!isPaused);
    }
  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
        <SafeAreaView style={styles.container}>
           {<Header
           reloadGame={reloadGame}
           isPaused={isPaused}
           pauseGame={pauseGame}>
            <Score score={score} />
            
            </Header>} 
            <View style={styles.boundaries}>
            <Snake snake={snake}/>
            <Food x={food.x} y={food.y}/>
            
            </View>
            <GameOverModal
          visible={isGameOver}
          score={score}
          onClose={() => reloadGame()} 
        />
        </SafeAreaView>
    </PanGestureHandler>
  )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: Colors.primary,
    },
    boundaries:{
        flex:1,
        borderWidth:12,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        borderColor: Colors.primary,
        backgroundColor: Colors.background
    },
    
});
