import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { Minus, Plus, Trash, ArrowRight, Info } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Interface for cart item
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  notes?: string;
}

// Mock data for cart items
const initialCartItems: CartItem[] = [
  {
    id: 'item-001',
    name: 'Cheese Burger',
    price: 45,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quantity: 1,
  },
  {
    id: 'item-002',
    name: 'Fries (Large)',
    price: 25,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quantity: 1,
  },
  {
    id: 'item-003',
    name: 'Soda (500ml)',
    price: 15,
    image: 'https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quantity: 1,
  },
];

export default function CartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const serviceFee = 5; // Fixed service fee
  const total = subtotal + serviceFee;
  
  // Update item quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  // Handle checkout
  const handleCheckout = () => {
    router.push('/checkout');
  };
  
  // Render cart item
  const renderCartItem = ({ item }: { item: CartItem }) => (
    <Card style={styles.itemCard}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        
        <View style={styles.itemDetails}>
          <Typography variant="subtitle2" style={styles.itemName}>
            {item.name}
          </Typography>
          
          <Typography variant="body2" color="primary" style={styles.itemPrice}>
            R{item.price.toFixed(2)}
          </Typography>
          
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Minus size={16} color={Colors.gray[600]} />
            </TouchableOpacity>
            
            <Typography variant="body2" style={styles.quantityText}>
              {item.quantity}
            </Typography>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus size={16} color={Colors.gray[600]} />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => removeItem(item.id)}
        >
          <Trash size={20} color={Colors.error[500]} />
        </TouchableOpacity>
      </View>
    </Card>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h3" style={styles.headerTitle}>
          My Cart
        </Typography>
        <Typography variant="body2" color="gray">
          Burger Joint
        </Typography>
      </View>
      
      {cartItems.length > 0 ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.itemsContainer}>
            <FlatList
              data={cartItems}
              keyExtractor={item => item.id}
              renderItem={renderCartItem}
              scrollEnabled={false}
              contentContainerStyle={styles.itemsList}
            />
          </View>
          
          <View style={styles.instructionsContainer}>
            <Typography variant="subtitle2" style={styles.sectionTitle}>
              Special Instructions
            </Typography>
            <TextInput
              style={styles.instructionsInput}
              placeholder="Add notes for the restaurant"
              multiline
              numberOfLines={3}
              value={specialInstructions}
              onChangeText={setSpecialInstructions}
              placeholderTextColor={Colors.gray[400]}
            />
          </View>
          
          <View style={styles.summaryContainer}>
            <Typography variant="subtitle2" style={styles.sectionTitle}>
              Order Summary
            </Typography>
            
            <View style={styles.summaryRow}>
              <Typography variant="body2" color="gray">
                Subtotal
              </Typography>
              <Typography variant="body2">
                R{subtotal.toFixed(2)}
              </Typography>
            </View>
            
            <View style={styles.summaryRow}>
              <View style={styles.feeContainer}>
                <Typography variant="body2" color="gray">
                  Service Fee
                </Typography>
                <TouchableOpacity style={styles.infoButton}>
                  <Info size={14} color={Colors.gray[500]} />
                </TouchableOpacity>
              </View>
              <Typography variant="body2">
                R{serviceFee.toFixed(2)}
              </Typography>
            </View>
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Typography variant="subtitle1">
                Total
              </Typography>
              <Typography variant="subtitle1" color="primary">
                R{total.toFixed(2)}
              </Typography>
            </View>
          </View>
          
          <Button
            variant="filled"
            size="large"
            fullWidth
            style={styles.checkoutButton}
            onPress={handleCheckout}
            rightIcon={<ArrowRight size={20} color={Colors.white} />}
          >
            Proceed to Checkout
          </Button>
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Typography variant="body1" color="gray" center>
            Your cart is empty
          </Typography>
          <Button
            variant="filled"
            size="medium"
            style={styles.browseButton}
            onPress={() => router.navigate('/(tabs)')}
          >
            Browse Merchants
          </Button>
        </View>
      )}
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
    paddingBottom: Layout.spacing.md,
  },
  headerTitle: {
    marginBottom: Layout.spacing.xs,
    fontFamily: 'Poppins-Bold',
  },
  content: {
    flex: 1,
  },
  itemsContainer: {
    padding: Layout.spacing.lg,
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemsList: {},
  itemCard: {
    marginBottom: Layout.spacing.md,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: Layout.borderRadius.sm,
  },
  itemDetails: {
    flex: 1,
    marginLeft: Layout.spacing.md,
  },
  itemName: {
    fontFamily: 'Poppins-SemiBold',
  },
  itemPrice: {
    marginTop: 2,
    marginBottom: Layout.spacing.xs,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: Colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    marginHorizontal: Layout.spacing.sm,
    minWidth: 16,
    textAlign: 'center',
  },
  removeButton: {
    padding: Layout.spacing.xs,
  },
  instructionsContainer: {
    padding: Layout.spacing.lg,
    paddingBottom: 0,
  },
  sectionTitle: {
    marginBottom: Layout.spacing.sm,
    fontFamily: 'Poppins-SemiBold',
  },
  instructionsInput: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.sm,
    padding: Layout.spacing.md,
    minHeight: 80,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: Colors.gray[300],
  },
  summaryContainer: {
    padding: Layout.spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.sm,
  },
  feeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoButton: {
    marginLeft: Layout.spacing.xs,
  },
  totalRow: {
    marginTop: Layout.spacing.sm,
    paddingTop: Layout.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
  checkoutButton: {
    marginHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  browseButton: {
    marginTop: Layout.spacing.lg,
  },
});