import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Minus, Plus } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import Layout from '@/constants/Layout';
import Button from '@/components/ui/Button';

// Mock food item data
const foodItems = {
  item1: {
    id: 'item1',
    merchantId: '1',
    merchantName: `Jimmy's`,
    name: 'Breakfast Wrap',
    description:
      'Scrambled eggs, bacon, cheese, and avocado in a tortilla wrap. Our signature breakfast option made with free-range eggs and locally sourced ingredients.',
    price: 45.0,
    image:
      'https://images.pexels.com/photos/12662875/pexels-photo-12662875.jpeg',
    options: [
      {
        id: 'protein',
        name: 'Protein',
        type: 'radio',
        required: true,
        choices: [
          { id: 'bacon', name: 'Bacon', price: 0 },
          { id: 'chicken', name: 'Grilled Chicken', price: 5 },
          { id: 'tofu', name: 'Tofu (V)', price: 0 },
        ],
      },
      {
        id: 'extras',
        name: 'Extras',
        type: 'checkbox',
        required: false,
        choices: [
          { id: 'cheese', name: 'Extra Cheese', price: 8 },
          { id: 'avocado', name: 'Extra Avocado', price: 12 },
          { id: 'sauce', name: 'Spicy Sauce', price: 5 },
        ],
      },
    ],
  },
  item2: {
    id: 'item2',
    name: 'Chicken Avocado Sandwich',
    description:
      'Grilled chicken, avocado, lettuce, and mayo on ciabatta. Made with tender, marinated chicken breast and ripe avocados.',
    price: 55.0,
    image: 'https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg',
    options: [
      {
        id: 'bread',
        name: 'Bread Type',
        type: 'radio',
        required: true,
        choices: [
          { id: 'ciabatta', name: 'Ciabatta', price: 0 },
          { id: 'wholewheat', name: 'Whole Wheat', price: 0 },
          { id: 'gluten-free', name: 'Gluten Free', price: 10 },
        ],
      },
      {
        id: 'extras',
        name: 'Extras',
        type: 'checkbox',
        required: false,
        choices: [
          { id: 'cheese', name: 'Cheese', price: 8 },
          { id: 'bacon', name: 'Bacon', price: 15 },
          { id: 'egg', name: 'Fried Egg', price: 8 },
        ],
      },
    ],
  },
};

