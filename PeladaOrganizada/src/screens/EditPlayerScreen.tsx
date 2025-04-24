import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SkillLevel, Player, RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface EditPlayerScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'EditPlayer'>;
  route: RouteProp<RootStackParamList, 'EditPlayer'> & {
    params: {
      player: Player;
      onSavePlayer: (player: Player) => void;
    };
  };
}

export const EditPlayerScreen: React.FC<EditPlayerScreenProps> = ({ navigation, route }) => {
  const { player, onSavePlayer } = route.params;
  const [name, setName] = useState(player.name);
  const [skill, setSkill] = useState<SkillLevel>(player.skill);
  
  const handleSave = () => {
    if (!name.trim()) {
      alert('Por favor, insira um nome para o jogador');
      return;
    }
    
    const updatedPlayer = {
      ...player,
      name: name.trim(),
      skill,
    };
    
    onSavePlayer(updatedPlayer);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Jogador</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome do jogador"
        value={name}
        onChangeText={setName}
      />
      
      <Text style={styles.label}>Nível de habilidade:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={skill}
          onValueChange={(itemValue: SkillLevel) => setSkill(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Ruim" value="Ruim" />
          <Picker.Item label="Médio" value="Médio" />
          <Picker.Item label="Bom" value="Bom" />
        </Picker>
      </View>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Icon name="cancel" size={20} color="white" />
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Icon name="save" size={20} color="white" />
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  cancelButton: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});