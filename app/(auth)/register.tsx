import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Link, router } from 'expo-router';
import { AtSign, Lock, User, ArrowLeft } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Layout from '@/constants/Layout';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { colors } = useTheme();

  const validate = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!email.endsWith('@students.wits.ac.za')) {
      newErrors.email = 'Must be a valid Wits University student email';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await signUp(email, password);
      Alert.alert(
        'Registration Successful',
        'Please check your email for verification',
        [{ text: 'OK', onPress: () => router.replace('/(app)/(tabs)') }]
      );
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message || 'Please try again');
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
        <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
      </View>

      <View style={styles.formContainer}>
        <Input
          label="Full Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          leftIcon={<User size={20} color={colors.inactiveText} />}
          error={errors.name}
        />
        
        <Input
          label="Email"
          placeholder="student@students.wits.ac.za"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={<AtSign size={20} color={colors.inactiveText} />}
          error={errors.email}
        />
        
        <Input
          label="Password"
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secure
          leftIcon={<Lock size={20} color={colors.inactiveText} />}
          error={errors.password}
        />
        
        <Input
          label="Confirm Password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secure
          leftIcon={<Lock size={20} color={colors.inactiveText} />}
          error={errors.confirmPassword}
        />

        <View style={styles.termsContainer}>
          <Text style={[styles.termsText, { color: colors.inactiveText }]}>
            By signing up, you agree to our{' '}
            <Text style={[styles.termsLink, { color: colors.primary }]}>
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text style={[styles.termsLink, { color: colors.primary }]}>
              Privacy Policy
            </Text>
          </Text>
        </View>

        <Button
          title="Sign Up"
          onPress={handleRegister}
          style={styles.button}
          loading={loading}
          fullWidth
        />

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.inactiveText }]}>
            Already have an account?
          </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text style={[styles.loginLink, { color: colors.primary }]}>
                {' '}Log In
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
  formContainer: {
    flex: 1,
  },
  termsContainer: {
    marginBottom: Layout.spacing.l,
  },
  termsText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 20,
  },
  termsLink: {
    fontFamily: 'Montserrat-SemiBold',
  },
  button: {
    marginBottom: Layout.spacing.l,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  loginLink: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
});