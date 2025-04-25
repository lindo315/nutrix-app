import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { Bell, Search } from 'lucide-react-native';
import { MerchantCard, MerchantData } from '@/components/merchant/MerchantCard';
import { FeaturedMerchantCard } from '@/components/merchant/FeaturedMerchantCard';
import { CategoryButton } from '@/components/merchant/CategoryButton';
import { useRouter } from 'expo-router';

// Mock data for categories
const categories = [
  {
    id: '1',
    title: 'Fast Food',
    icon: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    title: 'Coffee',
    icon: 'https://images.pexels.com/photos/982612/pexels-photo-982612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    title: 'Healthy',
    icon: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    title: 'Desserts',
    icon: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '5',
    title: 'Breakfast',
    icon: 'https://images.pexels.com/photos/103124/pexels-photo-103124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// Mock data for featured merchants
const featuredMerchants: MerchantData[] = [
  {
    id: '1',
    name: 'Burger Joint',
    image:
      'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cuisineType: 'Fast Food',
    rating: 4.5,
    prepTime: '15-20 min',
    distance: '0.3 km',
  },
  {
    id: '2',
    name: 'Pizza Palace',
    image:
      'https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cuisineType: 'Italian',
    rating: 4.2,
    prepTime: '20-30 min',
    distance: '0.5 km',
  },
  {
    id: '3',
    name: 'Sushi Express',
    image:
      'https://images.pexels.com/photos/684965/pexels-photo-684965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cuisineType: 'Japanese',
    rating: 4.8,
    prepTime: '15-25 min',
    distance: '0.7 km',
  },
];

// Mock data for nearby merchants
const nearbyMerchants: MerchantData[] = [
  {
    id: '4',
    name: 'Coffee Brew',
    image:
      'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cuisineType: 'Cafe',
    rating: 4.3,
    prepTime: '5-10 min',
    distance: '0.2 km',
  },
  {
    id: '5',
    name: 'Salad Bowl',
    image:
      'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cuisineType: 'Healthy',
    rating: 4.1,
    prepTime: '10-15 min',
    distance: '0.4 km',
  },
  {
    id: '6',
    name: 'Taco Shack',
    image:
      'https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cuisineType: 'Mexican',
    rating: 4.6,
    prepTime: '15-20 min',
    distance: '0.6 km',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');

  const handleMerchantPress = (merchantId: string) => {
    // Navigate to merchant detail screen
    router.push(`/merchant/${merchantId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View>
            <Typography variant="body2" color="gray">
              Deliver to
            </Typography>
            <View style={styles.locationContainer}>
              <Typography variant="subtitle1" style={styles.location}>
                Wits University, Johannesburg
              </Typography>
            </View>
          </View>

          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color={Colors.gray[700]} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Search
            size={20}
            color={Colors.gray[500]}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search merchants or items"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.gray[400]}
          />
        </View>

        <View style={styles.categoriesContainer}>
          <Typography variant="subtitle1" style={styles.sectionTitle}>
            Categories
          </Typography>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollContent}
          >
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                title={category.title}
                icon={category.icon}
                isActive={activeCategory === category.id}
                onPress={() => setActiveCategory(category.id)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.featuredContainer}>
          <Typography variant="subtitle1" style={styles.sectionTitle}>
            Featured Merchants
          </Typography>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredScrollContent}
          >
            {featuredMerchants.map((merchant) => (
              <FeaturedMerchantCard
                key={merchant.id}
                merchant={merchant}
                onPress={() => handleMerchantPress(merchant.id)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.nearbyContainer}>
          <Typography variant="subtitle1" style={styles.sectionTitle}>
            Nearby Merchants
          </Typography>

          {nearbyMerchants.map((merchant) => (
            <MerchantCard
              key={merchant.id}
              merchant={merchant}
              onPress={() => handleMerchantPress(merchant.id)}
            />
          ))}
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
  scrollContent: {
    padding: Layout.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'Poppins-SemiBold',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.xl,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: Layout.spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: Layout.spacing.md,
    color: Colors.gray[900],
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    marginBottom: Layout.spacing.md,
    fontFamily: 'Poppins-SemiBold',
  },
  categoriesScrollContent: {
    paddingVertical: Layout.spacing.xs,
  },
  featuredContainer: {
    marginBottom: Layout.spacing.xl,
  },
  featuredScrollContent: {
    paddingVertical: Layout.spacing.xs,
  },
  nearbyContainer: {
    marginBottom: Layout.spacing.xxl,
  },
});
