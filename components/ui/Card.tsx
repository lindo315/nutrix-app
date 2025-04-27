import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/constants/Layout';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  onPress?: () => void;
  style?: ViewStyle;
  elevation?: number;
}

export default function Card({ 
  children, 
  title, 
  onPress, 
  style, 
  elevation = 1 
}: CardProps) {
  const { colors } = useTheme();
  
  const cardContent = (
    <View 
      style={[
        styles.card, 
        { 
          backgroundColor: colors.card,
          shadowOpacity: 0.1 * elevation,
          shadowRadius: 2 * elevation,
          shadowOffset: { height: elevation, width: 0 },
          borderColor: colors.border,
        }, 
        style
      ]}
    >
      {title && (
        <Text style={[styles.title, { color: colors.text }]}>
          {title}
        </Text>
      )}
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={onPress}
        style={styles.touchable}
      >
        {cardContent}
      </TouchableOpacity>
    );
  }

  return cardContent;
}

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
  },
  card: {
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    marginVertical: Layout.spacing.s,
    borderWidth: 1,
    shadowColor: '#000',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: Layout.spacing.s,
  },
});