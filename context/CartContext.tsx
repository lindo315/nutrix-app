import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export type CartItem = {
  id: string;
  merchantId: string;
  merchantName: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  options?: string[];
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from storage on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        let storedCart;
        if (Platform.OS === 'web') {
          storedCart = localStorage.getItem('cart');
        } else {
          storedCart = await SecureStore.getItemAsync('cart');
        }
        if (storedCart) {
          setItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };
    loadCart();
  }, []);

  // Save cart to storage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        if (Platform.OS === 'web') {
          localStorage.setItem('cart', JSON.stringify(items));
        } else {
          await SecureStore.setItemAsync('cart', JSON.stringify(items));
        }
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    };
    saveCart();
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems(currentItems => {
      // Check if adding from a different merchant
      const existingMerchant = currentItems.find(item => item.merchantId && item.merchantId !== newItem.merchantId);
      
      if (existingMerchant) {
        Alert.alert(
          'Clear Cart?',
          `Your cart contains items from ${existingMerchant.merchantName}. Would you like to clear it and add items from ${newItem.merchantName}?`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Clear & Add',
              style: 'destructive',
              onPress: () => {
                setItems([{ ...newItem, quantity: 1 }]);
              },
            },
          ]
        );
        return currentItems;
      }

      // Check if item already exists
      const existingItem = currentItems.find(item => item.id === newItem.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentItems, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (itemId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(itemId);
      return;
    }
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};