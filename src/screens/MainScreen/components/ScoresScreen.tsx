import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { dbRealTime } from '../../../configs/firebaseConfig';
import { ref, get } from 'firebase/database';
import { Colors } from '../../../theme/colors';
import { styles } from '../../../theme/styles';

interface UserScore {
    email: string;
    score: number;
}

export const ScoresScreen = () => {
    const [scores, setScores] = useState<UserScore[]>([]);

    useEffect(() => {
        const fetchScores = async () => {
            const usersRef = ref(dbRealTime, 'users');
            const snapshot = await get(usersRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                const scoresArray: UserScore[] = [];

                for (const userId in data) {
                    const user = data[userId];
                    if (user.scores && Array.isArray(user.scores) && user.scores.length > 0) {
                        const firstScore = user.scores[0];
                        const userEmail = user.email || 'Email no disponible';
                        scoresArray.push({ email: userEmail, score: firstScore });
                    }
                }

                const sortedScores = scoresArray.sort((a, b) => b.score - a.score).slice(0, 10);
                setScores(sortedScores);
            }
        };

        fetchScores();
    }, []);

    return (
        <ImageBackground source={require('../../../../assets/img/snake.jpg')} style={styles.backgroundImageScoreSa}>
            <View style={styles.containerScoreSa}>
                <Text style={styles.titleScoreSa}>Top 10 Puntajes</Text>
                <FlatList
                    data={scores}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.scoreItemScoreSa}>
                            <Text style={styles.modalTextGameOver}>Correo: {item.email}</Text>
                            <Text style={styles.modalTextGameOver}>Puntaje: {item.score}</Text>
                        </View>
                    )}
                />
            </View>
        </ImageBackground>
    );
};

