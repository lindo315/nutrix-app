import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/constants/Layout';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
  secure?: boolean;
}

export default function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  secure = false,
  style,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secure);
  const { colors } = useTheme();

  const handleFocus = () => {
    setIsFocused(true);
    props.onFocus && props.onFocus(null as any);
  };

  const handleBlur = () => {
    setIsFocused(false);
    props.onBlur && props.onBlur(null as any);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text
          style={[
            styles.label,
            { color: colors.text },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
      
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? colors.error
              : isFocused
              ? colors.primary
              : colors.border,
            backgroundColor: colors.background,
          },
          style,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              fontFamily: 'Montserrat-Regular',
            },
            inputStyle,
          ]}
          placeholderTextColor={colors.placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secure && !isPasswordVisible}
          {...props}
        />
        
        {secure ? (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.rightIcon}
          >
            {isPasswordVisible ? (
              <Eye size={20} color={colors.inactiveText} />
            ) : (
              <EyeOff size={20} color={colors.inactiveText} />
            )}
          </TouchableOpacity>
        ) : (
          rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>
        )}
      </View>
      
      {error && (
        <Text
          style={[
            styles.error,
            { color: colors.error },
            errorStyle,
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing.m,
    width: '100%',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontFamily: 'Montserrat-Medium',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: Layout.borderRadius.medium,
    paddingHorizontal: Layout.spacing.m,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  leftIcon: {
    marginRight: Layout.spacing.s,
  },
  rightIcon: {
    marginLeft: Layout.spacing.s,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Montserrat-Regular',
  },
});