import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Link, router } from 'expo-router';
import { AtSign, Lock } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Layout from '@/constants/Layout';
import * as LocalAuthentication from 'expo-local-authentication';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { colors } = useTheme();

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!email.endsWith('@students.wits.ac.za')) {
      setEmailError('Must be a valid Wits University student email');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleBiometricAuth = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Biometric authentication is not available on web');
      return;
    }

    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert('Biometric authentication not available on this device');
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert(
          'No biometrics found',
          'Please set up biometric authentication in your device settings'
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to Nitro',
        fallbackLabel: 'Use password',
      });

      if (result.success) {
        // In a real app, this would validate with backend
        // For demo, we'll just log in with a test account
        setLoading(true);
        try {
          await signIn('test.student@students.wits.ac.za', 'password123');
          router.replace('/(app)/(tabs)');
        } catch (error: any) {
          Alert.alert('Error', error.message || 'Failed to authenticate');
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Biometric error:', error);
      Alert.alert(
        'Authentication error',
        'Please try again or use your password'
      );
    }
  };

  const handleLogin = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      router.replace('/(app)/(tabs)');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <ImageBackground
        source={{
          uri: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
        }}
        style={styles.header}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Nutrix</Text>
          <Text style={styles.subtitle}>Food ordering for Wits students</Text>
        </View>
      </ImageBackground>

      <View style={styles.formContainer}>
        <Text style={[styles.formTitle, { color: colors.text }]}>Log In</Text>

        <Input
          label="Email"
          placeholder="student@students.wits.ac.za"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={<AtSign size={20} color={colors.inactiveText} />}
          error={emailError}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secure
          leftIcon={<Lock size={20} color={colors.inactiveText} />}
          error={passwordError}
        />

        <Link href="/(auth)/forgot-password" asChild>
          <TouchableOpacity>
            <Text style={[styles.forgotPassword, { color: colors.primary }]}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </Link>

        <Button
          title="Login"
          onPress={handleLogin}
          style={styles.button}
          loading={loading}
          fullWidth
        />

        {Platform.OS !== 'web' && (
          <Button
            title="Login with Biometrics"
            onPress={handleBiometricAuth}
            variant="outline"
            style={styles.biometricButton}
            fullWidth
          />
        )}

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.inactiveText }]}>
            Don't have an account?
          </Text>
          <Link href="/(auth)/register" asChild>
            <TouchableOpacity>
              <Text style={[styles.registerLink, { color: colors.primary }]}>
                {' '}
                Sign Up
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    height: 250,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: 'white',
  },
  formContainer: {
    padding: Layout.spacing.xl,
  },
  formTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: Layout.spacing.l,
  },
  forgotPassword: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'right',
    marginTop: -Layout.spacing.s,
    marginBottom: Layout.spacing.m,
  },
  button: {
    marginTop: Layout.spacing.s,
    marginBottom: Layout.spacing.m,
  },
  biometricButton: {
    marginBottom: Layout.spacing.l,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Layout.spacing.m,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  registerLink: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
});
