import { TextInput, type TextInputProps, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';

export type InputProps = TextInputProps & {
  type?: 'orange' | 'grey' | 'greyLight' | 'greyDark';
  shape?: 'default';
};

export function ThemedInput({
  style,
  type = 'orange',
  shape = 'default',
  ...rest
}: InputProps) {
  const [isPressed, setIsPressed] = useState(false);
  if(type === 'grey') {
    const colorScheme = useColorScheme();
    if(colorScheme === 'light') {
      type = 'greyLight';
    } else {
      type = 'greyDark';
    }
  }

  return (
    <TextInput
      style={[
        styles.default,
        {backgroundColor: Colors[type].tint, borderColor: Colors[type].border, color: Colors[type].text},
        isPressed === false ? undefined : {opacity: 0.85},
        shape === 'default' ? styles.defaultShape : undefined,
        style
      ]}
      {...rest}
      placeholderTextColor={Colors[type].placeholder}
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
    height: 50,
    //shadow ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    //shadow android
    elevation: 5,
  },
  defaultShape: {
    borderRadius: 5,
    padding: 5,
  },
});