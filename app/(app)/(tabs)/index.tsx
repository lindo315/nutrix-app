import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import {
  Search,
  MapPin,
  Filter,
  Clock,
  Heart,
  Bell,
} from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/constants/Layout';
import MerchantCard from '@/components/merchants/MerchantCard';
import Card from '@/components/ui/Card';

// Mock data for categories
const categories = [
  { id: 'all', name: 'All' },
  { id: 'cafe', name: 'Cafe' },
  { id: 'fast-food', name: 'Fast Food' },
  { id: 'breakfast', name: 'Breakfast' },
  { id: 'lunch', name: 'Lunch' },
  { id: 'dinner', name: 'Dinner' },
  { id: 'dessert', name: 'Dessert' },
  { id: 'drinks', name: 'Drinks' },
];

// Mock data for merchants
const merchants = [
  {
    id: '1',
    name: `Jimmy's`,
    image: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg',
    rating: 4.5,
    estimatedTime: '15-20 min',
    category: 'Fast Food',
    location: 'East Campus',
    isOpen: true,
  },
  {
    id: '2',
    name: 'Kudu Burger',
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
    rating: 4.2,
    estimatedTime: '20-30 min',
    category: 'Fast Food',
    location: 'West Campus',
    isOpen: true,
  },
  {
    id: '3',
    name: "Oliver's Bakery",
    image: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg',
    rating: 4.7,
    estimatedTime: '10-15 min',
    category: 'Bakery',
    location: 'Main Campus',
    isOpen: true,
  },
  {
    id: '4',
    name: 'Campus Thai',
    image: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg',
    rating: 4.3,
    estimatedTime: '25-35 min',
    category: 'Asian',
    location: 'East Campus',
    isOpen: false,
  },
  {
    id: '5',
    name: 'Braam Pizza',
    image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
    rating: 4.1,
    estimatedTime: '20-30 min',
    category: 'Pizza',
    location: 'West Campus',
    isOpen: true,
  },
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredMerchants = merchants.filter((merchant) => {
    const matchesSearch =
      merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      merchant.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const navigateToMerchant = (id: string) => {
    router.push(`/merchant/${id}`);
  };

  const renderCategoryItem = useCallback(
    ({ item }: { item: (typeof categories)[0] }) => (
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
    ),
    [selectedCategory, colors]
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView stickyHeaderIndices={[1]}>
        <View style={styles.header}>
          {/* <View>
            <Text style={[styles.greeting, { color: colors.text }]}>
              Hey there, 👋
            </Text>
            <Text style={[styles.subtitle, { color: colors.inactiveText }]}>
              Find your favorite campus food
            </Text>
          </View> */}

          <View
            style={[
              styles.locationContainer,
              { backgroundColor: colors.highlightBackground },
            ]}
          >
            <MapPin size={16} color={colors.primary} />
            <Text style={[styles.locationText, { color: colors.text }]}>
              Wits Main Campus
            </Text>
          </View>
          {/* Favourites and Notifications */}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => router.push('/favourites')}
              style={{ marginRight: Layout.spacing.m }}
            >
              <Heart
                size={20}
                color={colors.text}
                style={{ marginRight: Layout.spacing.xs }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/notifications')}>
              <Bell
                size={20}
                color={colors.text}
                style={{ marginRight: Layout.spacing.xs }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={[
            styles.searchContainer,
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
                { color: colors.text, fontFamily: 'Montserrat-Regular' },
              ]}
              placeholder="Search..."
              placeholderTextColor={colors.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {/* Vertical Divider */}
            <View
              style={{
                width: 1,
                height: 24,
                backgroundColor: colors.border,
                marginHorizontal: Layout.spacing.m,
              }}
            />
            <TouchableOpacity
              style={[styles.filterButton, { backgroundColor: colors.primary }]}
            >
              <Filter size={20} color="white" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesList}
            contentContainerStyle={styles.categoriesContent}
          />
        </View>

        <View style={styles.content}>
          {searchQuery && (
            <Text
              style={[styles.searchResults, { color: colors.inactiveText }]}
            >
              {filteredMerchants.length} results found for "{searchQuery}"
            </Text>
          )}

          <View style={styles.featuredSection}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Popular Merchants
              </Text>
              <TouchableOpacity>
                <Text style={[styles.seeAllButton, { color: colors.primary }]}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            {filteredMerchants.map((merchant) => (
              <MerchantCard
                key={merchant.id}
                merchant={merchant}
                onPress={navigateToMerchant}
              />
            ))}
          </View>

          <View style={styles.quickOrderSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Quick Order Again
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Card
                style={styles.quickOrderCard}
                onPress={() => navigateToMerchant('1')}
              >
                <Text style={[styles.quickOrderName, { color: colors.text }]}>
                  Jimmy's
                </Text>
                <View style={styles.quickOrderInfo}>
                  <Clock size={14} color={colors.inactiveText} />
                  <Text
                    style={[
                      styles.quickOrderDetail,
                      { color: colors.inactiveText },
                    ]}
                  >
                    15-20 min
                  </Text>
                </View>
              </Card>

              <Card
                style={styles.quickOrderCard}
                onPress={() => navigateToMerchant('2')}
              >
                <Text style={[styles.quickOrderName, { color: colors.text }]}>
                  Kudu Burger
                </Text>
                <View style={styles.quickOrderInfo}>
                  <Clock size={14} color={colors.inactiveText} />
                  <Text
                    style={[
                      styles.quickOrderDetail,
                      { color: colors.inactiveText },
                    ]}
                  >
                    20-30 min
                  </Text>
                </View>
              </Card>

              <Card
                style={styles.quickOrderCard}
                onPress={() => navigateToMerchant('3')}
              >
                <Text style={[styles.quickOrderName, { color: colors.text }]}>
                  Oliver\'s Bakery
                </Text>
                <View style={styles.quickOrderInfo}>
                  <Clock size={14} color={colors.inactiveText} />
                  <Text
                    style={[
                      styles.quickOrderDetail,
                      { color: colors.inactiveText },
                    ]}
                  >
                    10-15 min
                  </Text>
                </View>
              </Card>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Layout.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.xl,
    paddingTop: Layout.spacing.xl,
    paddingBottom: Layout.spacing.m,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.s,
    borderRadius: Layout.borderRadius.medium,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  searchContainer: {
    paddingHorizontal: Layout.spacing.xl,
    paddingBottom: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: Layout.borderRadius.medium,
    paddingHorizontal: Layout.spacing.m,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: Layout.spacing.s,
    fontSize: 16,
  },
  filterButton: {
    padding: Layout.spacing.s,
    borderRadius: Layout.borderRadius.small,
  },
  categoriesList: {
    marginTop: Layout.spacing.m,
  },
  categoriesContent: {
    paddingRight: Layout.spacing.m,
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
  content: {
    padding: Layout.spacing.xl,
  },
  searchResults: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    marginBottom: Layout.spacing.m,
  },
  featuredSection: {
    marginBottom: Layout.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  seeAllButton: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  quickOrderSection: {
    marginBottom: Layout.spacing.xl,
  },
  quickOrderCard: {
    width: 150,
    marginRight: Layout.spacing.m,
  },
  quickOrderName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: Layout.spacing.s,
  },
  quickOrderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickOrderDetail: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 4,
  },
});
