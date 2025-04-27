import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import {
  Clock,
  MapPin,
  CheckCircle,
  ChevronRight,
  PhoneCall,
  MessageSquare,
} from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/constants/Layout';
import Button from '@/components/ui/Button';

// Mock order data
const ordersData = {
  'ord-123': {
    id: 'ord-123',
    merchant: {
      id: '1',
      name: `Jimmy's`,
      image:
        'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg',
    },
    status: 'preparing' as const,
    orderNumber: '#1234',
    date: 'August 15, 2023 - 12:30 PM',
    estimatedPickup: '10 minutes',
    location: 'East Campus',
    items: [
      {
        id: 'item1',
        name: 'Breakfast Wrap',
        price: 45.0,
        quantity: 2,
        options: ['Bacon', 'Extra Cheese'],
      },
      {
        id: 'item2',
        name: 'Cappuccino',
        price: 30.0,
        quantity: 1,
        options: ['Extra Shot'],
      },
    ],
    subtotal: 120.0,
    serviceFee: 5.0,
    total: 125.0,
    paymentMethod: 'Credit Card',
  },
  'ord-124': {
    id: 'ord-124',
    merchant: {
      id: '2',
      name: 'Kudu Burger',
      image:
        'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
    },
    status: 'ready' as const,
    orderNumber: '#1235',
    date: 'August 15, 2023 - 11:45 AM',
    location: 'West Campus',
    items: [
      {
        id: 'item3',
        name: 'Kudu Burger',
        price: 65.0,
        quantity: 1,
        options: ['Cheese', 'Bacon'],
      },
      {
        id: 'item4',
        name: 'Fries',
        price: 25.0,
        quantity: 1,
        options: [],
      },
    ],
    subtotal: 90.0,
    serviceFee: 5.0,
    total: 95.0,
    paymentMethod: 'Credit Card',
  },
};

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();

  // Get order data
  const order = ordersData[id as keyof typeof ordersData];

  if (!order) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Order not found</Text>
      </View>
    );
  }

  // Get status info
  const getStatusInfo = () => {
    switch (order.status) {
      case 'preparing':
        return {
          color: colors.warning,
          text: 'Preparing Your Order',
          description: 'Your order is being prepared by the restaurant.',
        };
      case 'ready':
        return {
          color: colors.accent,
          text: 'Ready for Pickup',
          description:
            'Your order is ready! Head to the restaurant to pick it up.',
        };
      case 'completed':
        return {
          color: colors.success,
          text: 'Order Completed',
          description: 'Your order has been picked up and completed.',
        };
      case 'cancelled':
        return {
          color: colors.error,
          text: 'Order Cancelled',
          description: 'Your order has been cancelled.',
        };
      default:
        return {
          color: colors.inactiveText,
          text: 'Processing',
          description: 'Your order is being processed.',
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView>
        <View
          style={[
            styles.statusContainer,
            { backgroundColor: statusInfo.color },
          ]}
        >
          <Text style={styles.statusText}>{statusInfo.text}</Text>
          <Text style={styles.statusDescription}>{statusInfo.description}</Text>

          {order.status === 'preparing' && (
            <View style={styles.estimatedTimeContainer}>
              <Clock size={16} color="white" />
              <Text style={styles.estimatedTime}>
                Ready in approximately {order.estimatedPickup}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <View
            style={[
              styles.merchantCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Image
              source={{ uri: order.merchant.image }}
              style={styles.merchantImage}
            />
            <View style={styles.merchantInfo}>
              <Text style={[styles.merchantName, { color: colors.text }]}>
                {order.merchant.name}
              </Text>
              <View style={styles.locationContainer}>
                <MapPin size={14} color={colors.inactiveText} />
                <Text
                  style={[styles.locationText, { color: colors.inactiveText }]}
                >
                  {order.location}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.viewButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push(`/merchant/${order.merchant.id}`)}
            >
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Order Details
            </Text>
            <View
              style={[
                styles.detailsCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={styles.detailRow}>
                <Text
                  style={[styles.detailLabel, { color: colors.inactiveText }]}
                >
                  Order Number:
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {order.orderNumber}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text
                  style={[styles.detailLabel, { color: colors.inactiveText }]}
                >
                  Date:
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {order.date}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text
                  style={[styles.detailLabel, { color: colors.inactiveText }]}
                >
                  Payment:
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {order.paymentMethod}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text
                  style={[styles.detailLabel, { color: colors.inactiveText }]}
                >
                  Status:
                </Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: statusInfo.color },
                  ]}
                >
                  <Text style={styles.statusBadgeText}>{statusInfo.text}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Order Items
            </Text>
            <View
              style={[
                styles.orderItemsCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              {order.items.map((item, index) => (
                <View key={item.id}>
                  <View style={styles.orderItem}>
                    <View style={styles.orderItemMain}>
                      <Text
                        style={[styles.itemQuantity, { color: colors.primary }]}
                      >
                        {item.quantity}x
                      </Text>
                      <View style={styles.itemDetails}>
                        <Text style={[styles.itemName, { color: colors.text }]}>
                          {item.name}
                        </Text>
                        {item.options.length > 0 && (
                          <Text
                            style={[
                              styles.itemOptions,
                              { color: colors.inactiveText },
                            ]}
                          >
                            {item.options.join(', ')}
                          </Text>
                        )}
                      </View>
                    </View>
                    <Text style={[styles.itemPrice, { color: colors.text }]}>
                      R{(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                  {index < order.items.length - 1 && (
                    <View
                      style={[
                        styles.itemDivider,
                        { backgroundColor: colors.border },
                      ]}
                    />
                  )}
                </View>
              ))}

              <View
                style={[
                  styles.summaryDivider,
                  { backgroundColor: colors.border },
                ]}
              />

              <View style={styles.summaryRow}>
                <Text
                  style={[styles.summaryLabel, { color: colors.inactiveText }]}
                >
                  Subtotal
                </Text>
                <Text style={[styles.summaryValue, { color: colors.text }]}>
                  R{order.subtotal.toFixed(2)}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text
                  style={[styles.summaryLabel, { color: colors.inactiveText }]}
                >
                  Service Fee
                </Text>
                <Text style={[styles.summaryValue, { color: colors.text }]}>
                  R{order.serviceFee.toFixed(2)}
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { color: colors.text }]}>
                  Total
                </Text>
                <Text style={[styles.totalValue, { color: colors.primary }]}>
                  R{order.total.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Help & Support
            </Text>
            <View
              style={[
                styles.supportCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.supportOption,
                  { borderBottomColor: colors.border },
                ]}
                onPress={() => {}}
              >
                <View style={styles.supportOptionContent}>
                  <MessageSquare size={20} color={colors.primary} />
                  <Text
                    style={[styles.supportOptionText, { color: colors.text }]}
                  >
                    Chat with Support
                  </Text>
                </View>
                <ChevronRight size={20} color={colors.inactiveText} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.supportOption} onPress={() => {}}>
                <View style={styles.supportOptionContent}>
                  <PhoneCall size={20} color={colors.primary} />
                  <Text
                    style={[styles.supportOptionText, { color: colors.text }]}
                  >
                    Call Restaurant
                  </Text>
                </View>
                <ChevronRight size={20} color={colors.inactiveText} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {(order.status === 'preparing' || order.status === 'ready') && (
        <View
          style={[
            styles.footer,
            { borderTopColor: colors.border, backgroundColor: colors.card },
          ]}
        >
          <Button
            title={order.status === 'ready' ? 'Order Received' : 'Cancel Order'}
            variant={order.status === 'ready' ? 'primary' : 'outline'}
            onPress={() => {}}
            fullWidth
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
  statusContainer: {
    padding: Layout.spacing.xl,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginBottom: 4,
  },
  statusDescription: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: 'white',
    textAlign: 'center',
    marginBottom: Layout.spacing.m,
  },
  estimatedTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
  },
  estimatedTime: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: 'white',
    marginLeft: Layout.spacing.s,
  },
  content: {
    padding: Layout.spacing.xl,
  },
  merchantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
    marginBottom: Layout.spacing.xl,
  },
  merchantImage: {
    width: 50,
    height: 50,
    borderRadius: Layout.borderRadius.small,
  },
  merchantInfo: {
    flex: 1,
    marginLeft: Layout.spacing.m,
  },
  merchantName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 4,
  },
  viewButton: {
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
  },
  viewButtonText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: 'white',
  },
  section: {
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: Layout.spacing.m,
  },
  detailsCard: {
    padding: Layout.spacing.l,
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.m,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: Layout.spacing.s,
    borderRadius: Layout.borderRadius.small,
  },
  statusBadgeText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: 'white',
  },
  orderItemsCard: {
    padding: Layout.spacing.l,
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: Layout.spacing.s,
  },
  orderItemMain: {
    flexDirection: 'row',
    flex: 1,
  },
  itemQuantity: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    marginRight: Layout.spacing.s,
    minWidth: 25,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 2,
  },
  itemOptions: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  itemDivider: {
    height: 1,
    marginVertical: Layout.spacing.s,
  },
  summaryDivider: {
    height: 1,
    marginVertical: Layout.spacing.m,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Layout.spacing.s,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  supportCard: {
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
  },
  supportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Layout.spacing.l,
    borderBottomWidth: 1,
  },
  supportOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportOptionText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginLeft: Layout.spacing.m,
  },
  footer: {
    padding: Layout.spacing.xl,
    borderTopWidth: 1,
  },
});
