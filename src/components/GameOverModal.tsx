import React, { useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableHighlight } from 'react-native';
import { Colors } from '../theme/colors';
import { styles } from '../theme/styles';

interface Props {
  visible: boolean;
  score: number;
  onClose: () => void;
  saveScore: (score: number) => void;
}

export const GameOverModal: React.FC<Props> = ({ visible, score, onClose, saveScore }) => {
  const handleClose = () => {
    saveScore(score);  // Llamar a saveScore correctamente
    onClose();
  };

  useEffect(() => {
    if (visible) {
      // console.log('GameOverModal is visible, score:', score);
    }
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.centeredViewGameOver}>
        <View style={styles.modalViewGameOver}>
          <Text style={styles.modalTextGameOver}>Perdiste</Text>
          <Text style={styles.modalTextGameOver}>Score: {score}</Text>
          <TouchableHighlight
            style={{ ...styles.openButtonGameOver, backgroundColor: Colors.primary }}
            onPress={handleClose}
          >
            <Text style={styles.textStyleGameOver}>Cerrar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};




