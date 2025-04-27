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
import {
  CreditCard,
  MapPin,
  Clock,
  ChevronRight,
  CheckCircle,
} from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';
import Layout from '@/constants/Layout';
import Button from '@/components/ui/Button';

export default function CheckoutScreen() {
  const { colors } = useTheme();
  const { items, total, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [loading, setLoading] = useState(false);
  
  const serviceFee = 10.00;
  const orderTotal = total + serviceFee;
  
  const handlePlaceOrder = () => {
    if (items.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }
    
    setLoading(true);
    
    // Create a new order
    const newOrder = {
      id: `ord-${Date.now()}`,
      merchantId: items[0].merchantId,
      merchantName: items[0].merchantName,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        options: item.options,
      })),
      status: 'preparing' as const,
      total: orderTotal,
      date: new Date().toLocaleString(),
      estimatedPickup: '15-20 min',
      location: 'East Campus',
    };
    
    // Simulate order processing
    setTimeout(() => {
      setLoading(false);
      addOrder(newOrder);
      clearCart();
      Alert.alert(
        'Order Placed!',
        'Your order has been successfully placed.',
        [
          {
            text: 'View Order',
            onPress: () => router.replace(`/order/${newOrder.id}`),
          },
        ]
      );
    }, 1500);
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Delivery Details</Text>
          
          <TouchableOpacity 
            style={[styles.optionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.optionIcon}>
              <MapPin size={20} color={colors.primary} />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, { color: colors.text }]}>Pickup Location</Text>
              <Text style={[styles.optionValue, { color: colors.inactiveText }]}>
                {items[0]?.merchantName}, East Campus
              </Text>
            </View>
            <ChevronRight size={20} color={colors.inactiveText} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.optionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.optionIcon}>
              <Clock size={20} color={colors.primary} />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, { color: colors.text }]}>Pickup Time</Text>
              <Text style={[styles.optionValue, { color: colors.inactiveText }]}>
                As soon as possible (15-20 min)
              </Text>
            </View>
            <ChevronRight size={20} color={colors.inactiveText} />
          </TouchableOpacity>
          
          <Text style={[styles.sectionTitle, { color: colors.text, marginTop: Layout.spacing.xl }]}>
            Payment Method
          </Text>
          
          <TouchableOpacity 
            style={[
              styles.paymentOption,
              {
                backgroundColor: colors.card,
                borderColor: paymentMethod === 'card' ? colors.primary : colors.border,
              },
            ]}
            onPress={() => setPaymentMethod('card')}
          >
            <View style={styles.paymentOptionContent}>
              <CreditCard size={20} color={colors.primary} />
              <Text style={[styles.paymentOptionText, { color: colors.text }]}>
                Credit/Debit Card
              </Text>
            </View>
            {paymentMethod === 'card' && (
              <CheckCircle size={20} color={colors.primary} />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.paymentOption,
              {
                backgroundColor: colors.card,
                borderColor: paymentMethod === 'cash' ? colors.primary : colors.border,
              },
            ]}
            onPress={() => setPaymentMethod('cash')}
          >
            <View style={styles.paymentOptionContent}>
              <Text style={[styles.cashIcon, { color: colors.primary }]}>R</Text>
              <Text style={[styles.paymentOptionText, { color: colors.text }]}>
                Cash on Pickup
              </Text>
            </View>
            {paymentMethod === 'cash' && (
              <CheckCircle size={20} color={colors.primary} />
            )}
          </TouchableOpacity>
          
          {paymentMethod === 'card' && (
            <TouchableOpacity 
              style={[styles.optionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <View style={styles.optionIcon}>
                <CreditCard size={20} color={colors.primary} />
              </View>
              <View style={styles.optionContent}>
                <Text style={[styles.optionTitle, { color: colors.text }]}>Add Payment Card</Text>
                <Text style={[styles.optionValue, { color: colors.inactiveText }]}>
                  Add a new credit or debit card
                </Text>
              </View>
              <ChevronRight size={20} color={colors.inactiveText} />
            </TouchableOpacity>
          )}
          
          <View style={styles.orderSummaryContainer}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Order Summary
            </Text>
            
            <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.inactiveText }]}>
                  Subtotal
                </Text>
                <Text style={[styles.summaryValue, { color: colors.text }]}>
                  R{total.toFixed(2)}
                </Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.inactiveText }]}>
                  Service Fee
                </Text>
                <Text style={[styles.summaryValue, { color: colors.text }]}>
                  R{serviceFee.toFixed(2)}
                </Text>
              </View>
              
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              
              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { color: colors.text }]}>
                  Total
                </Text>
                <Text style={[styles.totalValue, { color: colors.primary }]}>
                  R{orderTotal.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View
        style={[
          styles.footer,
          { borderTopColor: colors.border, backgroundColor: colors.card },
        ]}
      >
        <View style={styles.totalContainer}>
          <Text style={[styles.footerTotalLabel, { color: colors.inactiveText }]}>Total:</Text>
          <Text style={[styles.footerTotalValue, { color: colors.primary }]}>
            R{orderTotal.toFixed(2)}
          </Text>
        </View>
        
        <Button
          title="Place Order"
          onPress={handlePlaceOrder}
          loading={loading}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Layout.spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: Layout.spacing.m,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.l,
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
    marginBottom: Layout.spacing.m,
  },
  optionIcon: {
    marginRight: Layout.spacing.m,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 2,
  },
  optionValue: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Layout.spacing.l,
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 2,
    marginBottom: Layout.spacing.m,
  },
  paymentOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentOptionText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    marginLeft: Layout.spacing.m,
  },
  cashIcon: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    width: 20,
    textAlign: 'center',
  },
  orderSummaryContainer: {
    marginTop: Layout.spacing.xl,
  },
  summaryCard: {
    padding: Layout.spacing.l,
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.m,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  divider: {
    height: 1,
    marginBottom: Layout.spacing.m,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  footer: {
    padding: Layout.spacing.xl,
    borderTopWidth: 1,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  footerTotalLabel: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    marginRight: Layout.spacing.s,
  },
  footerTotalValue: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
});