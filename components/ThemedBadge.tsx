import { View, type ViewProps, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';

export type BadgeProps = ViewProps & {
  type?: 'orange' | 'green' | 'red' | 'grey';
  shape?: 'default';
};

export function ThemedBadge({
  style,
  type = 'orange',
  shape = 'default',
  ...rest
}: BadgeProps) {

  return (
    <View
      style={[
        styles.default,
        {backgroundColor: Colors[type].tint, borderColor: Colors[type].border},
        shape === 'default' ? styles.defaultShape : undefined,
        style
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    borderWidth: 4,
    borderTopWidth: 0,
    alignItems: 'center',
  },
  defaultShape: {
    borderRadius: 10,
    padding: 5,
  },
});