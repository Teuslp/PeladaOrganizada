import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { AddPlayerScreen } from './src/screens/AddPlayerScreen';
import { EditPlayerScreen } from './src/screens/EditPlayerScreen';
import { GenerateTeamsScreen } from './src/screens/GenerateTeamsScreen';
import { GroupManagementScreen } from './src/screens/GroupManagementScreen';
import { EditGroupScreen } from './src/screens/EditGroupScreen';
import { RootStackParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Pelada Organizada' }}
        />
        <Stack.Screen 
          name="AddPlayer" 
          component={AddPlayerScreen} 
          options={{ title: 'Adicionar Jogador' }}
        />
        <Stack.Screen 
          name="EditPlayer" 
          component={EditPlayerScreen} 
          options={{ title: 'Editar Jogador' }}
        />
        <Stack.Screen 
          name="GenerateTeams" 
          component={GenerateTeamsScreen} 
          options={{ title: 'Gerar Times' }}
        />
        <Stack.Screen 
          name="GroupManagement" 
          component={GroupManagementScreen} 
          options={{ title: 'Gerenciar Grupos' }}
        />
        <Stack.Screen 
          name="EditGroup" 
          component={EditGroupScreen} 
          options={{ title: 'Editar Grupo' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}