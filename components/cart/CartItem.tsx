import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Minus, Plus, Trash } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/constants/Layout';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    options?: string[];
  };
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { borderColor: colors.border, backgroundColor: colors.card },
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
            {item.name}
          </Text>
          <TouchableOpacity
            onPress={() => onRemove(item.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Trash size={16} color={colors.error} />
          </TouchableOpacity>
        </View>

        {item.options && item.options.length > 0 && (
          <Text style={[styles.options, { color: colors.inactiveText }]}>
            {item.options.join(', ')}
          </Text>
        )}

        <View style={styles.footer}>
          <Text style={[styles.price, { color: colors.primary }]}>
            R{(item.price * item.quantity).toFixed(2)}
          </Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => onDecrement(item.id)}
              style={[
                styles.quantityButton,
                { borderColor: colors.border, backgroundColor: colors.highlightBackground },
              ]}
            >
              <Minus size={14} color={colors.text} />
            </TouchableOpacity>

            <Text style={[styles.quantity, { color: colors.text }]}>
              {item.quantity}
            </Text>

            <TouchableOpacity
              onPress={() => onIncrement(item.id)}
              style={[
                styles.quantityButton,
                { borderColor: colors.border, backgroundColor: colors.highlightBackground },
              ]}
            >
              <Plus size={14} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
    marginBottom: Layout.spacing.m,
    padding: Layout.spacing.s,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: Layout.borderRadius.small,
  },
  contentContainer: {
    flex: 1,
    marginLeft: Layout.spacing.m,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 2,
    flex: 1,
    marginRight: Layout.spacing.s,
  },
  options: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginBottom: Layout.spacing.s,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: Layout.borderRadius.small,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  quantity: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginHorizontal: Layout.spacing.s,
    width: 20,
    textAlign: 'center',
  },
});