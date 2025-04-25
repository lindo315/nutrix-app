import React from 'react';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { TouchableCard } from '@/components/ui/Card';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { Star } from 'lucide-react-native';
import { MerchantData } from './MerchantCard';

interface FeaturedMerchantCardProps {
  merchant: MerchantData;
  onPress: () => void;
}

export function FeaturedMerchantCard({ merchant, onPress }: FeaturedMerchantCardProps) {
  return (
    <TouchableCard style={styles.card} onPress={onPress}>
      <ImageBackground
        source={{ uri: merchant.image }}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay} />
        <View style={styles.content}>
          <View style={styles.ratingContainer}>
            <Star size={16} color={Colors.warning[500]} />
            <Typography variant="caption" color="white" style={styles.rating}>
              {merchant.rating}
            </Typography>
          </View>
          
          <View>
            <Typography variant="subtitle1" color="white" style={styles.name}>
              {merchant.name}
            </Typography>
            <Typography variant="caption" color="white" style={styles.cuisineType}>
              {merchant.cuisineType}
            </Typography>
          </View>
        </View>
      </ImageBackground>
    </TouchableCard>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 250,
    height: 150,
    marginRight: Layout.spacing.md,
    padding: 0,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    borderRadius: Layout.borderRadius.md,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: Layout.borderRadius.md,
  },
  content: {
    flex: 1,
    padding: Layout.spacing.md,
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignSelf: 'flex-start',
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.full,
  },
  rating: {
    marginLeft: 4,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cuisineType: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});