import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import QRCode from 'react-native-qrcode-svg';

export default function OrderConfirmationScreen() {
  const router = useRouter();
  
  const handleViewOrder = () => {
    router.push('/order/order-123');
  };
  
  const handleBackToHome = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/4393433/pexels-photo-4393433.jpeg' }}
          style={styles.logo}
        />
        
        <Typography variant="h2" style={styles.title}>
          Order Confirmed!
        </Typography>
        
        <Typography variant="body1" color="gray" center style={styles.message}>
          Your order has been confirmed and will be ready for pickup at 12:45 PM
        </Typography>
        
        <View style={styles.orderInfo}>
          <Typography variant="subtitle2" style={styles.orderNumber}>
            Order #123-456
          </Typography>
          
          <View style={styles.qrContainer}>
            <QRCode
              value="order-123"
              size={200}
              color={Colors.primary[900]}
            />
          </View>
          
          <Typography variant="caption" color="gray" center>
            Show this QR code when collecting your order
          </Typography>
        </View>
        
        <View style={styles.pickupInfo}>
          <Typography variant="subtitle1" style={styles.pickupTitle}>
            Pickup Location
          </Typography>
          
          <Typography variant="body2" color="gray" center>
            Burger Joint
          </Typography>
          
          <Typography variant="body2" color="gray" center>
            West Campus Food Court
          </Typography>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Button
          variant="filled"
          size="large"
          fullWidth
          style={styles.viewOrderButton}
          onPress={handleViewOrder}
        >
          View Order
        </Button>
        
        <Button
          variant="outlined"
          size="large"
          fullWidth
          color="secondary"
          onPress={handleBackToHome}
        >
          Back to Home
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: Layout.borderRadius.full,
    marginBottom: Layout.spacing.xl,
  },
  title: {
    marginBottom: Layout.spacing.md,
    fontFamily: 'Poppins-Bold',
  },
  message: {
    marginBottom: Layout.spacing.xxl,
  },
  orderInfo: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xxl,
  },
  orderNumber: {
    marginBottom: Layout.spacing.lg,
    fontFamily: 'Poppins-SemiBold',
  },
  qrContainer: {
    padding: Layout.spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: Layout.spacing.md,
  },
  pickupInfo: {
    alignItems: 'center',
  },
  pickupTitle: {
    marginBottom: Layout.spacing.sm,
    fontFamily: 'Poppins-SemiBold',
  },
  footer: {
    padding: Layout.spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
  viewOrderButton: {
    marginBottom: Layout.spacing.md,
  },
});