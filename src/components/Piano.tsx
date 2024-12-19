import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import soundMap from '../assets/sounds'; 
const notes = [
  { note: 'do', label: 'DO' },
  { note: 're', label: 'RE' },
  { note: 'mi', label: 'MI' },
  { note: 'fa', label: 'FA' },
  { note: 'sol', label: 'SOL' },
  { note: 'la', label: 'LA' },
  { note: 'si', label: 'SI' },
];


const blackKeyPositions = [
  0, 
  1, 
  null, 
  3, 
  4, 
  5, 
];

const Piano = () => {
  const playNote = async (note: string) => {
    try {
      const { sound } = await Audio.Sound.createAsync(soundMap[note]);
      await sound.playAsync();
    } catch (error) {
      console.error(`Error al reproducir la nota ${note}:`, error);
    }
  };

  return (
    <View style={styles.pianoContainer}>
      {}
      <View style={styles.whiteKeys}>
        {notes.map((key, index) => (
          <TouchableOpacity
            key={index}
            style={styles.whiteKey}
            onPress={() => playNote(key.note)}
          >
            <Text style={styles.noteLabel}>{key.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {}
      <View style={styles.blackKeys}>
        {blackKeyPositions.map((position, index) =>
          position !== null ? (
            <View
              key={index}
              style={[
                styles.blackKey,
                { left: `${position * 14.28 + 7}%` }, 
              ]}
            />
          ) : (
            <View key={index} style={{ width: '14.28%' }} /> 
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pianoContainer: {
    width: '100%',
    height: Dimensions.get('window').height * 0.3, 
    position: 'relative',
  },
  whiteKeys: {
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  whiteKey: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 1,
  },
  noteLabel: {
    fontSize: Dimensions.get('window').width * 0.03, 
    fontWeight: 'bold',
    marginBottom: 5,
  },
  blackKeys: {
    position: 'absolute',
    width: '100%',
    height: '60%', 
    flexDirection: 'row',
    zIndex: 2,
  },
  blackKey: {
    position: 'absolute',
    width: '10%',
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 5,
  },
});

export default Piano;
