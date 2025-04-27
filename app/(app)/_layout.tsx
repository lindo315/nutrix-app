import React from 'react';
import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="merchant/[id]" 
        options={{
          headerShown: true,
          headerTitle: 'Merchant',
          headerBackTitle: 'Back',
        }} 
      />
      <Stack.Screen 
        name="food/[id]" 
        options={{
          headerShown: true,
          headerTitle: 'Food Details',
          headerBackTitle: 'Back',
        }} 
      />
      <Stack.Screen 
        name="order/[id]" 
        options={{
          headerShown: true,
          headerTitle: 'Order Details',
          headerBackTitle: 'Back',
        }} 
      />
      <Stack.Screen 
        name="checkout" 
        options={{
          headerShown: true,
          headerTitle: 'Checkout',
          headerBackTitle: 'Back',
        }} 
      />
    </Stack>
  );
}