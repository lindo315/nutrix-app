import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  TextInput,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import {
  Star,
  Clock,
  MapPin,
  Search,
  ShoppingBag,
  ChevronLeft,
} from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/constants/Layout';
import FoodItem from '@/components/food/FoodItem';

// Mock data
const merchantData = {
  '1': {
    id: '1',
    name: `Jimmy's`,
    image: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg',
    rating: 4.5,
    ratingCount: 128,
    estimatedTime: '15-20 min',
    category: 'Fast Food',
    location: 'East Campus',
    isOpen: true,
    description:
      'A popular campus spot serving delicious meals, coffee, and snacks.',
  },
  '2': {
    id: '2',
    name: 'Kudu Burger',
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
    rating: 4.2,
    ratingCount: 96,
    estimatedTime: '20-30 min',
    category: 'Fast Food',
    location: 'West Campus',
    isOpen: true,
    description:
      'Home of the famous Kudu Burger and other South African inspired fast food.',
  },
  '3': {
    id: '3',
    name: "Oliver's Bakery",
    image: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg',
    rating: 4.7,
    ratingCount: 73,
    estimatedTime: '10-15 min',
    category: 'Bakery',
    location: 'Main Campus',
    isOpen: true,
    description:
      'Fresh baked goods, pastries, and gourmet sandwiches made daily.',
  },
};

// Mock menu categories and items
const menuCategories = [
  { id: 'popular', name: 'Popular' },
  { id: 'breakfast', name: 'Breakfast' },
  { id: 'lunch', name: 'Lunch' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'desserts', name: 'Desserts' },
];

const menuItems = {
  '1': [
    {
      id: 'item1',
      name: 'Breakfast Wrap',
      description:
        'Scrambled eggs, bacon, cheese, and avocado in a tortilla wrap',
      price: 45.0,
      image:
        'https://images.pexels.com/photos/12662875/pexels-photo-12662875.jpeg',
      category: 'breakfast',
      popular: true,
    },
    {
      id: 'item2',
      name: 'Chicken Avocado Sandwich',
      description: 'Grilled chicken, avocado, lettuce, and mayo on ciabatta',
      price: 55.0,
      image:
        'https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg',
      category: 'lunch',
      popular: true,
    },
    {
      id: 'item3',
      name: 'Cappuccino',
      description: 'Rich espresso with steamed milk and foam',
      price: 30.0,
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
      category: 'drinks',
      popular: true,
    },
    {
      id: 'item4',
      name: 'Greek Salad',
      description: 'Fresh mixed greens, feta, olives, tomatoes, and cucumber',
      price: 50.0,
      image:
        'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg',
      category: 'lunch',
    },
    {
      id: 'item5',
      name: 'Chocolate Muffin',
      description: 'Moist chocolate muffin with chocolate chips',
      price: 25.0,
      image:
        'https://images.pexels.com/photos/4686958/pexels-photo-4686958.jpeg',
      category: 'desserts',
    },
  ],
  '2': [
    {
      id: 'item1',
      name: 'Kudu Burger',
      description: 'Juicy beef patty with lettuce, tomato, and special sauce',
      price: 70.0,
      image:
        'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
      category: 'popular',
      popular: true,
    },
    {
      id: 'item2',
      name: 'Sweet Potato Fries',
      description: 'Crispy sweet potato fries with garlic aioli',
      price: 35.0,
      image:
        'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
      category: 'lunch',
    },
  ],
  '3': [
    {
      id: 'item1',
      name: 'Croissant',
      description: 'Flaky and buttery croissant, perfect with coffee',
      price: 20.0,
      image:
        'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
      category: 'breakfast',
      popular: true,
    },
    {
      id: 'item2',
      name: 'Chocolate Cake',
      description: 'Rich chocolate cake with chocolate ganache',
      price: 60.0,
      image:
        'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
      category: 'desserts',
      popular: true,
    },
    {
      id: 'item3',
      name: 'Fruit Tart',
      description: 'Fresh fruit tart with pastry cream and a buttery crust',
      price: 50.0,
      image:
        'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
      category: 'desserts',
    },
    {
      id: 'item4',
      name: 'Iced Coffee',
      description: 'Chilled coffee with milk and ice, perfect for hot days',
      price: 30.0,
      image:
        'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
      category: 'drinks',
    },
  ],
};

