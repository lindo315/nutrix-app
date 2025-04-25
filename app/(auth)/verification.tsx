import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Mail } from 'lucide-react-native';

export default function VerificationScreen() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const inputRefs = React.useRef<Array<TextInput | null>>([]);
  
  // Mock email address
  const email = 's.smith@students.wits.ac.za';
  
  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [timer]);
  
  // Handle code input change
  const handleCodeChange = (text: string, index: number) => {
    // Update the current input value
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    
    // If input has a value and there's a next input, focus it
    if (text && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  // Handle backspace key press
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      // If current input is empty and backspace is pressed, focus the previous input
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  // Resend verification code
  const handleResendCode = () => {
    setTimer(60);
    // In a real app, there would be a call to resend the verification code
  };
  
  // Verify the entered code
  const handleVerify = () => {
    const fullCode = code.join('');
    
    if (fullCode.length !== 4) {
      setError('Please enter the complete 4-digit code');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    // In a real app, this would verify the code with a backend service
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, simulate successful verification
      router.replace('/(tabs)');
    }, 1500);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={Colors.gray[800]} />
        </TouchableOpacity>
        <Typography variant="h2" style={styles.title}>
          Verification
        </Typography>
        <Typography variant="body1" color="gray" style={styles.subtitle}>
          Enter the 4-digit code sent to your email
        </Typography>
      </View>
      
      <View style={styles.emailContainer}>
        <Mail size={20} color={Colors.primary[500]} style={styles.emailIcon} />
        <Typography variant="body2" color="gray">
          Code sent to:{' '}
        </Typography>
        <Typography variant="body2" color="primary" bold>
          {email}
        </Typography>
      </View>
      
      {error && (
        <View style={styles.errorContainer}>
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        </View>
      )}
      
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            value={digit}
            onChangeText={text => handleCodeChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            ref={ref => (inputRefs.current[index] = ref)}
            selectionColor={Colors.primary[500]}
          />
        ))}
      </View>
      
      <Button
        variant="filled"
        size="large"
        fullWidth
        loading={isLoading}
        style={styles.verifyButton}
        onPress={handleVerify}
      >
        Verify
      </Button>
      
      <View style={styles.resendContainer}>
        <Typography variant="body2" color="gray">
          Didn't receive the code?{' '}
        </Typography>
        {timer > 0 ? (
          <Typography variant="body2" color="gray">
            Resend in {timer}s
          </Typography>
        ) : (
          <TouchableOpacity onPress={handleResendCode}>
            <Typography variant="body2" color="primary" bold>
              Resend Code
            </Typography>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
    marginBottom: Layout.spacing.xl,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
    backgroundColor: Colors.primary[50],
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.sm,
  },
  emailIcon: {
    marginRight: Layout.spacing.sm,
  },
  errorContainer: {
    backgroundColor: Colors.error[50],
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.sm,
    marginBottom: Layout.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.error[500],
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.xl,
  },
  codeInput: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: Layout.borderRadius.sm,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary[700],
  },
  verifyButton: {
    marginBottom: Layout.spacing.xl,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});