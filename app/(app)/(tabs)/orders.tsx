import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/constants/Layout';
import OrderCard from '@/components/orders/OrderCard';

// Mock data for orders
const activeOrders = [
  {
    id: 'ord-123',
    merchantName: `Jimmy's`,
    items: 3,
    total: 75.5,
    status: 'preparing' as const,
    date: 'Today, 12:30 PM',
    estimatedPickup: '10 minutes',
    location: 'East Campus',
  },
  {
    id: 'ord-124',
    merchantName: 'Kudu Burger',
    items: 2,
    total: 62.0,
    status: 'ready' as const,
    date: 'Today, 11:45 AM',
    location: 'West Campus',
  },
];

const pastOrders = [
  {
    id: 'ord-120',
    merchantName: 'Campus Thai',
    items: 1,
    total: 45.0,
    status: 'completed' as const,
    date: 'Yesterday, 6:15 PM',
    location: 'East Campus',
  },
  {
    id: 'ord-121',
    merchantName: 'Braam Pizza',
    items: 2,
    total: 89.0,
    status: 'completed' as const,
    date: 'Yesterday, 1:20 PM',
    location: 'West Campus',
  },
  {
    id: 'ord-119',
    merchantName: "Oliver's Bakery",
    items: 4,
    total: 56.5,
    status: 'cancelled' as const,
    date: 'Aug 10, 9:30 AM',
    location: 'Main Campus',
  },
];

export default function OrdersScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');

  const navigateToOrderDetails = (id: string) => {
    router.push(`/order/${id}`);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Your Orders</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'active' && [
              styles.activeTab,
              { borderBottomColor: colors.primary },
            ],
          ]}
          onPress={() => setActiveTab('active')}
        >
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === 'active' ? colors.primary : colors.inactiveText,
              },
            ]}
          >
            Active
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'past' && [
              styles.activeTab,
              { borderBottomColor: colors.primary },
            ],
          ]}
          onPress={() => setActiveTab('past')}
        >
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === 'past' ? colors.primary : colors.inactiveText,
              },
            ]}
          >
            Past Orders
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'active' ? (
          activeOrders.length > 0 ? (
            activeOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onPress={navigateToOrderDetails}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                No Active Orders
              </Text>
              <Text style={[styles.emptyText, { color: colors.inactiveText }]}>
                Your active orders will appear here
              </Text>
              <TouchableOpacity
                style={[
                  styles.orderButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={() => router.push('/')}
              >
                <Text style={styles.orderButtonText}>Find Food</Text>
              </TouchableOpacity>
            </View>
          )
        ) : pastOrders.length > 0 ? (
          pastOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onPress={navigateToOrderDetails}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No Past Orders
            </Text>
            <Text style={[styles.emptyText, { color: colors.inactiveText }]}>
              Your order history will appear here
            </Text>
          </View>
        )}
      </ScrollView>
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
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    paddingVertical: Layout.spacing.m,
    marginRight: Layout.spacing.xl,
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.xl,
    paddingTop: Layout.spacing.m,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Layout.spacing.xxl,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: Layout.spacing.s,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    marginBottom: Layout.spacing.l,
    textAlign: 'center',
  },
  orderButton: {
    paddingHorizontal: Layout.spacing.xl,
    paddingVertical: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
  },
  orderButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
});
