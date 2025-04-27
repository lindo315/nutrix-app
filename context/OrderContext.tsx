import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export type OrderStatus = 'preparing' | 'ready' | 'completed' | 'cancelled';

export type Order = {
  id: string;
  merchantId: string;
  merchantName: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    options?: string[];
  }[];
  status: OrderStatus;
  total: number;
  date: string;
  estimatedPickup?: string;
  location: string;
};

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from storage on mount
  useEffect(() => {
    const loadOrders = async () => {
      try {
        let storedOrders;
        if (Platform.OS === 'web') {
          storedOrders = localStorage.getItem('orders');
        } else {
          storedOrders = await SecureStore.getItemAsync('orders');
        }
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
        }
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    };
    loadOrders();
  }, []);

  // Save orders to storage whenever they change
  useEffect(() => {
    const saveOrders = async () => {
      try {
        if (Platform.OS === 'web') {
          localStorage.setItem('orders', JSON.stringify(orders));
        } else {
          await SecureStore.setItemAsync('orders', JSON.stringify(orders));
        }
      } catch (error) {
        console.error('Error saving orders:', error);
      }
    };
    saveOrders();
  }, [orders]);

  const addOrder = (newOrder: Order) => {
    setOrders(currentOrders => [newOrder, ...currentOrders]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(currentOrders =>
      currentOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};