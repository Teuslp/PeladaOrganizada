import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, TextInput } from 'react-native';
import { TeamCard } from '../components/TeamCard';
import { generateTeams } from '../utils/teamGenerator';
import { RootStackParamList, Team, Player, Group, TeamGenerationStrategy } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from '../components/Header';
import { theme } from '../theme';

interface GenerateTeamsScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'GenerateTeams'>;
  route: RouteProp<RootStackParamList, 'GenerateTeams'>;
}

export const GenerateTeamsScreen: React.FC<GenerateTeamsScreenProps> = ({ navigation, route }) => {
  const { players, groups } = route.params;
  const [teams, setTeams] = useState<Team[]>([]);
  const [numberOfTeams, setNumberOfTeams] = useState<string>('2');
  const [strategy, setStrategy] = useState<TeamGenerationStrategy>('BALANCED');

  const handleGenerateTeams = () => {
    const numTeams = parseInt(numberOfTeams, 10);
    
    if (isNaN(numTeams)) {
      Alert.alert('Erro', 'Por favor, digite um número válido');
      return;
    }
    
    if (numTeams < 2) {
      Alert.alert('Erro', 'O número mínimo de times é 2');
      return;
    }
    
    if (numTeams > 10) {
      Alert.alert('Erro', 'O número máximo de times é 10');
      return;
    }
    
    if (players.length < numTeams) {
      Alert.alert('Erro', `Não há jogadores suficientes. Você precisa de pelo menos ${numTeams} jogadores`);
      return;
    }

    try {
      const generatedTeams = generateTeams(players, numTeams, strategy, groups);
      setTeams(generatedTeams);
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Erro', error.message);
      } else {
        Alert.alert('Erro', 'Ocorreu um erro desconhecido ao gerar os times');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Gerar Times" />
      
      <View style={styles.content}>
        <View style={styles.controlsContainer}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          
          <Text style={styles.label}>Número de Times (2-10)</Text>
          <TextInput
            style={styles.numberInput}
            keyboardType="numeric"
            value={numberOfTeams}
            onChangeText={setNumberOfTeams}
            placeholder="Digite o número"
          />
          
          <Text style={styles.label}>Estratégia de Divisão</Text>
          <View style={styles.strategyButtons}>
            <StrategyButton
              icon="balance"
              label="Balanceado"
              active={strategy === 'BALANCED'}
              onPress={() => setStrategy('BALANCED')}
              color={theme.colors.primary}
            />
            <StrategyButton
              icon="shuffle"
              label="Aleatório"
              active={strategy === 'RANDOM'}
              onPress={() => setStrategy('RANDOM')}
              color={theme.colors.secondary}
            />
          </View>
          
          {groups.length > 0 && (
            <>
              <Text style={styles.label}>Estratégia de Grupos</Text>
              <View style={styles.strategyButtons}>
                <StrategyButton
                  icon="group-work"
                  label="Misturar"
                  active={strategy === 'MIX_GROUPS'}
                  onPress={() => setStrategy('MIX_GROUPS')}
                  color={theme.colors.accent}
                />
                <StrategyButton
                  icon="groups"
                  label="Separar"
                  active={strategy === 'SEPARATE_GROUPS'}
                  onPress={() => setStrategy('SEPARATE_GROUPS')}
                  color={theme.colors.success}
                />
              </View>
            </>
          )}
          
          <TouchableOpacity 
            style={styles.generateButton}
            onPress={handleGenerateTeams}
          >
            <Icon name="emoji-events" size={24} color="white" />
            <Text style={styles.generateButtonText}>Gerar Times</Text>
          </TouchableOpacity>
        </View>
        
        {teams.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Times Gerados</Text>
            <FlatList
              data={teams}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TeamCard team={item} groups={groups} />
              )}
              contentContainerStyle={styles.teamsList}
            />
          </>
        )}
      </View>
    </View>
  );
};

const StrategyButton = ({ icon, label, active, onPress, color }: {
  icon: string;
  label: string;
  active: boolean;
  onPress: () => void;
  color: string;
}) => (
  <TouchableOpacity
    style={[
      styles.strategyButton,
      { backgroundColor: active ? color : theme.colors.card },
      { borderColor: color },
    ]}
    onPress={onPress}
  >
    <Icon name={icon} size={20} color={active ? 'white' : color} />
    <Text style={[
      styles.strategyButtonText,
      { color: active ? 'white' : color },
    ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.medium,
  },
  controlsContainer: {
    marginBottom: theme.spacing.large,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginVertical: theme.spacing.medium,
  },
  label: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: theme.spacing.small,
  },
  numberInput: {
    height: 50,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: theme.radius.medium,
    paddingHorizontal: theme.spacing.medium,
    marginBottom: theme.spacing.large,
    fontSize: 16,
    color: theme.colors.text,
  },
  strategyButtons: {
    flexDirection: 'row',
    gap: theme.spacing.small,
    marginBottom: theme.spacing.large,
  },
  strategyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.small,
    borderRadius: theme.radius.medium,
    borderWidth: 1,
    gap: theme.spacing.small,
  },
  strategyButtonText: {
    fontFamily: theme.fonts.bold,
    fontSize: 14,
  },
  generateButton: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.medium,
    borderRadius: theme.radius.medium,
    gap: theme.spacing.small,
    ...theme.shadow.small,
    marginBottom: theme.spacing.large,
  },
  generateButtonText: {
    color: 'white',
    fontFamily: theme.fonts.bold,
    fontSize: 16,
  },
  teamsList: {
    paddingBottom: theme.spacing.xlarge,
  },
});