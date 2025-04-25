import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { Search, Filter, ChevronDown } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { MerchantCard, MerchantData } from '@/components/merchant/MerchantCard';
import { useRouter } from 'expo-router';

// Mock data for merchants
const allMerchants: MerchantData[] = [
  {
    id: '1',
    name: 'Burger Joint',
    image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cuisineType: 'Fast Food',
    rating: 4.5,
    prepTime: '15-20 min',
    distance: '0.3 km',
  },
  {
    id: '2',
    name: 'Pizza Palace',
    image: 'https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cuisineType: 'Italian',
    rating: 4.2,
    prepTime: '20-30 min',
    distance: '0.5 km',
  },
  {
    id: '3',
    name: 'Sushi Express',
    image: 'https://images.pexels.com/photos/684965/pexels-photo-684965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cuisineType: 'Japanese',
    rating: 4.8,
    prepTime: '15-25 min',
    distance: '0.7 km',
  },
  {
    id: '4',
    name: 'Coffee Brew',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cuisineType: 'Cafe',
    rating: 4.3,
    prepTime: '5-10 min',
    distance: '0.2 km',
  },
  {
    id: '5',
    name: 'Salad Bowl',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cuisineType: 'Healthy',
    rating: 4.1,
    prepTime: '10-15 min',
    distance: '0.4 km',
  },
  {
    id: '6',
    name: 'Taco Shack',
    image: 'https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cuisineType: 'Mexican',
    rating: 4.6,
    prepTime: '15-20 min',
    distance: '0.6 km',
  },
  {
    id: '7',
    name: 'Wok & Roll',
    image: 'https://images.pexels.com/photos/5409023/pexels-photo-5409023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cuisineType: 'Asian',
    rating: 4.4,
    prepTime: '15-20 min',
    distance: '0.8 km',
  },
  {
    id: '8',
    name: 'Sandwich Stop',
    image: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cuisineType: 'Sandwiches',
    rating: 4.0,
    prepTime: '10-15 min',
    distance: '0.3 km',
  },
];

// Filter options
const cuisineTypes = ['All', 'Fast Food', 'Italian', 'Japanese', 'Cafe', 'Healthy', 'Mexican', 'Asian', 'Sandwiches'];
const priceRanges = ['All', '₹', '₹₹', '₹₹₹'];
const ratings = ['All', '4.5+', '4.0+', '3.5+', '3.0+'];
const prepTimes = ['All', 'Under 10 min', 'Under 20 min', 'Under 30 min'];

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [selectedPrepTime, setSelectedPrepTime] = useState('All');
  
  // Filter merchants based on search query and filters
  const filteredMerchants = allMerchants.filter(merchant => {
    // Search query filter
    if (searchQuery && !merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !merchant.cuisineType.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Cuisine type filter
    if (selectedCuisine !== 'All' && merchant.cuisineType !== selectedCuisine) {
      return false;
    }
    
    // Rating filter
    if (selectedRating !== 'All') {
      const minRating = parseFloat(selectedRating.replace('+', ''));
      if (merchant.rating < minRating) {
        return false;
      }
    }
    
    // Prep time filter (simplified for demo)
    if (selectedPrepTime !== 'All') {
      const maxMinutes = selectedPrepTime === 'Under 10 min' ? 10 : 
                         selectedPrepTime === 'Under 20 min' ? 20 : 30;
      const merchantMaxMinutes = parseInt(merchant.prepTime.split('-')[1]);
      if (merchantMaxMinutes > maxMinutes) {
        return false;
      }
    }
    
    return true;
  });
  
  const handleMerchantPress = (merchantId: string) => {
    // Navigate to merchant detail screen
    router.push(`/merchant/${merchantId}`);
  };

  const renderFilterButton = (title: string, options: string[], selectedOption: string, setSelectedOption: (option: string) => void) => (
    <View style={styles.filterSection}>
      <Typography variant="subtitle2" style={styles.filterTitle}>
        {title}
      </Typography>
      <View style={styles.filterOptions}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.filterOption,
              selectedOption === option && styles.filterOptionSelected,
            ]}
            onPress={() => setSelectedOption(option)}
          >
            <Typography 
              variant="caption" 
              color={selectedOption === option ? 'primary' : 'gray'}
            >
              {option}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h3" style={styles.headerTitle}>
          Explore
        </Typography>
      </View>
      
      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.gray[500]} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for merchants or items"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={Colors.gray[400]}
        />
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color={Colors.primary[700]} />
        </TouchableOpacity>
      </View>
      
      {showFilters && (
        <Card style={styles.filtersCard}>
          <ScrollView style={styles.filtersScrollView}>
            {renderFilterButton('Cuisine Type', cuisineTypes, selectedCuisine, setSelectedCuisine)}
            {renderFilterButton('Price Range', priceRanges, selectedPrice, setSelectedPrice)}
            {renderFilterButton('Rating', ratings, selectedRating, setSelectedRating)}
            {renderFilterButton('Preparation Time', prepTimes, selectedPrepTime, setSelectedPrepTime)}
          </ScrollView>
        </Card>
      )}
      
      <View style={styles.resultsContainer}>
        <View style={styles.resultsHeader}>
          <Typography variant="subtitle2" color="gray">
            {filteredMerchants.length} Results
          </Typography>
          
          <TouchableOpacity style={styles.sortButton}>
            <Typography variant="subtitle2" color="primary">
              Sort by
            </Typography>
            <ChevronDown size={16} color={Colors.primary[700]} />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={filteredMerchants}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MerchantCard
              merchant={item}
              onPress={() => handleMerchantPress(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.merchantsList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Layout.spacing.lg,
    paddingBottom: 0,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    margin: Layout.spacing.lg,
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
  filterButton: {
    padding: Layout.spacing.xs,
  },
  filtersCard: {
    marginHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
    padding: Layout.spacing.md,
  },
  filtersScrollView: {
    maxHeight: 200,
  },
  filterSection: {
    marginBottom: Layout.spacing.md,
  },
  filterTitle: {
    marginBottom: Layout.spacing.xs,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterOption: {
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: Colors.gray[100],
    marginRight: Layout.spacing.xs,
    marginBottom: Layout.spacing.xs,
  },
  filterOptionSelected: {
    backgroundColor: Colors.primary[100],
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: Layout.spacing.lg,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  merchantsList: {
    paddingBottom: Layout.spacing.xxl,
  },
});