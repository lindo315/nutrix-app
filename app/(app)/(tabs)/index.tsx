import React, { useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  RefreshControl,
  Animated,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import {
  Search,
  MapPin,
  Filter,
  Clock,
  Heart,
  Bell,
  Star,
  Coffee,
  Pizza,
  Utensils,
  Sandwich,
  Salad,
  Wine,
  ChevronRight,
  ChevronDown,
} from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/constants/Layout';
import MerchantCard from '@/components/merchants/MerchantCard';
import Card from '@/components/ui/Card';

const { width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

// Mock data for categories with icons
const categories = [
  { id: 'all', name: 'All', icon: Utensils },
  { id: 'cafe', name: 'Cafe', icon: Coffee },
  { id: 'fast-food', name: 'Fast Food', icon: Pizza },
  { id: 'breakfast', name: 'Breakfast', icon: Coffee },
  { id: 'lunch', name: 'Lunch', icon: Sandwich },
  { id: 'dinner', name: 'Dinner', icon: Utensils },
  { id: 'salad', name: 'Healthy', icon: Salad },
  { id: 'drinks', name: 'Drinks', icon: Wine },
];

// Mock promotional banners
const promotions = [
  {
    id: '1',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    title: 'Student Special',
    description: '20% off on all orders above R100',
  },
  {
    id: '2',
    image: 'https://images.pexels.com/photos/750075/pexels-photo-750075.jpeg',
    title: 'Free Delivery',
    description: 'On your first order with code FRESHMAN',
  },
  {
    id: '3',
    image: 'https://images.pexels.com/photos/2228486/pexels-photo-2228486.jpeg',
    title: 'Breakfast Bundle',
    description: 'Get a coffee and sandwich for only R45',
  },
];

// Today's specials
const specialOffers = [
  {
    id: '1',
    name: 'Breakfast Bundle',
    merchant: "Jimmy's",
    originalPrice: 75.0,
    discountedPrice: 55.0,
    image: 'https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg',
  },
  {
    id: '2',
    name: 'Pizza & Drink Combo',
    merchant: 'Braam Pizza',
    originalPrice: 95.0,
    discountedPrice: 75.0,
    image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
  },
  {
    id: '3',
    name: 'Coffee & Pastry',
    merchant: "Oliver's Bakery",
    originalPrice: 45.0,
    discountedPrice: 35.0,
    image: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg',
  },
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

// Near you merchants
const nearYouMerchants = [
  {
    id: '6',
    name: 'Science Cafe',
    image: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg',
    rating: 4.3,
    estimatedTime: '5-10 min',
    category: 'Cafe',
    location: 'Science Campus',
    isOpen: true,
    distance: '0.3 km',
  },
  {
    id: '7',
    name: 'Law School Deli',
    image: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg',
    rating: 4.4,
    estimatedTime: '5-15 min',
    category: 'Deli',
    location: 'West Campus',
    isOpen: true,
    distance: '0.5 km',
  },
  {
    id: '8',
    name: 'Engineering Eats',
    image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg',
    rating: 4.1,
    estimatedTime: '10-15 min',
    category: 'Fast Food',
    location: 'Engineering Campus',
    isOpen: true,
    distance: '0.7 km',
  },
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Header animations
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const headerBackgroundOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  const locationContainerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const renderCategoryItem = useCallback(
    ({ item }: { item: (typeof categories)[0] }) => {
      const IconComponent = item.icon;
      return (
        <TouchableOpacity
          style={[
            styles.categoryItem,
            selectedCategory === item.id && { backgroundColor: colors.primary },
          ]}
          onPress={() => setSelectedCategory(item.id)}
        >
          <IconComponent
            size={20}
            color={selectedCategory === item.id ? 'white' : colors.primary}
          />
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
    },
    [selectedCategory, colors]
  );

  const renderPromotionItem = ({
    item,
    index,
  }: {
    item: (typeof promotions)[0];
    index: number;
  }) => (
    <TouchableOpacity
      style={styles.promotionItem}
      activeOpacity={0.9}
      onPress={() => {}}
    >
      <Image source={{ uri: item.image }} style={styles.promotionImage} />
      <View style={styles.promotionOverlay}>
        <View style={styles.promotionContent}>
          <Text style={styles.promotionTitle}>{item.title}</Text>
          <Text style={styles.promotionDescription}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSpecialItem = ({ item }: { item: (typeof specialOffers)[0] }) => (
    <TouchableOpacity
      style={[
        styles.specialCard,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      onPress={() => {}}
    >
      <Image source={{ uri: item.image }} style={styles.specialImage} />
      <View style={styles.specialContent}>
        <Text
          style={[styles.specialName, { color: colors.text }]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text style={[styles.specialMerchant, { color: colors.inactiveText }]}>
          {item.merchant}
        </Text>
        <View style={styles.specialPriceRow}>
          <Text
            style={[styles.specialDiscountedPrice, { color: colors.primary }]}
          >
            R{item.discountedPrice.toFixed(2)}
          </Text>
          <Text style={styles.specialOriginalPrice}>
            R{item.originalPrice.toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderNearYouItem = ({
    item,
  }: {
    item: (typeof nearYouMerchants)[0];
  }) => (
    <TouchableOpacity
      style={[
        styles.nearYouCard,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      onPress={() => navigateToMerchant(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.nearYouImage} />
      <View style={styles.nearYouContent}>
        <Text style={[styles.nearYouName, { color: colors.text }]}>
          {item.name}
        </Text>
        <View style={styles.nearYouDetailsRow}>
          <View style={styles.nearYouRating}>
            <Star size={14} color={colors.primary} fill={colors.primary} />
            <Text style={[styles.nearYouRatingText, { color: colors.text }]}>
              {item.rating.toFixed(1)}
            </Text>
          </View>
          <Text
            style={[styles.nearYouCategory, { color: colors.inactiveText }]}
          >
            • {item.category}
          </Text>
        </View>
        <View style={styles.nearYouBottomRow}>
          <View style={styles.nearYouTimeDistance}>
            <Clock size={12} color={colors.inactiveText} />
            <Text
              style={[styles.nearYouDetailText, { color: colors.inactiveText }]}
            >
              {item.estimatedTime}
            </Text>
          </View>
          <View style={styles.nearYouTimeDistance}>
            <MapPin size={12} color={colors.inactiveText} />
            <Text
              style={[styles.nearYouDetailText, { color: colors.inactiveText }]}
            >
              {item.distance}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Fixed Header Background */}
      <Animated.View
        style={[
          styles.headerBackgroundContainer,
          {
            backgroundColor: colors.background,
            height: HEADER_MAX_HEIGHT,
            opacity: headerBackgroundOpacity,
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
          },
        ]}
      />

      {/* Header Content */}
      <Animated.View
        style={[
          styles.headerContainer,
          {
            height: HEADER_MAX_HEIGHT,
            transform: [{ translateY: headerTranslate }],
          },
        ]}
      >
        {/* Top Row - Location and Icons */}
        <View style={styles.headerTopRow}>
          <TouchableOpacity style={styles.locationButton} onPress={() => {}}>
            <MapPin size={16} color={colors.primary} />
            <Text style={[styles.locationText, { color: colors.text }]}>
              Wits Main Campus
            </Text>
            <ChevronDown size={16} color={colors.primary} />
          </TouchableOpacity>

          <View style={styles.headerIcons}>
            <TouchableOpacity
              onPress={() => router.push('/favourites')}
              style={styles.iconButton}
            >
              <Heart size={22} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/notifications')}
              style={styles.iconButton}
            >
              <Bell size={22} color={colors.text} />
              <View
                style={[
                  styles.notificationBadge,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text style={styles.notificationBadgeText}>2</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
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
              placeholder="Search.."
              placeholderTextColor={colors.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity
              style={[styles.filterButton, { backgroundColor: colors.primary }]}
            >
              <Filter size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } // Change this to false
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
            progressViewOffset={HEADER_MAX_HEIGHT}
          />
        }
      >
        {/* Categories List */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
          />
        </View>

        {/* Promotional Carousel */}
        <View style={styles.promotionContainer}>
          <FlatList
            data={promotions}
            renderItem={renderPromotionItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToInterval={width - 40}
            decelerationRate="fast"
            contentContainerStyle={styles.promotionList}
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

          {/* Today's Specials Section */}
          <View style={styles.specialsSection}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Today's Specials
              </Text>
              <TouchableOpacity>
                <Text style={[styles.seeAllButton, { color: colors.primary }]}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={specialOffers}
              renderItem={renderSpecialItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.specialsList}
            />
          </View>

          {/* Popular Merchants Section */}
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

          {/* Near You Section */}
          <View style={styles.nearYouSection}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Near You
              </Text>
              <TouchableOpacity>
                <Text style={[styles.seeAllButton, { color: colors.primary }]}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={nearYouMerchants}
              renderItem={renderNearYouItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.nearYouList}
            />
          </View>

          {/* Quick Order Again Section */}
          <View style={styles.quickOrderSection}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Quick Order Again
              </Text>
              <TouchableOpacity>
                <Text style={[styles.seeAllButton, { color: colors.primary }]}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Card
                style={styles.quickOrderCard}
                onPress={() => navigateToMerchant('1')}
              >
                <Image
                  source={{
                    uri: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg',
                  }}
                  style={styles.quickOrderImage}
                />
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
                <Image
                  source={{
                    uri: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
                  }}
                  style={styles.quickOrderImage}
                />
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
                <Image
                  source={{
                    uri: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg',
                  }}
                  style={styles.quickOrderImage}
                />
                <Text style={[styles.quickOrderName, { color: colors.text }]}>
                  Oliver's Bakery
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
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    paddingTop: HEADER_MAX_HEIGHT,
  },
  headerBackgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    paddingHorizontal: Layout.spacing.m,
    paddingTop: Layout.spacing.s,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: Layout.spacing.s,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.xs,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginHorizontal: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: Layout.spacing.m,
    position: 'relative',
    padding: Layout.spacing.xs,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Montserrat-SemiBold',
  },
  searchContainer: {
    marginTop: Layout.spacing.xs,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: Layout.borderRadius.medium,
    paddingHorizontal: Layout.spacing.m,
    height: 46,
  },
  searchInput: {
    flex: 1,
    marginLeft: Layout.spacing.s,
    fontSize: 16,
  },
  filterButton: {
    padding: Layout.spacing.s,
    borderRadius: Layout.borderRadius.small,
    marginLeft: Layout.spacing.s,
  },
  categoriesContainer: {
    paddingVertical: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoriesContent: {
    paddingHorizontal: Layout.spacing.xl,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    borderRadius: Layout.borderRadius.medium,
    marginRight: Layout.spacing.s,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 6,
  },
  promotionContainer: {
    marginBottom: Layout.spacing.l,
    marginTop: Layout.spacing.m,
  },
  promotionList: {
    paddingHorizontal: Layout.spacing.xl,
  },
  promotionItem: {
    width: width - 40,
    height: 160,
    borderRadius: Layout.borderRadius.large,
    overflow: 'hidden',
    marginRight: Layout.spacing.m,
  },
  promotionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  promotionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  promotionContent: {
    padding: Layout.spacing.l,
  },
  promotionTitle: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  promotionDescription: {
    color: 'white',
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
  specialsSection: {
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
  specialsList: {
    paddingRight: Layout.spacing.m,
  },
  specialCard: {
    width: 160,
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
    overflow: 'hidden',
    marginRight: Layout.spacing.m,
  },
  specialImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  specialContent: {
    padding: Layout.spacing.m,
  },
  specialName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: 2,
  },
  specialMerchant: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginBottom: Layout.spacing.xs,
  },
  specialPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specialDiscountedPrice: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginRight: Layout.spacing.xs,
  },
  specialOriginalPrice: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  featuredSection: {
    marginBottom: Layout.spacing.xl,
  },
  nearYouSection: {
    marginBottom: Layout.spacing.xl,
  },
  nearYouList: {
    paddingRight: Layout.spacing.m,
  },
  nearYouCard: {
    width: 240,
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
    overflow: 'hidden',
    marginRight: Layout.spacing.m,
  },
  nearYouImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  nearYouContent: {
    padding: Layout.spacing.m,
  },
  nearYouName: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 4,
  },
  nearYouDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  nearYouRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
  },
  nearYouRatingText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 4,
  },
  nearYouCategory: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  nearYouBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nearYouTimeDistance: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
  },
  nearYouDetailText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 4,
  },
  quickOrderSection: {
    marginBottom: Layout.spacing.xl,
  },
  quickOrderCard: {
    width: 150,
    marginRight: Layout.spacing.m,
  },
  quickOrderImage: {
    width: '100%',
    height: 80,
    borderRadius: Layout.borderRadius.small,
    marginBottom: Layout.spacing.xs,
  },
  quickOrderName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: Layout.spacing.xs,
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
