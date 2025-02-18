import { TextInput, type TextInputProps, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';

export type InputProps = TextInputProps & {
  type?: 'orange' | 'grey';
  shape?: 'default';
};

export function ThemedInput({
  type = 'orange',
  shape = 'default',
  ...rest
}: InputProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TextInput
      style={[
        styles.default,
        {backgroundColor: Colors[type].tint, borderColor: Colors[type].border},
        isPressed === false ? undefined : {opacity: 0.85},
        shape === 'default' ? styles.defaultShape : undefined,
      ]}
      {...rest}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 20,
    borderWidth: 4,
    borderTopWidth: 0,
    alignItems: 'center',
    //shadow ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    //shadow android
    elevation: 5
  },
  defaultShape: {
    borderRadius: 8,
    padding: 5,
  },
});