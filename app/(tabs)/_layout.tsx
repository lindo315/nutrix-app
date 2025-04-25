import React from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { 
  Home, 
  Clock, 
  User, 
  ShoppingBag, 
  Search 
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  const getTabBarIcon = (focused: boolean, route: string) => {
    const color = focused ? Colors.primary[700] : Colors.gray[400];
    const size = 24;
    
    switch (route) {
      case 'index':
        return <Home size={size} color={color} />;
      case 'search':
        return <Search size={size} color={color} />;
      case 'orders':
        return <Clock size={size} color={color} />;
      case 'cart':
        return <ShoppingBag size={size} color={color} />;
      case 'profile':
        return <User size={size} color={color} />;
      default:
        return <Home size={size} color={color} />;
    }
  };
  
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.primary[700],
        tabBarInactiveTintColor: Colors.gray[400],
        tabBarStyle: [
          styles.tabBar,
          { height: 60 + insets.bottom, paddingBottom: insets.bottom },
        ],
        tabBarItemStyle: styles.tabBarItem,
        tabBarIcon: ({ focused }) => getTabBarIcon(focused, route.name),
        tabBarLabelStyle: styles.tabBarLabel,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Explore',
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopColor: Colors.gray[200],
    elevation: 10,
    shadowColor: Colors.gray[900],
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabBarItem: {
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});