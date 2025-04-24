import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { RootStackParamList, Group, Player } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const GROUP_COLORS = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5', '#FFD733'];

interface GroupManagementScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'GroupManagement'>;
  route: RouteProp<RootStackParamList, 'GroupManagement'>;
}

export const GroupManagementScreen: React.FC<GroupManagementScreenProps> = ({ navigation, route }) => {
  const { groups: initialGroups, players } = route.params;
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [newGroupName, setNewGroupName] = useState('');

  const handleAddGroup = () => {
    if (!newGroupName.trim()) {
      Alert.alert('Erro', 'Digite um nome para o grupo');
      return;
    }

    const newGroup: Group = {
      id: Date.now().toString(),
      name: newGroupName.trim(),
      playerIds: [],
      color: GROUP_COLORS[groups.length % GROUP_COLORS.length],
    };

    setGroups([...groups, newGroup]);
    setNewGroupName('');
  };

  const handleDeleteGroup = (id: string) => {
    setGroups(groups.filter(group => group.id !== id));
  };

  const handleSave = () => {
    route.params.onSaveGroups(groups);
    navigation.goBack();
  };

  const navigateToEditGroup = (group: Group) => {
    navigation.navigate('EditGroup', {
      group,
      players,
      onSaveGroup: (updatedGroup: Group) => {
        setGroups(groups.map(g => g.id === updatedGroup.id ? updatedGroup : g));
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Grupos</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome do novo grupo"
          value={newGroupName}
          onChangeText={setNewGroupName}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddGroup}>
          <Icon name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={groups}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.groupItem, { backgroundColor: item.color }]}>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{item.name}</Text>
              <Text style={styles.playerCount}>{item.playerIds.length} jogador(es)</Text>
            </View>
            <View style={styles.groupActions}>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => navigateToEditGroup(item)}
              >
                <Icon name="edit" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => handleDeleteGroup(item.id)}
              >
                <Icon name="delete" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum grupo criado ainda.</Text>
        }
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar Grupos</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupItem: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  playerCount: {
    fontSize: 14,
    color: 'white',
    marginTop: 4,
  },
  groupActions: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    padding: 5,
  },
  deleteButton: {
    padding: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});