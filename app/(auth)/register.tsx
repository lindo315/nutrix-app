import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { Layout } from '@/constants/Layout';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mail, Lock, User, Hash } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = () => {
    // Basic validation
    if (!name || !email || !studentId || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Validate student email domain
    if (!email.endsWith('@students.wits.ac.za')) {
      setError('Please use your Wits student email (@students.wits.ac.za)');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    // In a real app, this would be replaced with actual registration logic
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, navigate to verification screen
      router.push('/(auth)/verification');
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
            Create Account
          </Typography>
          <Typography variant="body1" color="gray" style={styles.subtitle}>
            Sign up to order food on campus
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
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
            leftIcon={<User size={20} color={Colors.gray[500]} />}
          />
          
          <Input
            label="Student Email"
            placeholder="your.name@students.wits.ac.za"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Mail size={20} color={Colors.gray[500]} />}
          />
          
          <Input
            label="Student ID"
            placeholder="Enter your student ID"
            value={studentId}
            onChangeText={setStudentId}
            keyboardType="numeric"
            leftIcon={<Hash size={20} color={Colors.gray[500]} />}
          />
          
          <Input
            label="Password"
            placeholder="Create a secure password"
            value={password}
            onChangeText={setPassword}
            leftIcon={<Lock size={20} color={Colors.gray[500]} />}
            isPassword
          />
          
          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            leftIcon={<Lock size={20} color={Colors.gray[500]} />}
            isPassword
          />
          
          <Button
            variant="filled"
            size="large"
            fullWidth
            loading={isLoading}
            style={styles.registerButton}
            onPress={handleRegister}
          >
            Register
          </Button>
          
          <View style={styles.loginContainer}>
            <Typography variant="body2" color="gray">
              Already have an account?{' '}
            </Typography>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Typography variant="body2" color="primary" bold>
                  Log In
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
  registerButton: {
    marginVertical: Layout.spacing.lg,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Layout.spacing.sm,
  },
});