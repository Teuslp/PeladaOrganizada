import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { theme } from '../theme';

export const Header = ({ title }: { title?: string }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/logo.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: theme.spacing.medium,
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: theme.radius.large,
    borderBottomRightRadius: theme.radius.large,
    ...theme.shadow.medium,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.large,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: theme.spacing.small,
  },
  title: {
    color: theme.colors.lightText,
    fontSize: 20,
    fontFamily: theme.fonts.bold,
  },
});