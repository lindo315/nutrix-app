import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { TouchableCard } from '@/components/ui/Card';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { Clock, Star, MapPin } from 'lucide-react-native';

export interface MerchantData {
  id: string;
  name: string;
  image: string;
  cuisineType: string;
  rating: number;
  prepTime: string;
  distance: string;
}

interface MerchantCardProps {
  merchant: MerchantData;
  onPress: () => void;
}

export function MerchantCard({ merchant, onPress }: MerchantCardProps) {
  return (
    <TouchableCard style={styles.card} onPress={onPress}>
      <Image source={{ uri: merchant.image }} style={styles.image} />
      <View style={styles.content}>
        <Typography variant="subtitle1" style={styles.name}>
          {merchant.name}
        </Typography>
        
        <Typography variant="caption" color="gray" style={styles.cuisineType}>
          {merchant.cuisineType}
        </Typography>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Star size={16} color={Colors.warning[500]} />
            <Typography variant="caption" style={styles.detailText}>
              {merchant.rating}
            </Typography>
          </View>
          
          <View style={styles.detailItem}>
            <Clock size={16} color={Colors.gray[500]} />
            <Typography variant="caption" style={styles.detailText}>
              {merchant.prepTime}
            </Typography>
          </View>
          
          <View style={styles.detailItem}>
            <MapPin size={16} color={Colors.primary[500]} />
            <Typography variant="caption" style={styles.detailText}>
              {merchant.distance}
            </Typography>
          </View>
        </View>
      </View>
    </TouchableCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.md,
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: 90,
    height: 90,
    borderTopLeftRadius: Layout.borderRadius.md,
    borderBottomLeftRadius: Layout.borderRadius.md,
  },
  content: {
    flex: 1,
    padding: Layout.spacing.md,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
  },
  cuisineType: {
    marginBottom: Layout.spacing.xs,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Layout.spacing.xs,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  detailText: {
    marginLeft: 4,
  },
});