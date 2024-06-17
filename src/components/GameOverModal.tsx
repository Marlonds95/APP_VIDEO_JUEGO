import React, { useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableHighlight } from 'react-native';
import { Colors } from '../theme/colors';

interface Props {
  visible: boolean;
  score: number;
  onClose: () => void;
  saveScore: (score: number) => void;
}

const GameOverModal: React.FC<Props> = ({ visible, score, onClose, saveScore }) => {
  const handleClose = () => {
    saveScore(score);  // Llamar a saveScore correctamente
    onClose();
  };

  useEffect(() => {
    if (visible) {
      console.log('GameOverModal is visible, score:', score);
    }
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Perdiste</Text>
          <Text style={styles.modalText}>Score: {score}</Text>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: Colors.primary }}
            onPress={handleClose}
          >
            <Text style={styles.textStyle}>Cerrar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
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
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GameOverModal;
