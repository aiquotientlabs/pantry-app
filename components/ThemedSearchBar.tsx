import { TextInput, type TextInputProps, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { ThemedView } from './ThemedView';
import { ThemedInput } from './ThemedInput';
import { ThemedIcon } from './ThemedIcon';

export type InputProps = TextInputProps & {
  type?: 'orange' | 'grey' | 'greyLight' | 'greyDark';
  shape?: 'default';
};

export function ThemedSearchBar({
  style,
  type = 'grey',
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
    <ThemedView
      style={[
        styles.default,
        {backgroundColor: Colors[type].tint, borderColor: Colors[type].border, flex: 1, flexDirection: 'row'},
        isPressed === false ? undefined : {opacity: 0.85},
        shape === 'default' ? styles.defaultShape : undefined,
      ]}
      {...rest}
    >
      <ThemedInput 
        style={[
          {backgroundColor: Colors[type].tint, borderColor: Colors[type].border, color: Colors[type].text, borderWidth: 0, paddingHorizontal: 15, elevation: 0},
          isPressed === false ? undefined : {opacity: 0.85},
          shape === 'default' ? styles.defaultShape : undefined,
          style
        ]}
        {...rest}
        placeholderTextColor={Colors[type].placeholder}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      />
      <TouchableOpacity style={{paddingHorizontal: 5}} onPress={() => {}}>
        <ThemedIcon size={35} name="magnifyingglass" type='grey' />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 20,
    borderWidth: 2,
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
    borderRadius: 25,
  },
});