export default function FoodDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string | string[]>
  >({});

  // Get item data
  const item = foodItems[id as keyof typeof foodItems];

  if (!item) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Item not found</Text>
      </View>
    );
  }

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const selectOption = (optionId: string, choiceId: string, type: string) => {
    if (type === 'radio') {
      setSelectedOptions((prev) => ({
        ...prev,
        [optionId]: choiceId,
      }));
    } else {
      // For checkboxes
      setSelectedOptions((prev) => {
        const currentSelections = (prev[optionId] as string[]) || [];
        if (currentSelections.includes(choiceId)) {
          return {
            ...prev,
            [optionId]: currentSelections.filter((id) => id !== choiceId),
          };
        } else {
          return {
            ...prev,
            [optionId]: [...currentSelections, choiceId],
          };
        }
      });
    }
  };

  const isOptionSelected = (
    optionId: string,
    choiceId: string,
    type: string
  ) => {
    if (type === 'radio') {
      return selectedOptions[optionId] === choiceId;
    } else {
      const selections = (selectedOptions[optionId] as string[]) || [];
      return selections.includes(choiceId);
    }
  };

  const calculateTotalPrice = () => {
    let total = item.price;

    if (item.options) {
      item.options.forEach((option) => {
        if (option.type === 'radio') {
          const selectedChoice = option.choices.find(
            (c) => c.id === selectedOptions[option.id]
          );
          if (selectedChoice) {
            total += selectedChoice.price;
          }
        } else {
          const selections = (selectedOptions[option.id] as string[]) || [];
          selections.forEach((selectionId) => {
            const choice = option.choices.find((c) => c.id === selectionId);
            if (choice) {
              total += choice.price;
            }
          });
        }
      });
    }

    return total * quantity;
  };

  const getSelectedOptionsText = () => {
    const options: string[] = [];

    if (item.options) {
      item.options.forEach((option) => {
        if (option.type === 'radio') {
          const selectedChoice = option.choices.find(
            (c) => c.id === selectedOptions[option.id]
          );
          if (selectedChoice) {
            options.push(selectedChoice.name);
          }
        } else {
          const selections = (selectedOptions[option.id] as string[]) || [];
          selections.forEach((selectionId) => {
            const choice = option.choices.find((c) => c.id === selectionId);
            if (choice) {
              options.push(choice.name);
            }
          });
        }
      });
    }

    return options;
  };

  const handleAddToCart = () => {
    // Check if required options are selected
    const missingRequired = item.options?.find(
      (option) => option.required && !selectedOptions[option.id]
    );

    if (missingRequired) {
      Alert.alert('Required Option', `Please select a ${missingRequired.name}`);
      return;
    }

    const cartItem = {
      id: item.id,
      merchantId: item.merchantId,
      merchantName: item.merchantName,
      name: item.name,
      price: calculateTotalPrice() / quantity, // Price per item including options
      quantity,
      image: item.image,
      options: getSelectedOptionsText(),
    };

    addItem(cartItem);
    router.push('/cart');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView>
        <Image source={{ uri: item.image }} style={styles.image} />

        <View style={styles.content}>
          <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.price, { color: colors.primary }]}>
            R{item.price.toFixed(2)}
          </Text>
          <Text style={[styles.description, { color: colors.inactiveText }]}>
            {item.description}
          </Text>

          <View style={styles.quantityContainer}>
            <Text style={[styles.quantityLabel, { color: colors.text }]}>
              Quantity
            </Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                onPress={decrementQuantity}
                style={[
                  styles.quantityButton,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.highlightBackground,
                  },
                ]}
                disabled={quantity <= 1}
              >
                <Minus
                  size={16}
                  color={quantity <= 1 ? colors.inactiveText : colors.text}
                />
              </TouchableOpacity>

              <Text style={[styles.quantity, { color: colors.text }]}>
                {quantity}
              </Text>

              <TouchableOpacity
                onPress={incrementQuantity}
                style={[
                  styles.quantityButton,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.highlightBackground,
                  },
                ]}
              >
                <Plus size={16} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {item.options?.map((option) => (
            <View key={option.id} style={styles.optionSection}>
              <Text style={[styles.optionTitle, { color: colors.text }]}>
                {option.name}{' '}
                {option.required && (
                  <Text style={{ color: colors.error }}>*</Text>
                )}
              </Text>

              {option.choices.map((choice) => (
                <TouchableOpacity
                  key={choice.id}
                  style={[
                    styles.choiceItem,
                    {
                      borderColor: colors.border,
                      backgroundColor: isOptionSelected(
                        option.id,
                        choice.id,
                        option.type
                      )
                        ? colors.highlightBackground
                        : colors.card,
                    },
                  ]}
                  onPress={() =>
                    selectOption(option.id, choice.id, option.type)
                  }
                >
                  <View style={styles.choiceContent}>
                    <View
                      style={[
                        styles.choiceCheckbox,
                        {
                          borderColor: isOptionSelected(
                            option.id,
                            choice.id,
                            option.type
                          )
                            ? colors.primary
                            : colors.border,
                          backgroundColor: isOptionSelected(
                            option.id,
                            choice.id,
                            option.type
                          )
                            ? colors.primary
                            : 'transparent',
                        },
                      ]}
                    >
                      {isOptionSelected(option.id, choice.id, option.type) && (
                        <View style={styles.choiceCheckboxInner} />
                      )}
                    </View>

                    <Text style={[styles.choiceName, { color: colors.text }]}>
                      {choice.name}
                    </Text>
                  </View>

                  {choice.price > 0 && (
                    <Text
                      style={[
                        styles.choicePrice,
                        { color: colors.inactiveText },
                      ]}
                    >
                      +R{choice.price.toFixed(2)}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}

          <View style={styles.specialInstructionsContainer}>
            <Text
              style={[styles.specialInstructionsLabel, { color: colors.text }]}
            >
              Special Instructions (Optional)
            </Text>
            <TouchableOpacity
              style={[
                styles.specialInstructionsButton,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.highlightBackground,
                },
              ]}
            >
              <Text
                style={[
                  styles.specialInstructionsText,
                  { color: colors.inactiveText },
                ]}
              >
                Add notes (allergies, special requests, etc.)
              </Text>
            </TouchableOpacity>
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
          <Text style={[styles.totalLabel, { color: colors.inactiveText }]}>
            Total:
          </Text>
          <Text style={[styles.totalPrice, { color: colors.primary }]}>
            R{calculateTotalPrice().toFixed(2)}
          </Text>
        </View>

        <Button title="Add to Cart" onPress={handleAddToCart} fullWidth />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: Layout.spacing.xl,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: Layout.spacing.m,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 24,
    marginBottom: Layout.spacing.xl,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.xl,
  },
  quantityLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: Layout.borderRadius.small,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  quantity: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginHorizontal: Layout.spacing.m,
    minWidth: 20,
    textAlign: 'center',
  },
  optionSection: {
    marginBottom: Layout.spacing.xl,
  },
  optionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: Layout.spacing.m,
  },
  choiceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Layout.spacing.m,
    paddingHorizontal: Layout.spacing.l,
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
    marginBottom: Layout.spacing.s,
  },
  choiceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  choiceCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: Layout.spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
  },
  choiceCheckboxInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  choiceName: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  choicePrice: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  specialInstructionsContainer: {
    marginBottom: Layout.spacing.xl,
  },
  specialInstructionsLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: Layout.spacing.s,
  },
  specialInstructionsButton: {
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
  },
  specialInstructionsText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  footer: {
    padding: Layout.spacing.xl,
    borderTopWidth: 1,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  totalPrice: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
  },
});
