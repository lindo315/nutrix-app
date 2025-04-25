import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TextInputProps, 
  TouchableOpacity 
} from 'react-native';
import { Typography } from './Typography';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  isPassword?: boolean;
}

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  fullWidth = true,
  isPassword = false,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(!isPassword);
  
  const hasError = !!error;
  
  const getBorderColor = () => {
    if (hasError) return Colors.error[500];
    if (isFocused) return Colors.primary[500];
    return Colors.gray[300];
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };
  
  const passwordIcon = passwordVisible ? (
    <EyeOff size={20} color={Colors.gray[500]} />
  ) : (
    <Eye size={20} color={Colors.gray[500]} />
  );

  return (
    <View style={[styles.container, fullWidth && styles.fullWidth]}>
      {label && (
        <Typography variant="subtitle2" color="gray" style={styles.label}>
          {label}
        </Typography>
      )}
      
      <View 
        style={[
          styles.inputContainer,
          { borderColor: getBorderColor() },
          isFocused && styles.focusedInput,
          hasError && styles.errorInput,
        ]}
      >
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.gray[400]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !passwordVisible}
          {...props}
        />
        
        {isPassword ? (
          <TouchableOpacity 
            onPress={togglePasswordVisibility} 
            style={styles.iconContainer}
          >
            {passwordIcon}
          </TouchableOpacity>
        ) : (
          rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>
        )}
      </View>
      
      {hasError && (
        <Typography variant="caption" color="error" style={styles.errorText}>
          {error}
        </Typography>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing.md,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    marginBottom: Layout.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: Layout.borderRadius.sm,
    backgroundColor: Colors.white,
    paddingHorizontal: Layout.spacing.md,
  },
  input: {
    flex: 1,
    paddingVertical: Layout.spacing.md,
    color: Colors.gray[900],
    fontSize: 16,
  },
  iconContainer: {
    marginHorizontal: Layout.spacing.xs,
  },
  focusedInput: {
    borderColor: Colors.primary[500],
  },
  errorInput: {
    borderColor: Colors.error[500],
  },
  errorText: {
    marginTop: Layout.spacing.xs,
  },
});