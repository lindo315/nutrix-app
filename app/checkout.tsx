import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { 
  ArrowLeft,
  Clock,
  CreditCard,
  Wallet,
  ChevronRight
} from 'lucide-react-native';

// Mock data for pickup times
const pickupTimes = [
  { id: '1', time: 'As soon as possible (15-20 min)' },
  { id: '2', time: '12:30 PM (20 min)' },
  { id: '3', time: '12:45 PM (35 min)' },
  { id: '4', time: '1:00 PM (50 min)' },
];

// Mock data for payment methods
const paymentMethods = [
  { id: 'card', name: 'Credit Card', icon: CreditCard },
  { id: 'wallet', name: 'Campus Wallet', icon: Wallet },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState(pickupTimes[0].id);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePayment = () => {
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      router.push('/order-confirmation');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.gray[800]} />
        </TouchableOpacity>
        <Typography variant="h3" style={styles.headerTitle}>
          Checkout
        </Typography>
      </View>
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.section}>
          <Typography variant="subtitle1" style={styles.sectionTitle}>
            Order Summary
          </Typography>
          
          <View style={styles.orderItem}>
            <Typography variant="body2">1x Classic Burger</Typography>
            <Typography variant="body2">R45.00</Typography>
          </View>
          
          <View style={styles.orderItem}>
            <Typography variant="body2">1x Large Fries</Typography>
            <Typography variant="body2">R25.00</Typography>
          </View>
          
          <View style={styles.orderItem}>
            <Typography variant="body2">1x Soda</Typography>
            <Typography variant="body2">R15.00</Typography>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.orderItem}>
            <Typography variant="body2" color="gray">Subtotal</Typography>
            <Typography variant="body2">R85.00</Typography>
          </View>
          
          <View style={styles.orderItem}>
            <Typography variant="body2" color="gray">Service Fee</Typography>
            <Typography variant="body2">R5.00</Typography>
          </View>
          
          <View style={[styles.orderItem, styles.totalItem]}>
            <Typography variant="subtitle1">Total</Typography>
            <Typography variant="subtitle1" color="primary">R90.00</Typography>
          </View>
        </Card>
        
        <Card style={styles.section}>
          <Typography variant="subtitle1" style={styles.sectionTitle}>
            Pickup Time
          </Typography>
          
          {pickupTimes.map(time => (
            <TouchableOpacity
              key={time.id}
              style={[
                styles.timeOption,
                selectedTime === time.id && styles.selectedTime
              ]}
              onPress={() => setSelectedTime(time.id)}
            >
              <View style={styles.timeOptionContent}>
                <Clock 
                  size={20} 
                  color={selectedTime === time.id ? Colors.primary[600] : Colors.gray[500]} 
                />
                <Typography 
                  variant="body2"
                  color={selectedTime === time.id ? 'primary' : 'gray'}
                  style={styles.timeText}
                >
                  {time.time}
                </Typography>
              </View>
              {selectedTime === time.id && (
                <View style={styles.selectedIndicator} />
              )}
            </TouchableOpacity>
          ))}
        </Card>
        
        <Card style={styles.section}>
          <Typography variant="subtitle1" style={styles.sectionTitle}>
            Payment Method
          </Typography>
          
          {paymentMethods.map(method => {
            const Icon = method.icon;
            return (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentOption,
                  selectedPayment === method.id && styles.selectedPayment
                ]}
                onPress={() => setSelectedPayment(method.id)}
              >
                <View style={styles.paymentOptionContent}>
                  <Icon 
                    size={20} 
                    color={selectedPayment === method.id ? Colors.primary[600] : Colors.gray[500]} 
                  />
                  <Typography 
                    variant="body2"
                    color={selectedPayment === method.id ? 'primary' : 'gray'}
                    style={styles.paymentText}
                  >
                    {method.name}
                  </Typography>
                </View>
                <ChevronRight 
                  size={20} 
                  color={selectedPayment === method.id ? Colors.primary[600] : Colors.gray[400]} 
                />
              </TouchableOpacity>
            );
          })}
        </Card>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          variant="filled"
          size="large"
          fullWidth
          loading={isLoading}
          onPress={handlePayment}
        >
          Pay Now • R90.00
        </Button>
        
        {Platform.OS === 'web' && (
          <Typography variant="caption" color="gray" center style={styles.secureNote}>
            🔒 Payments are secure and encrypted
          </Typography>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.lg,
  },
  backButton: {
    marginRight: Layout.spacing.md,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
  },
  content: {
    flex: 1,
    padding: Layout.spacing.lg,
  },
  section: {
    marginBottom: Layout.spacing.lg,
  },
  sectionTitle: {
    marginBottom: Layout.spacing.md,
    fontFamily: 'Poppins-SemiBold',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.gray[200],
    marginVertical: Layout.spacing.md,
  },
  totalItem: {
    marginTop: Layout.spacing.sm,
  },
  timeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  timeOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    marginLeft: Layout.spacing.md,
  },
  selectedTime: {
    backgroundColor: Colors.primary[50],
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary[500],
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  paymentOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    marginLeft: Layout.spacing.md,
  },
  selectedPayment: {
    backgroundColor: Colors.primary[50],
  },
  footer: {
    padding: Layout.spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
  secureNote: {
    marginTop: Layout.spacing.sm,
  },
});