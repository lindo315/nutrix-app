import React from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { 
  ArrowLeft,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  Check,
  ChevronRight
} from 'lucide-react-native';
import QRCode from 'react-native-qrcode-svg';

// Mock order data
const orderData = {
  id: 'order-123',
  status: 'preparing', // 'preparing' | 'ready' | 'completed'
  merchant: {
    name: 'Burger Joint',
    location: 'West Campus Food Court',
    phone: '+27 11 234 5678',
  },
  items: [
    {
      name: 'Classic Burger',
      quantity: 1,
      price: 45.00,
      options: ['Regular Size', 'Extra Cheese'],
    },
    {
      name: 'French Fries',
      quantity: 1,
      price: 25.00,
      options: ['Large Size'],
    },
    {
      name: 'Soda',
      quantity: 1,
      price: 15.00,
      options: ['500ml'],
    },
  ],
  subtotal: 85.00,
  serviceFee: 5.00,
  total: 90.00,
  pickupTime: '12:45 PM',
  orderTime: '12:30 PM',
};

export default function OrderDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const getStatusColor = () => {
    switch (orderData.status) {
      case 'preparing':
        return Colors.warning[500];
      case 'ready':
        return Colors.success[500];
      case 'completed':
        return Colors.success[500];
      default:
        return Colors.gray[500];
    }
  };
  
  const getStatusText = () => {
    switch (orderData.status) {
      case 'preparing':
        return 'Preparing your order';
      case 'ready':
        return 'Ready for pickup';
      case 'completed':
        return 'Order completed';
      default:
        return '';
    }
  };
  
  const handleCall = () => {
    if (Platform.OS === 'web') {
      window.location.href = `tel:${orderData.merchant.phone}`;
    }
  };
  
  const handleMessage = () => {
    // Implement chat functionality
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
          Order Details
        </Typography>
      </View>
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Typography variant="subtitle2" style={styles.orderNumber}>
              Order #{orderData.id}
            </Typography>
            <Typography variant="caption" color="gray">
              {orderData.orderTime}
            </Typography>
          </View>
          
          <View 
            style={[
              styles.statusContainer,
              { backgroundColor: `${getStatusColor()}10` }
            ]}
          >
            <View style={styles.statusIcon}>
              {orderData.status === 'preparing' ? (
                <Clock size={20} color={getStatusColor()} />
              ) : (
                <Check size={20} color={getStatusColor()} />
              )}
            </View>
            <Typography 
              variant="body2"
              style={[styles.statusText, { color: getStatusColor() }]}
            >
              {getStatusText()}
            </Typography>
          </View>
          
          {orderData.status !== 'completed' && (
            <View style={styles.qrContainer}>
              <QRCode
                value={orderData.id}
                size={200}
                color={Colors.primary[900]}
              />
              <Typography variant="caption" color="gray" center style={styles.qrNote}>
                Show this QR code when collecting your order
              </Typography>
            </View>
          )}
        </Card>
        
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography variant="subtitle1" style={styles.sectionTitle}>
              Pickup Details
            </Typography>
            
            <View style={styles.pickupTime}>
              <Clock size={16} color={Colors.primary[500]} />
              <Typography variant="body2" color="primary" style={styles.pickupTimeText}>
                {orderData.pickupTime}
              </Typography>
            </View>
          </View>
          
          <View style={styles.merchantInfo}>
            <Typography variant="body1" style={styles.merchantName}>
              {orderData.merchant.name}
            </Typography>
            
            <View style={styles.locationContainer}>
              <MapPin size={16} color={Colors.gray[500]} />
              <Typography variant="body2" color="gray" style={styles.locationText}>
                {orderData.merchant.location}
              </Typography>
            </View>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleCall}
            >
              <Phone size={20} color={Colors.primary[500]} />
              <Typography variant="body2" color="primary" style={styles.actionText}>
                Call
              </Typography>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleMessage}
            >
              <MessageSquare size={20} color={Colors.primary[500]} />
              <Typography variant="body2" color="primary" style={styles.actionText}>
                Message
              </Typography>
            </TouchableOpacity>
          </View>
        </Card>
        
        <Card style={styles.section}>
          <Typography variant="subtitle1" style={styles.sectionTitle}>
            Order Summary
          </Typography>
          
          {orderData.items.map((item, index) => (
            <View 
              key={index} 
              style={[
                styles.orderItem,
                index < orderData.items.length - 1 && styles.itemBorder
              ]}
            >
              <View style={styles.itemInfo}>
                <Typography variant="body1">
                  {item.quantity}x {item.name}
                </Typography>
                <Typography variant="body2" color="gray">
                  {item.options.join(', ')}
                </Typography>
              </View>
              <Typography variant="body2">
                R{item.price.toFixed(2)}
              </Typography>
            </View>
          ))}
          
          <View style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Typography variant="body2" color="gray">Subtotal</Typography>
            <Typography variant="body2">
              R{orderData.subtotal.toFixed(2)}
            </Typography>
          </View>
          
          <View style={styles.summaryRow}>
            <Typography variant="body2" color="gray">Service Fee</Typography>
            <Typography variant="body2">
              R{orderData.serviceFee.toFixed(2)}
            </Typography>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Typography variant="subtitle1">Total</Typography>
            <Typography variant="subtitle1" color="primary">
              R{orderData.total.toFixed(2)}
            </Typography>
          </View>
        </Card>
        
        {orderData.status === 'completed' && (
          <Button
            variant="outlined"
            size="large"
            fullWidth
            style={styles.reorderButton}
            rightIcon={<ChevronRight size={20} color={Colors.primary[500]} />}
          >
            Reorder
          </Button>
        )}
      </ScrollView>
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
  statusCard: {
    marginBottom: Layout.spacing.lg,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  orderNumber: {
    fontFamily: 'Poppins-SemiBold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.sm,
    marginBottom: Layout.spacing.lg,
  },
  statusIcon: {
    marginRight: Layout.spacing.sm,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
  },
  qrContainer: {
    alignItems: 'center',
  },
  qrNote: {
    marginTop: Layout.spacing.md,
  },
  section: {
    marginBottom: Layout.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
  },
  pickupTime: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.full,
  },
  pickupTimeText: {
    marginLeft: 4,
  },
  merchantInfo: {
    marginBottom: Layout.spacing.md,
  },
  merchantName: {
    marginBottom: 4,
    fontFamily: 'Poppins-Medium',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: Layout.spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.full,
    marginRight: Layout.spacing.md,
  },
  actionText: {
    marginLeft: 4,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Layout.spacing.md,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  itemInfo: {
    flex: 1,
    marginRight: Layout.spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.gray[200],
    marginVertical: Layout.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.sm,
  },
  totalRow: {
    marginTop: Layout.spacing.sm,
  },
  reorderButton: {
    marginTop: Layout.spacing.md,
  },
});