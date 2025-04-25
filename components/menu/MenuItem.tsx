import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { TouchableCard } from '@/components/ui/Card';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';

export interface MenuItemData {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface MenuItemProps {
  item: MenuItemData;
  onPress: () => void;
}

export function MenuItem({ item, onPress }: MenuItemProps) {
  return (
    <TouchableCard style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Typography variant="subtitle1" style={styles.name}>
            {item.name}
          </Typography>
          
          <Typography 
            variant="caption" 
            color="gray" 
            numberOfLines={2} 
            style={styles.description}
          >
            {item.description}
          </Typography>
          
          <Typography variant="subtitle2" color="primary" style={styles.price}>
            R{item.price}
          </Typography>
        </View>
        
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
    </TouchableCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Layout.spacing.md,
  },
  content: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    marginRight: Layout.spacing.md,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
  },
  description: {
    marginVertical: Layout.spacing.xs,
  },
  price: {
    fontFamily: 'Poppins-SemiBold',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: Layout.borderRadius.sm,
  },
});