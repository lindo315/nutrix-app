import React from 'react';
import { 
  View, 
  StyleSheet, 
  ViewProps, 
  TouchableOpacity, 
  TouchableOpacityProps, 
  StyleProp, 
  ViewStyle 
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

interface CardProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

interface TouchableCardProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export function Card({ style, children, ...props }: CardProps) {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
}

export function TouchableCard({ style, children, ...props }: TouchableCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.card, style]} 
      activeOpacity={0.7}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});