import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/constants/Layout';

interface FoodItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    popular?: boolean;
  };
  onPress: (id: string) => void;
}

export default function FoodItem({ item, onPress }: FoodItemProps) {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity
      style={[styles.container, { borderColor: colors.border, backgroundColor: colors.card }]}
      activeOpacity={0.7}
      onPress={() => onPress(item.id)}
    >
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
          <Text 
            style={[styles.description, { color: colors.inactiveText }]}
            numberOfLines={2}
          >
            {item.description}
          </Text>
          
          <View style={styles.priceRow}>
            <Text style={[styles.price, { color: colors.primary }]}>
              R{item.price.toFixed(2)}
            </Text>
            
            {item.popular && (
              <View style={[styles.popularBadge, { backgroundColor: colors.secondary }]}>
                <Text style={styles.popularText}>Popular</Text>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={() => onPress(item.id)}
          >
            <Plus size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
    marginBottom: Layout.spacing.m,
    padding: Layout.spacing.m,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    marginRight: Layout.spacing.m,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 20,
    marginBottom: Layout.spacing.s,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginRight: Layout.spacing.s,
  },
  popularBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.small,
  },
  popularText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
  },
  imageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: Layout.borderRadius.medium,
  },
  addButton: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});