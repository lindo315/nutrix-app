import React from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';

interface CategoryButtonProps {
  title: string;
  icon: string;
  isActive?: boolean;
  onPress: () => void;
}

export function CategoryButton({ 
  title, 
  icon, 
  isActive = false, 
  onPress 
}: CategoryButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        isActive && styles.activeContainer
      ]} 
      onPress={onPress}
    >
      <View 
        style={[
          styles.iconContainer, 
          isActive && styles.activeIconContainer
        ]}
      >
        <Image source={{ uri: icon }} style={styles.icon} />
      </View>
      <Typography 
        variant="caption" 
        color={isActive ? 'primary' : 'gray'}
        style={styles.title}
      >
        {title}
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: Layout.spacing.lg,
  },
  activeContainer: {
    opacity: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: Colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.xs,
  },
  activeIconContainer: {
    backgroundColor: Colors.primary[100],
  },
  icon: {
    width: 30,
    height: 30,
  },
  title: {
    textAlign: 'center',
  },
});