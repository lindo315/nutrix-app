import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { Layout } from '@/constants/Layout';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mail, Lock } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    // Validate inputs
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setError(null);

    // In a real app, this would be replaced with actual authentication logic
    setTimeout(() => {
      setIsLoading(false);

      // For demo purposes, we'll simulate a successful login and redirect to the main app
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color={Colors.gray[800]} />
          </TouchableOpacity>
          <Typography variant="h2" style={styles.title}>
            Welcome Back
          </Typography>
          <Typography variant="body1" color="gray" style={styles.subtitle}>
            Log in to your Nutrix account
          </Typography>
        </View>

        <View style={styles.form}>
          {error && (
            <View style={styles.errorContainer}>
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            </View>
          )}

          <Input
            label="Email"
            placeholder="Enter your student email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Mail size={20} color={Colors.gray[500]} />}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            leftIcon={<Lock size={20} color={Colors.gray[500]} />}
            isPassword
          />

          <Link href="/(auth)/forgot-password">
            <Typography
              variant="body2"
              color="primary"
              style={styles.forgotPassword}
            >
              Forgot Password?
            </Typography>
          </Link>

          <Button
            variant="filled"
            size="large"
            fullWidth
            loading={isLoading}
            style={styles.loginButton}
            onPress={handleLogin}
          >
            Log In
          </Button>

          <View style={styles.registerContainer}>
            <Typography variant="body2" color="gray">
              Don't have an account?{' '}
            </Typography>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity>
                <Typography variant="body2" color="primary" bold>
                  Register
                </Typography>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Layout.spacing.xl,
  },
  header: {
    marginBottom: Layout.spacing.xl,
  },
  backButton: {
    marginBottom: Layout.spacing.lg,
  },
  title: {
    marginBottom: Layout.spacing.sm,
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    marginBottom: Layout.spacing.lg,
  },
  form: {
    flex: 1,
  },
  errorContainer: {
    backgroundColor: Colors.error[50],
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.sm,
    marginBottom: Layout.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.error[500],
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: Layout.spacing.xl,
  },
  loginButton: {
    marginBottom: Layout.spacing.lg,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Layout.spacing.lg,
  },
});
