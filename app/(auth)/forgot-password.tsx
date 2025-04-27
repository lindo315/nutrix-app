import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { AtSign, ArrowLeft } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Layout from '@/constants/Layout';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const { forgotPassword } = useAuth();
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

  const handleResetPassword = async () => {
    if (!validateEmail(email)) return;

    setLoading(true);
    try {
      await forgotPassword(email);
      setResetSent(true);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Forgot Password</Text>
      </View>

      <View style={styles.content}>
        {!resetSent ? (
          <>
            <Text style={[styles.description, { color: colors.inactiveText }]}>
              Enter your email address and we'll send you a link to reset your password.
            </Text>
            
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
            
            <Button
              title="Send Reset Link"
              onPress={handleResetPassword}
              style={styles.button}
              loading={loading}
              fullWidth
            />
          </>
        ) : (
          <View style={styles.successContainer}>
            <Text style={[styles.successTitle, { color: colors.success }]}>
              Reset Email Sent!
            </Text>
            <Text style={[styles.successText, { color: colors.inactiveText }]}>
              We've sent a password reset link to {email}. Please check your inbox and follow the instructions.
            </Text>
            <Button
              title="Back to Login"
              onPress={() => router.replace('/(auth)/login')}
              style={styles.backToLoginButton}
              fullWidth
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: Layout.spacing.xl,
  },
  header: {
    marginBottom: Layout.spacing.xl,
  },
  backButton: {
    marginBottom: Layout.spacing.m,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
  },
  content: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    marginBottom: Layout.spacing.xl,
    lineHeight: 24,
  },
  button: {
    marginTop: Layout.spacing.m,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.m,
  },
  successTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: Layout.spacing.m,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Layout.spacing.xl,
  },
  backToLoginButton: {
    marginTop: Layout.spacing.l,
  },
});