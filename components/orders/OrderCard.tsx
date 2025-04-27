import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Clock, MapPin, ExternalLink } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/constants/Layout';

interface OrderCardProps {
  order: {
    id: string;
    merchantName: string;
    items: number;
    total: number;
    status: 'preparing' | 'ready' | 'completed' | 'cancelled';
    date: string;
    estimatedPickup?: string;
    location: string;
  };
  onPress: (id: string) => void;
}

export default function OrderCard({ order, onPress }: OrderCardProps) {
  const { colors } = useTheme();
  
  // Get status color based on order status
  const getStatusColor = () => {
    switch (order.status) {
      case 'preparing':
        return colors.warning;
      case 'ready':
        return colors.accent;
      case 'completed':
        return colors.success;
      case 'cancelled':
        return colors.error;
      default:
        return colors.inactiveText;
    }
  };
  
  // Format status text
  const getStatusText = () => {
    switch (order.status) {
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready for pickup';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return order.status;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { borderColor: colors.border, backgroundColor: colors.card }]}
      activeOpacity={0.7}
      onPress={() => onPress(order.id)}
    >
      <View style={styles.header}>
        <Text style={[styles.merchantName, { color: colors.text }]}>
          {order.merchantName}
        </Text>
        <ExternalLink size={18} color={colors.primary} />
      </View>
      
      <View style={styles.infoRow}>
        <View style={styles.orderInfo}>
          <Text style={[styles.infoLabel, { color: colors.inactiveText }]}>
            Order #{order.id.slice(-4)}
          </Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>
            {order.items} {order.items === 1 ? 'item' : 'items'} · R{order.total.toFixed(2)}
          </Text>
        </View>
        
        <View style={styles.orderInfo}>
          <Text style={[styles.infoLabel, { color: colors.inactiveText }]}>Date</Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>{order.date}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.footer}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{getStatusText()}</Text>
        </View>
        
        {order.status === 'preparing' && order.estimatedPickup && (
          <View style={styles.timeContainer}>
            <Clock size={14} color={colors.inactiveText} />
            <Text style={[styles.timeText, { color: colors.inactiveText }]}>
              Ready in {order.estimatedPickup}
            </Text>
          </View>
        )}
        
        {(order.status === 'preparing' || order.status === 'ready') && (
          <View style={styles.locationContainer}>
            <MapPin size={14} color={colors.inactiveText} />
            <Text style={[styles.locationText, { color: colors.inactiveText }]}>
              {order.location}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
    marginBottom: Layout.spacing.m,
    padding: Layout.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  merchantName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.m,
  },
  orderInfo: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: Layout.spacing.m,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.small,
    marginRight: Layout.spacing.m,
    marginBottom: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
    marginLeft: 4,
    fontFamily: 'Montserrat-Regular',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    marginLeft: 4,
    fontFamily: 'Montserrat-Regular',
  },
});