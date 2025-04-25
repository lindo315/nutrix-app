import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  ImageBackground,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { MenuItem, MenuItemData } from '@/components/menu/MenuItem';
import { 
  Star, 
  Clock, 
  MapPin,
  ArrowLeft,
  Share2
} from 'lucide-react-native';

// Mock data for menu items
const menuItems: MenuItemData[] = [
  {
    id: '1',
    name: 'Classic Burger',
    description: 'Beef patty, lettuce, tomato, cheese, and our special sauce',
    price: '45.00',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg'
  },
  {
    id: '2',
    name: 'Chicken Burger',
    description: 'Grilled chicken breast with avocado and honey mustard',
    price: '42.00',
    image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg'
  },
  {
    id: '3',
    name: 'Veggie Burger',
    description: 'Plant-based patty with fresh vegetables and vegan mayo',
    price: '38.00',
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'
  },
  {
    id: '4',
    name: 'French Fries',
    description: 'Crispy golden fries with our signature seasoning',
    price: '25.00',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg'
  },
  {
    id: '5',
    name: 'Milkshake',
    description: 'Creamy vanilla milkshake with whipped cream',
    price: '30.00',
    image: 'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg'
  }
];

export default function MerchantScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Mock merchant data
  const merchant = {
    name: 'Burger Joint',
    image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg',
    rating: 4.5,
    totalRatings: 128,
    prepTime: '15-20 min',
    distance: '0.3 km',
    description: 'Serving the best burgers on campus since 2020. All our ingredients are locally sourced and our beef is 100% grass-fed.',
    categories: ['All', 'Burgers', 'Sides', 'Drinks']
  };
  
  const handleMenuItemPress = (itemId: string) => {
    router.push(`/menu-item/${itemId}`);
  };
  
  const handleShare = () => {
    // Implement share functionality
    if (Platform.OS === 'web') {
      // Web sharing
      if (navigator.share) {
        navigator.share({
          title: merchant.name,
          text: merchant.description,
          url: window.location.href,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{ uri: merchant.image }}
          style={styles.headerImage}
        >
          <View style={styles.overlay} />
          <View style={styles.headerContent}>
            <View style={styles.headerActions}>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => router.back()}
              >
                <ArrowLeft size={24} color={Colors.white} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={handleShare}
              >
                <Share2 size={24} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        
        <View style={styles.content}>
          <View style={styles.merchantInfo}>
            <Typography variant="h3" style={styles.merchantName}>
              {merchant.name}
            </Typography>
            
            <View style={styles.ratingContainer}>
              <Star size={20} color={Colors.warning[500]} />
              <Typography variant="subtitle2" style={styles.rating}>
                {merchant.rating}
              </Typography>
              <Typography variant="body2" color="gray">
                ({merchant.totalRatings} ratings)
              </Typography>
            </View>
            
            <View style={styles.detailsContainer}>
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
            
            <Typography variant="body2" color="gray" style={styles.description}>
              {merchant.description}
            </Typography>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
          >
            {merchant.categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Typography 
                  variant="subtitle2"
                  color={selectedCategory === category ? 'primary' : 'gray'}
                >
                  {category}
                </Typography>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <View style={styles.menuContainer}>
            <Typography variant="subtitle1" style={styles.menuTitle}>
              Menu
            </Typography>
            
            {menuItems.map(item => (
              <MenuItem
                key={item.id}
                item={item}
                onPress={() => handleMenuItemPress(item.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerImage: {
    height: 200,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerContent: {
    flex: 1,
    padding: Layout.spacing.lg,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.background,
    padding: Layout.spacing.lg,
  },
  merchantInfo: {
    marginBottom: Layout.spacing.xl,
  },
  merchantName: {
    marginBottom: Layout.spacing.sm,
    fontFamily: 'Poppins-Bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  rating: {
    marginLeft: Layout.spacing.xs,
    marginRight: Layout.spacing.sm,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.lg,
  },
  detailText: {
    marginLeft: Layout.spacing.xs,
  },
  description: {
    lineHeight: 20,
  },
  categoriesContainer: {
    marginBottom: Layout.spacing.xl,
  },
  categoryButton: {
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: Colors.white,
    marginRight: Layout.spacing.sm,
  },
  selectedCategory: {
    backgroundColor: Colors.primary[50],
  },
  menuContainer: {
    flex: 1,
  },
  menuTitle: {
    marginBottom: Layout.spacing.lg,
    fontFamily: 'Poppins-SemiBold',
  },
});