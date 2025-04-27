import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Star, Clock, MapPin } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/constants/Layout';

interface MerchantCardProps {
  merchant: {
    id: string;
    name: string;
    image: string;
    rating: number;
    estimatedTime: string;
    category: string;
    location: string;
    isOpen: boolean;
  };
  onPress: (id: string) => void;
}

export default function MerchantCard({ merchant, onPress }: MerchantCardProps) {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity
      style={[styles.container, { borderColor: colors.border, backgroundColor: colors.card }]}
      activeOpacity={0.7}
      onPress={() => onPress(merchant.id)}
    >
      <Image source={{ uri: merchant.image }} style={styles.image} />
      
      {!merchant.isOpen && (
        <View style={[styles.closedBadge, { backgroundColor: colors.error }]}>
          <Text style={styles.closedText}>Closed</Text>
        </View>
      )}
      
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]}>{merchant.name}</Text>
        
        <View style={styles.infoRow}>
          <View style={styles.categoryBadge}>
            <Text style={[styles.category, { color: colors.primary }]}>{merchant.category}</Text>
          </View>
          
          <View style={[styles.ratingContainer, { backgroundColor: colors.primary }]}>
            <Star size={12} color="white" fill="white" />
            <Text style={styles.rating}>{merchant.rating.toFixed(1)}</Text>
          </View>
        </View>
        
        <View style={styles.detailsRow}>
          <View style={styles.detail}>
            <Clock size={14} color={colors.inactiveText} />
            <Text style={[styles.detailText, { color: colors.inactiveText }]}>
              {merchant.estimatedTime}
            </Text>
          </View>
          
          <View style={styles.detail}>
            <MapPin size={14} color={colors.inactiveText} />
            <Text style={[styles.detailText, { color: colors.inactiveText }]}>
              {merchant.location}
            </Text>
          </View>
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
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  closedBadge: {
    position: 'absolute',
    top: Layout.spacing.s,
    right: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.small,
  },
  closedText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  content: {
    padding: Layout.spacing.m,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: Layout.spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  categoryBadge: {
    marginRight: Layout.spacing.s,
  },
  category: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.small,
  },
  rating: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 2,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
  },
  detailText: {
    fontSize: 12,
    marginLeft: 4,
    fontFamily: 'Montserrat-Regular',
  },
});