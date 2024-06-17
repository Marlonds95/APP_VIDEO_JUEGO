import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableHighlight } from 'react-native';
import { Colors } from '../theme/colors';
import { ref, onValue } from 'firebase/database';
import { auth, dbRealTime } from '../../src/configs/firebaseConfig';

interface Score {
    score: number;
}

const ScoresModal: React.FC = () => {
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
                console.log('No scores found.');
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
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Top 10 Scores</Text>
                        {scores.map((score, index) => (
                            <Text key={index} style={styles.modalText}>{index + 1}. {score.score}</Text>
                        ))}
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: Colors.primary }}
                            onPress={toggleModal}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>

            <TouchableHighlight
                style={styles.openButton}
                onPress={toggleModal}
            >
                <Text style={styles.textStyle}>Show Scores</Text>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
    },
    openButton: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ScoresModal;
