import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableHighlight } from 'react-native';
import { Colors } from '../theme/colors';
import { ref, onValue } from 'firebase/database';
import { auth, dbRealTime } from '../../src/configs/firebaseConfig';
import { styles } from '../theme/styles';

interface Score {
    score: number;
}

export const ScoresModal: React.FC = () => {
    const [scores, setScores] = useState<Score[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            console.error('User not authenticated or not found.');
            return;
        }

        const userId = user.uid;
        const userScoresRef = ref(dbRealTime, `users/${userId}/scores`);

        const handleScoresChange = (snapshot: any) => {
            if (snapshot.exists()) {
                const scoresData = snapshot.val();
                const scoresArray: Score[] = Object.keys(scoresData).map(key => ({
                    score: scoresData[key]
                }));
                setScores(scoresArray);
            } else {
                // console.log('No scores found.');
                setScores([]); 
            }
        };


        const scoresListener = onValue(userScoresRef, handleScoresChange);

        return () => {
            
            scoresListener();
        };
    }, []);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <View style={styles.centeredViewScore}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredViewScore}>
                    <View style={styles.modalViewScore}>
                        <Text style={styles.modalTextScore}>Top 10 Scores</Text>
                        {scores.map((score, index) => (
                            <Text key={index} style={styles.modalTextScore}>{index + 1}. {score.score}</Text>
                        ))}
                        <TouchableHighlight
                            style={{ ...styles.openButtonScore, backgroundColor: Colors.primary }}
                            onPress={toggleModal}
                        >
                            <Text style={styles.textStyleScore}>Close</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>

            <TouchableHighlight
                style={styles.openButtonScore}
                onPress={toggleModal}
            >
                <Text style={styles.textStyleScore}>Show Scores</Text>
            </TouchableHighlight>
        </View>
    );
};



