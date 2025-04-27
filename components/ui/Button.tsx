import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/constants/Layout';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  fullWidth = false,
}: ButtonProps) {
  const { colors } = useTheme();
  
  // Determine styles based on variant and size
  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: Layout.borderRadius.medium,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };
    
    // Size styles
    switch (size) {
      case 'small':
        baseStyle.paddingVertical = 8;
        baseStyle.paddingHorizontal = 16;
        break;
      case 'large':
        baseStyle.paddingVertical = 16;
        baseStyle.paddingHorizontal = 24;
        break;
      default: // medium
        baseStyle.paddingVertical = 12;
        baseStyle.paddingHorizontal = 20;
    }
    
    // Variant styles
    switch (variant) {
      case 'secondary':
        baseStyle.backgroundColor = colors.secondary;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = colors.primary;
        break;
      case 'ghost':
        baseStyle.backgroundColor = 'transparent';
        break;
      case 'danger':
        baseStyle.backgroundColor = colors.error;
        break;
      default: // primary
        baseStyle.backgroundColor = colors.primary;
    }
    
    // Disabled state
    if (disabled) {
      baseStyle.opacity = 0.6;
    }
    
    // Full width
    if (fullWidth) {
      baseStyle.width = '100%';
    }
    
    return baseStyle;
  };
  
  // Determine text styles based on variant and size
  const getTextStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontFamily: 'Poppins-Medium',
    };
    
    // Size styles
    switch (size) {
      case 'small':
        baseStyle.fontSize = 14;
        break;
      case 'large':
        baseStyle.fontSize = 18;
        break;
      default: // medium
        baseStyle.fontSize = 16;
    }
    
    // Variant styles
    switch (variant) {
      case 'outline':
      case 'ghost':
        baseStyle.color = colors.primary;
        break;
      default: // primary, secondary, danger
        baseStyle.color = 'white';
    }
    
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'ghost' ? colors.primary : 'white'} 
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <View style={styles.iconLeft}>{icon}</View>
          )}
          <Text style={[styles.text, getTextStyles(), textStyle]}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <View style={styles.iconRight}>{icon}</View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 120,
  },
  text: {
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});