import { TouchableOpacity, type TouchableOpacityProps, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';

export type ThemedButtonProps = TouchableOpacityProps & {
  type?: 'orange' | 'green' | 'red' | 'grey' | 'greyLight' | 'greyDark';
  shape?: 'default';
};

export function ThemedButton({
  style,
  type = 'orange',
  shape = 'default',
  ...rest
}: ThemedButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const colorScheme = useColorScheme();
  let resolvedType = type;
  if(type === 'grey') {
    resolvedType = colorScheme === 'light' ? 'greyLight' : 'greyDark';
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.default,
        {backgroundColor: Colors[resolvedType].tint},
        isPressed === false ? {borderColor: Colors[resolvedType].border} : {opacity: 0.85, borderColor: Colors[resolvedType].tint},
        shape === 'default' ? styles.defaultShape : undefined,
        style
      ]}
      {...rest}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    borderWidth: 4,
    borderTopWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
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