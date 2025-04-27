import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold
} from '@expo-google-fonts/montserrat';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { OrderProvider } from '@/context/OrderContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@/context/ThemeContext';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
    'Montserrat-Regular': Montserrat_400Regular,
    'Montserrat-Medium': Montserrat_500Medium,
    'Montserrat-SemiBold': Montserrat_600SemiBold,
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(app)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
              </Stack>
              <StatusBar style="auto" />
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}