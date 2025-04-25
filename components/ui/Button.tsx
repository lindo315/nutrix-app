import React from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  TouchableOpacityProps, 
  ActivityIndicator, 
  View, 
  StyleProp, 
  ViewStyle 
} from 'react-native';
import { Typography } from './Typography';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

type ButtonVariant = 'filled' | 'outlined' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export function Button({
  variant = 'filled',
  size = 'medium',
  color = 'primary',
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  
  // Determine variant-specific styles
  const getVariantStyle = () => {
    if (variant === 'filled') {
      return {
        backgroundColor: Colors[color][isDisabled ? 300 : 500],
        borderWidth: 0,
      };
    } else if (variant === 'outlined') {
      return {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors[color][isDisabled ? 300 : 500],
      };
    } else {
      return {
        backgroundColor: 'transparent',
        borderWidth: 0,
      };
    }
  };
  
  // Determine size-specific styles
  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: Layout.spacing.xs,
          paddingHorizontal: Layout.spacing.md,
          borderRadius: Layout.borderRadius.sm,
        };
      case 'large':
        return {
          paddingVertical: Layout.spacing.md,
          paddingHorizontal: Layout.spacing.xl,
          borderRadius: Layout.borderRadius.md,
        };
      default: // 'medium'
        return {
          paddingVertical: Layout.spacing.sm,
          paddingHorizontal: Layout.spacing.lg,
          borderRadius: Layout.borderRadius.sm,
        };
    }
  };
  
  // Determine text color based on variant and button color
  const getTextColor = () => {
    if (variant === 'filled') {
      return 'white';
    } else {
      return color;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyle(),
        getSizeStyle(),
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      <View style={styles.contentContainer}>
        {leftIcon && !loading && (
          <View style={styles.iconContainer}>{leftIcon}</View>
        )}
        
        {loading ? (
          <ActivityIndicator 
            size="small" 
            color={variant === 'filled' ? Colors.white : Colors[color][500]} 
          />
        ) : (
          <Typography 
            variant="button" 
            color={getTextColor()}
            style={isDisabled && variant !== 'filled' ? { color: Colors.gray[400] } : {}}
          >
            {children}
          </Typography>
        )}
        
        {rightIcon && !loading && (
          <View style={styles.iconContainer}>{rightIcon}</View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.7,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginHorizontal: Layout.spacing.xs,
  },
});