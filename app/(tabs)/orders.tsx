import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { Clock, Check, MapPin, ExternalLink } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Order status types
type OrderStatus = 'preparing' | 'ready' | 'completed';

// Interface for order data
interface OrderData {
  id: string;
  merchantName: string;
  merchantImage: string;
  items: string[];
  total: string;
  date: string;
  status: OrderStatus;
  pickupTime?: string;
  pickupLocation?: string;
}

// Mock data for orders
const orderData: OrderData[] = [
  {
    id: 'order-001',
    merchantName: 'Burger Joint',
    merchantImage: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    items: ['Cheese Burger', 'Fries', 'Soda'],
    total: 'R75.00',
    date: '15 June, 12:30 PM',
    status: 'preparing',
    pickupTime: '12:45 PM',
    pickupLocation: 'West Campus Food Court',
  },
  {
    id: 'order-002',
    merchantName: 'Coffee Brew',
    merchantImage: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    items: ['Cappuccino', 'Chocolate Muffin'],
    total: 'R45.00',
    date: '15 June, 09:15 AM',
    status: 'ready',
    pickupTime: '09:30 AM',
    pickupLocation: 'Library Cafe',
  },
  {
    id: 'order-003',
    merchantName: 'Pizza Palace',
    merchantImage: 'https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    items: ['Margherita Pizza', 'Garlic Bread'],
    total: 'R120.00',
    date: '14 June, 06:30 PM',
    status: 'completed',
  },
  {
    id: 'order-004',
    merchantName: 'Salad Bowl',
    merchantImage: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    items: ['Caesar Salad', 'Fresh Juice'],
    total: 'R65.00',
    date: '14 June, 01:45 PM',
    status: 'completed',
  },
  {
    id: 'order-005',
    merchantName: 'Sushi Express',
    merchantImage: 'https://images.pexels.com/photos/684965/pexels-photo-684965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    items: ['Salmon Roll (8pc)', 'Miso Soup'],
    total: 'R95.00',
    date: '13 June, 12:15 PM',
    status: 'completed',
  },
];

export default function OrdersScreen() {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState<number>(0);
  
  // Filter orders based on active tab
  const filteredOrders = orderData.filter(order => {
    if (tabIndex === 0) {
      return order.status === 'preparing' || order.status === 'ready';
    } else {
      return order.status === 'completed';
    }
  });
  
  const handleOrderPress = (orderId: string) => {
    // Navigate to order detail screen
    router.push(`/order/${orderId}`);
  };
  
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'preparing':
        return <Clock size={16} color={Colors.warning[500]} />;
      case 'ready':
        return <Check size={16} color={Colors.success[500]} />;
      case 'completed':
        return <Check size={16} color={Colors.success[500]} />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready for pickup';
      case 'completed':
        return 'Completed';
      default:
        return '';
    }
  };
  
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'preparing':
        return 'warning';
      case 'ready':
        return 'success';
      case 'completed':
        return 'success';
      default:
        return 'gray';
    }
  };
  
  const renderOrderItem = ({ item }: { item: OrderData }) => (
    <Card style={styles.orderCard}>
      <TouchableOpacity 
        style={styles.orderContent}
        onPress={() => handleOrderPress(item.id)}
      >
        <View style={styles.orderHeader}>
          <Typography variant="subtitle1" style={styles.merchantName}>
            {item.merchantName}
          </Typography>
          
          <View style={styles.statusContainer}>
            {getStatusIcon(item.status)}
            <Typography 
              variant="caption" 
              color={getStatusColor(item.status)} 
              style={styles.statusText}
            >
              {getStatusText(item.status)}
            </Typography>
          </View>
        </View>
        
        <View style={styles.orderDetails}>
          <Typography variant="body2">
            {item.items.join(', ')}
          </Typography>
          
          <Typography variant="subtitle2" color="primary">
            {item.total}
          </Typography>
        </View>
        
        <View style={styles.orderFooter}>
          <Typography variant="caption" color="gray">
            {item.date}
          </Typography>
          
          {(item.status === 'preparing' || item.status === 'ready') && (
            <View style={styles.pickupContainer}>
              <View style={styles.pickupInfo}>
                <Clock size={14} color={Colors.gray[500]} />
                <Typography variant="caption" color="gray" style={styles.pickupText}>
                  Pickup at {item.pickupTime}
                </Typography>
              </View>
              
              <View style={styles.pickupInfo}>
                <MapPin size={14} color={Colors.gray[500]} />
                <Typography variant="caption" color="gray" style={styles.pickupText}>
                  {item.pickupLocation}
                </Typography>
              </View>
            </View>
          )}
          
          {item.status === 'ready' && (
            <View style={styles.readyIndicator}>
              <Typography variant="caption" color="success" bold>
                Show QR at pickup
              </Typography>
              <ExternalLink size={14} color={Colors.success[500]} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Card>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h3" style={styles.headerTitle}>
          My Orders
        </Typography>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, tabIndex === 0 && styles.activeTab]}
            onPress={() => setTabIndex(0)}
          >
            <Typography 
              variant="subtitle2" 
              color={tabIndex === 0 ? 'primary' : 'gray'}
            >
              Active
            </Typography>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, tabIndex === 1 && styles.activeTab]}
            onPress={() => setTabIndex(1)}
          >
            <Typography 
              variant="subtitle2" 
              color={tabIndex === 1 ? 'primary' : 'gray'}
            >
              History
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
      
      {filteredOrders.length > 0 ? (
        <FlatList
          data={filteredOrders}
          keyExtractor={item => item.id}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.ordersList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Typography variant="body1" color="gray" center>
            {tabIndex === 0 
              ? "You don't have any active orders"
              : "Your order history is empty"}
          </Typography>
          
          {tabIndex === 0 && (
            <TouchableOpacity 
              style={styles.orderNowButton}
              onPress={() => router.navigate('/(tabs)')}
            >
              <Typography variant="subtitle2" color="primary">
                Order Now
              </Typography>
            </TouchableOpacity>
          )}
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
  },
  headerTitle: {
    marginBottom: Layout.spacing.md,
    fontFamily: 'Poppins-Bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.full,
    padding: Layout.spacing.xs,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: Layout.spacing.sm,
    alignItems: 'center',
    borderRadius: Layout.borderRadius.full,
  },
  activeTab: {
    backgroundColor: Colors.primary[50],
  },
  ordersList: {
    padding: Layout.spacing.lg,
    paddingTop: 0,
  },
  orderCard: {
    marginBottom: Layout.spacing.md,
  },
  orderContent: {
    width: '100%',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  merchantName: {
    fontFamily: 'Poppins-SemiBold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[100],
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.full,
  },
  statusText: {
    marginLeft: 4,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  orderFooter: {},
  pickupContainer: {
    marginTop: Layout.spacing.sm,
  },
  pickupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Layout.spacing.xs,
  },
  pickupText: {
    marginLeft: 4,
  },
  readyIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: Layout.spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  orderNowButton: {
    marginTop: Layout.spacing.lg,
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: Colors.primary[50],
  },
});