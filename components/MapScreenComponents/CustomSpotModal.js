import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomSpotModal = ({visible, onClose, onSubmit, spot, onSpotChange}) => {
  const emojis = ['📍', '🎯', '⭐', '🎪', '🎭', '🎡'];

  const handleTextChange = (field, value) => {
    onSpotChange({
      ...spot,
      [field]: value,
    });
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <LinearGradient
          colors={['#2B3467', '#1a1f3c']}
          style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create New Spot</Text>

          <View style={styles.emojiSelector}>
            {emojis.map(emoji => (
              <TouchableOpacity
                key={emoji}
                onPress={() => handleTextChange('emoji', emoji)}
                style={[
                  styles.emojiOption,
                  spot?.emoji === emoji && styles.selectedEmoji,
                ]}>
                <Text style={styles.emojiText}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Spot Name"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={spot?.name}
            onChangeText={text => handleTextChange('name', text)}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description (optional)"
            placeholderTextColor="rgba(255,255,255,0.5)"
            multiline
            numberOfLines={4}
            value={spot?.description}
            onChangeText={text => handleTextChange('description', text)}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.createButton} onPress={onSubmit}>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textShadowColor: '#00ff00',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0,255,0,0.3)',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  emojiSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emojiOption: {
    padding: 10,
    borderRadius: 25,
    margin: 5,
  },
  selectedEmoji: {
    backgroundColor: 'rgba(0,255,0,0.2)',
  },
  emojiText: {
    fontSize: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  createButton: {
    flex: 1,
    backgroundColor: '#00ff00',
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CustomSpotModal;
