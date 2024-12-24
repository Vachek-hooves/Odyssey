import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomSpotModal = ({
  visible,
  newSpot,
  onClose,
  onCreateSpot,
  onSpotChange,
}) => {
  const emojis = [
    '📍', '🎯', '⭐', '🎪', '🎭', '🎡', '🎢', '🎨',
    '🎰', '🍽️', '🏛️', '🏰', '🌟', '💫', '🌺', '🌴',
  ];

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
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {emojis.map(emoji => (
                <TouchableOpacity
                  key={emoji}
                  onPress={() => onSpotChange({...newSpot, emoji})}
                  style={[
                    styles.emojiOption,
                    newSpot.emoji === emoji && styles.selectedEmoji,
                  ]}>
                  <Text style={styles.emojiText}>{emoji}</Text>
                </TouchableOpacity>
              ))}
              <View style={{width: 20}} />
            </ScrollView>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Spot Name"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={newSpot.name}
            onChangeText={text => onSpotChange({...newSpot, name: text})}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description (optional)"
            placeholderTextColor="rgba(255,255,255,0.5)"
            multiline
            numberOfLines={4}
            value={newSpot.description}
            onChangeText={text => onSpotChange({...newSpot, description: text})}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.createButton}
              onPress={onCreateSpot}>
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
    // paddingHorizontal: 10,
  },
  modalContent: {
    width: '100%',
    maxWidth: '90%', // Added maxWidth to control modal size
    // padding: 20,
    borderRadius: 20,
    backgroundColor: '#2B3467',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
    textShadowColor: '#00ff00',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 30,
  },
  input: {
    // width: '100%', // Ensure input takes full width of parent
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#00ff00',
    fontSize: 16,
    marginRight: 10,
    marginLeft: 10,
    width: '90%',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  emojiSelector: {
    // width: '100%', // Added width
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginHorizontal: 20,
  },
  emojiOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  selectedEmoji: {
    backgroundColor: 'rgba(0,255,0,0.2)',
    borderWidth: 2,
    borderColor: '#00ff00',
  },
  emojiText: {
    fontSize: 24,
  },
  modalButtons: {
    // width: '100%', // Added width
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBlock: 20,
    marginHorizontal: 10,
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
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 15,
    borderRadius: 15,
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CustomSpotModal;
