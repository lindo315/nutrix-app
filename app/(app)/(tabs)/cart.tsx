import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import Layout from '@/constants/Layout';
import CartItem from '@/components/cart/CartItem';
import Button from '@/components/ui/Button';

export default function CartScreen() {
  const { colors } = useTheme();
  const { items, updateQuantity, removeItem, total } = useCart();
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  const handleIncrement = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };
  
  const handleDecrement = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };
  
  const handleRemove = (id: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeItem(id),
        },
      ]
    );
  };
  
  const deliveryFee = 10.00;
  const subtotal = total;
  const orderTotal = subtotal + deliveryFee;
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Your Cart</Text>
        {items.length > 0 && (
          <Text style={[styles.merchantName, { color: colors.inactiveText }]}>
            From: {items[0].merchantName}
          </Text>
        )}
      </View>
      
      {items.length > 0 ? (
        <>
          <ScrollView style={styles.content}>
            {items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onRemove={handleRemove}
              />
            ))}
            
            <View style={styles.notesContainer}>
              <Text style={[styles.notesLabel, { color: colors.text }]}>
                Special Instructions
              </Text>
              <TouchableOpacity
                style={[
                  styles.notesButton,
                  { borderColor: colors.border, backgroundColor: colors.highlightBackground },
                ]}
                onPress={() => {
                  // Implement notes modal or input here
                }}
              >
                <Text style={[styles.notesText, { color: colors.inactiveText }]}>
                  Add notes for the restaurant...
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          
          <View
            style={[
              styles.summaryContainer,
              { borderTopColor: colors.border, backgroundColor: colors.card },
            ]}
          >
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.inactiveText }]}>
                Subtotal
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                R{subtotal.toFixed(2)}
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.inactiveText }]}>
                Service Fee
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                R{deliveryFee.toFixed(2)}
              </Text>
            </View>
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={[styles.totalLabel, { color: colors.text }]}>
                Total
              </Text>
              <Text style={[styles.totalValue, { color: colors.primary }]}>
                R{orderTotal.toFixed(2)}
              </Text>
            </View>
            
            <Button
              title="Checkout"
              onPress={() => router.push('/checkout')}
              fullWidth
            />
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Your Cart is Empty
          </Text>
          <Text style={[styles.emptyText, { color: colors.inactiveText }]}>
            Add items from a restaurant to get started
          </Text>
          <Button
            title="Browse Restaurants"
            onPress={() => router.push('/')}
            style={styles.browseButton}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Layout.spacing.xl,
    paddingTop: Layout.spacing.xl,
    paddingBottom: Layout.spacing.m,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  merchantName: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.xl,
    paddingTop: Layout.spacing.m,
  },
  notesContainer: {
    marginBottom: Layout.spacing.xxl,
  },
  notesLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: Layout.spacing.s,
  },
  notesButton: {
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
  },
  notesText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  summaryContainer: {
    padding: Layout.spacing.xl,
    borderTopWidth: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.s,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  totalRow: {
    marginTop: Layout.spacing.m,
    marginBottom: Layout.spacing.l,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  totalValue: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.xl,
  },
  emptyTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: Layout.spacing.s,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    marginBottom: Layout.spacing.xl,
    textAlign: 'center',
  },
  browseButton: {
    minWidth: 200,
  },
});