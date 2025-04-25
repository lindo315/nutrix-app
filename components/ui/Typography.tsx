import React from 'react';
import { Text, StyleSheet, TextProps, StyleProp, TextStyle } from 'react-native';
import { Colors } from '@/constants/Colors';

type TypographyVariant = 
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'overline';

type TypographyColor = 
  | 'primary'
  | 'secondary'
  | 'white'
  | 'black'
  | 'gray'
  | 'error'
  | 'success'
  | 'warning';

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  style?: StyleProp<TextStyle>;
  bold?: boolean;
  center?: boolean;
  children: React.ReactNode;
}

export function Typography({
  variant = 'body1',
  color = 'black',
  style,
  bold = false,
  center = false,
  children,
  ...props
}: TypographyProps) {
  const variantStyle = styles[variant];
  const colorStyle = { 
    color: 
      color === 'primary' 
        ? Colors.primary[700] 
        : color === 'secondary' 
        ? Colors.secondary[500] 
        : color === 'white' 
        ? Colors.white 
        : color === 'gray' 
        ? Colors.gray[500] 
        : color === 'error' 
        ? Colors.error[500] 
        : color === 'success' 
        ? Colors.success[500] 
        : color === 'warning' 
        ? Colors.warning[500] 
        : Colors.black 
  };
  
  const fontWeightStyle = bold ? { fontWeight: 'bold' } : {};
  const textAlignStyle = center ? { textAlign: 'center' } : {};

  return (
    <Text 
      style={[variantStyle, colorStyle, fontWeightStyle, textAlignStyle, style]} 
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 36,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
  },
  button: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    textTransform: 'uppercase',
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  overline: {
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 16,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});