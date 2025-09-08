import { TouchableOpacity, type TouchableOpacityProps, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';

export type ThemedButtonProps = TouchableOpacityProps & {
  type?: 'orange' | 'green' | 'red' | 'grey' | 'greyLight' | 'greyDark';
  select?: 'orange' | 'green' | 'red' | 'grey' | 'greyLight' | 'greyDark';
  shape?: 'default';
  isSelected?: boolean;
};

export function ThemedSelect({
  style,
  type = 'grey',
  select = 'orange',
  shape = 'default',
  isSelected = false,
  ...rest
}: ThemedButtonProps) {
  const colorScheme = useColorScheme();
  let resolvedType = type;
  if(type === 'grey') {
    resolvedType = colorScheme === 'light' ? 'greyLight' : 'greyDark';
  }

  return (
    <TouchableOpacity
      style={[
        styles.default,
        isSelected === true ? {backgroundColor: Colors[select].background, borderColor: Colors[select].border, opacity: 0.85} : {backgroundColor: Colors[resolvedType].tint, borderColor: Colors[resolvedType].border},
        shape === 'default' ? styles.defaultShape : undefined,
        style
      ]}
      {...rest}
      onPress={rest.onPress}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    borderWidth: 4,
    borderTopWidth: 0,
    //shadow ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    //shadow android
    elevation: 5
  },
  defaultShape: {
    borderRadius: 10,
    padding: 5,
  },
});