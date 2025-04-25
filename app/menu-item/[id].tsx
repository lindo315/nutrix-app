import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { ArrowLeft, Minus, Plus } from 'lucide-react-native';

// Mock menu item data
const menuItem = {
  id: '1',
  name: 'Classic Burger',
  description: 'Our signature burger featuring a juicy beef patty, fresh lettuce, tomato, melted cheese, and our special sauce, all served on a toasted brioche bun.',
  price: 45.00,
  image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
  options: [
    {
      id: 'size',
      name: 'Size',
      required: true,
      items: [
        { id: 'regular', name: 'Regular', price: 0 },
        { id: 'large', name: 'Large', price: 10 },
      ]
    },
    {
      id: 'extras',
      name: 'Extra Toppings',
      required: false,
      items: [
        { id: 'cheese', name: 'Extra Cheese', price: 8 },
        { id: 'bacon', name: 'Bacon', price: 12 },
        { id: 'avocado', name: 'Avocado', price: 10 },
      ]
    }
  ]
};

export default function MenuItemScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({
    size: 'regular',
    extras: [] as string[]
  });
  
  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const toggleExtra = (extraId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter(id => id !== extraId)
        : [...prev.extras, extraId]
    }));
  };
  
  const calculateTotal = () => {
    let total = menuItem.price * quantity;
    
    // Add size price
    const selectedSize = menuItem.options
      .find(opt => opt.id === 'size')?.items
      .find(item => item.id === selectedOptions.size);
    if (selectedSize) {
      total += selectedSize.price * quantity;
    }
    
    // Add extras price
    const extrasOption = menuItem.options.find(opt => opt.id === 'extras');
    if (extrasOption) {
      selectedOptions.extras.forEach(extraId => {
        const extra = extrasOption.items.find(item => item.id === extraId);
        if (extra) {
          total += extra.price * quantity;
        }
      });
    }
    
    return total.toFixed(2);
  };
  
  const handleAddToCart = () => {
    // Add to cart logic here
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.gray[800]} />
          </TouchableOpacity>
        </View>
        
        <Image 
          source={{ uri: menuItem.image }} 
          style={styles.image}
        />
        
        <View style={styles.content}>
          <Typography variant="h3" style={styles.name}>
            {menuItem.name}
          </Typography>
          
          <Typography variant="body1" color="gray" style={styles.description}>
            {menuItem.description}
          </Typography>
          
          <View style={styles.quantityContainer}>
            <Typography variant="subtitle1">Quantity</Typography>
            
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => updateQuantity(quantity - 1)}
              >
                <Minus size={20} color={Colors.gray[600]} />
              </TouchableOpacity>
              
              <Typography variant="h4" style={styles.quantity}>
                {quantity}
              </Typography>
              
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => updateQuantity(quantity + 1)}
              >
                <Plus size={20} color={Colors.gray[600]} />
              </TouchableOpacity>
            </View>
          </View>
          
          {menuItem.options.map(option => (
            <View key={option.id} style={styles.optionSection}>
              <Typography variant="subtitle1" style={styles.optionTitle}>
                {option.name}
                {option.required && (
                  <Typography variant="caption" color="error"> *</Typography>
                )}
              </Typography>
              
              <View style={styles.optionsGrid}>
                {option.items.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.optionButton,
                      option.id === 'size' && selectedOptions.size === item.id && styles.selectedOption,
                      option.id === 'extras' && selectedOptions.extras.includes(item.id) && styles.selectedOption
                    ]}
                    onPress={() => {
                      if (option.id === 'size') {
                        setSelectedOptions(prev => ({ ...prev, size: item.id }));
                      } else {
                        toggleExtra(item.id);
                      }
                    }}
                  >
                    <Typography 
                      variant="body2"
                      color={
                        (option.id === 'size' && selectedOptions.size === item.id) ||
                        (option.id === 'extras' && selectedOptions.extras.includes(item.id))
                          ? 'primary'
                          : 'gray'
                      }
                    >
                      {item.name}
                    </Typography>
                    {item.price > 0 && (
                      <Typography 
                        variant="caption"
                        color={
                          (option.id === 'size' && selectedOptions.size === item.id) ||
                          (option.id === 'extras' && selectedOptions.extras.includes(item.id))
                            ? 'primary'
                            : 'gray'
                        }
                      >
                        +R{item.price.toFixed(2)}
                      </Typography>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Typography variant="caption" color="gray">
            Total Price
          </Typography>
          <Typography variant="h4" color="primary" style={styles.price}>
            R{calculateTotal()}
          </Typography>
        </View>
        
        <Button
          variant="filled"
          size="large"
          style={styles.addButton}
          onPress={handleAddToCart}
        >
          Add to Cart
        </Button>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    padding: Layout.spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: Layout.spacing.lg,
  },
  name: {
    marginBottom: Layout.spacing.sm,
    fontFamily: 'Poppins-Bold',
  },
  description: {
    marginBottom: Layout.spacing.xl,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.xl,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: Colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    marginHorizontal: Layout.spacing.lg,
    minWidth: 24,
    textAlign: 'center',
  },
  optionSection: {
    marginBottom: Layout.spacing.xl,
  },
  optionTitle: {
    marginBottom: Layout.spacing.md,
    fontFamily: 'Poppins-SemiBold',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Layout.spacing.xs,
  },
  optionButton: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: Colors.white,
    marginHorizontal: Layout.spacing.xs,
    marginBottom: Layout.spacing.sm,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  selectedOption: {
    backgroundColor: Colors.primary[50],
    borderColor: Colors.primary[500],
  },
  footer: {
    padding: Layout.spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
    marginRight: Layout.spacing.lg,
  },
  price: {
    fontFamily: 'Poppins-Bold',
  },
  addButton: {
    flex: 2,
  },
});