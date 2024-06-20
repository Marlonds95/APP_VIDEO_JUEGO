import React from 'react';
import { View, Button, StyleSheet, Text, ImageBackground } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { styles } from '../../theme/styles';

const backgroundImage = require('../../../assets/img/snake.jpg'); 

export const MainScreen = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImageMain}>
            <View style={styles.containerMain}>
                <Text style={styles.titleMain}>SNAKE GAME</Text>
                <View style={styles.spaceMain} />
                <Button
                    title="Jugar"
                    onPress={() => navigation.dispatch(CommonActions.navigate('Login'))}
                    color="#4CAF50"
                />
                <View style={styles.spaceMain} />
                <Button
                    title="Puntajes de Jugadores"
                    onPress={() => navigation.dispatch(CommonActions.navigate('Scores'))}
                    color="#4CAF50"
                />
            </View>
        </ImageBackground>
    );
};