export default function MerchantScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');

  // Get merchant data
  const merchant = merchantData[id as keyof typeof merchantData];
  const items = menuItems[id as keyof typeof menuItems] || [];

  if (!merchant) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Merchant not found</Text>
      </View>
    );
  }

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === 'popular'
        ? item.popular
        : item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const navigateToFoodDetails = (itemId: string) => {
    router.push(`/food/${itemId}`);
  };

  const renderCategoryItem = ({
    item,
  }: {
    item: (typeof menuCategories)[0];
  }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && { backgroundColor: colors.primary },
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text
        style={[
          styles.categoryText,
          { color: selectedCategory === item.id ? 'white' : colors.text },
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView stickyHeaderIndices={[1]}>
        <ImageBackground source={{ uri: merchant.image }} style={styles.header}>
          <View style={styles.overlay}>
            <TouchableOpacity
              style={[
                styles.backButton,
                { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
              ]}
              onPress={() => router.back()}
            >
              <ChevronLeft size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.headerContent}>
              <Text style={styles.merchantName}>{merchant.name}</Text>

              <View style={styles.detailsRow}>
                <View style={styles.ratingContainer}>
                  <Star size={16} color="white" fill="white" />
                  <Text style={styles.rating}>
                    {merchant.rating.toFixed(1)}
                  </Text>
                  <Text style={styles.ratingCount}>
                    ({merchant.ratingCount})
                  </Text>
                </View>

                <View style={styles.dot} />

                <View style={styles.detail}>
                  <Clock size={16} color="white" />
                  <Text style={styles.detailText}>
                    {merchant.estimatedTime}
                  </Text>
                </View>

                <View style={styles.dot} />

                <View style={styles.detail}>
                  <MapPin size={16} color="white" />
                  <Text style={styles.detailText}>{merchant.location}</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* Search Bar and Cart Button */}
        <View
          style={[
            styles.searchBarContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <View
            style={[
              styles.searchInputContainer,
              {
                backgroundColor: colors.highlightBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <Search size={20} color={colors.inactiveText} />
            <TextInput
              style={[
                styles.searchInput,
                {
                  color: colors.text,
                  fontFamily: 'Montserrat-Regular',
                },
              ]}
              placeholder="Search..."
              placeholderTextColor={colors.inactiveText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {/* Vertical Divider */}
            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />
            <TouchableOpacity
              style={[styles.cartButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/cart')}
            >
              <ShoppingBag size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            styles.categoriesContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <FlatList
            data={menuCategories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
          />
        </View>
        <View style={styles.content}>
          <Text style={[styles.categoryTitle, { color: colors.text }]}>
            {menuCategories.find((c) => c.id === selectedCategory)?.name}
          </Text>

          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <FoodItem
                key={item.id}
                item={item}
                onPress={navigateToFoodDetails}
              />
            ))
          ) : (
            <Text style={[styles.emptyText, { color: colors.inactiveText }]}>
              No items found in this category
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    justifyContent: 'space-between',
    padding: Layout.spacing.m,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    padding: Layout.spacing.m,
  },
  merchantName: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginBottom: Layout.spacing.s,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.s,
  },
  rating: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 4,
  },
  ratingCount: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 2,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'white',
    marginHorizontal: Layout.spacing.s,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.s,
  },
  detailText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.m,
    paddingHorizontal: Layout.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoriesContent: {
    flex: 1,
  },
  categoryItem: {
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    borderRadius: Layout.borderRadius.medium,
    marginRight: Layout.spacing.s,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Layout.spacing.xs,
  },
  content: {
    padding: Layout.spacing.xl,
  },
  categoryTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: Layout.spacing.m,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    marginTop: Layout.spacing.xl,
  },

  searchBarContainer: {
    padding: Layout.spacing.l,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingLeft: Layout.spacing.m,
    height: 48,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    marginLeft: Layout.spacing.s,
    fontSize: 16,
  },
  divider: {
    width: 1,
    height: 24,
    marginHorizontal: Layout.spacing.m,
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.xs,
  },
});
