import { TouchableOpacity, type TouchableOpacityProps, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';

export type ThemedButtonProps = TouchableOpacityProps & {
  type?: 'orange' | 'green' | 'red' | 'grey';
  shape?: 'default';
};

export function ThemedButton({
  type = 'orange',
  shape = 'default',
  ...rest
}: ThemedButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      style={[
        styles.default,
        {backgroundColor: Colors[type].tint},
        isPressed === false ? {borderColor: Colors[type].border} : {opacity: 0.85, borderColor: Colors[type].tint},
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