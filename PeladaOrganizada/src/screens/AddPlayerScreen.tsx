import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SkillLevel, RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from '../components/Header';
import { theme } from '../theme';

interface AddPlayerScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'AddPlayer'>;
  route: RouteProp<RootStackParamList, 'AddPlayer'>;
}

export const AddPlayerScreen: React.FC<AddPlayerScreenProps> = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [skill, setSkill] = useState<SkillLevel>('Médio');
  
  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Atenção', 'Por favor, insira um nome para o jogador');
      return;
    }
    
    const newPlayer = {
      id: Date.now().toString(),
      name: name.trim(),
      skill,
    };
    
    route.params?.onAddPlayer?.(newPlayer);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="Novo Jogador" />
      
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nome do Jogador</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: João Silva"
          value={name}
          onChangeText={setName}
          placeholderTextColor={theme.colors.text}
        />
        
        <Text style={styles.label}>Nível de Habilidade</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={skill}
            onValueChange={(itemValue: SkillLevel) => setSkill(itemValue)}
            style={styles.picker}
            dropdownIconColor={theme.colors.text}
          >
            <Picker.Item label="Ruim" value="Ruim" />
            <Picker.Item label="Médio" value="Médio" />
            <Picker.Item label="Bom" value="Bom" />
          </Picker>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.saveButton]} 
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Salvar Jogador</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  formContainer: {
    flex: 1,
    padding: theme.spacing.large,
  },
  label: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: theme.spacing.small,
    fontFamily: theme.fonts.bold,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: theme.radius.medium,
    paddingHorizontal: theme.spacing.medium,
    marginBottom: theme.spacing.large,
    fontSize: 16,
    color: theme.colors.text,
    backgroundColor: theme.colors.card,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: theme.radius.medium,
    marginBottom: theme.spacing.xlarge,
    overflow: 'hidden',
    backgroundColor: theme.colors.card,
  },
  picker: {
    height: 50,
    width: '100%',
    color: theme.colors.text,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.medium,
    gap: theme.spacing.medium,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: theme.radius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadow.small,
  },
  cancelButton: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.gray,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    fontFamily: theme.fonts.bold,
    fontSize: 16,
  },
});