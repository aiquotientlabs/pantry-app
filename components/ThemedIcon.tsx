import { useColorScheme } from 'react-native';
import { IconSymbol, IconSymbolName } from './ui/IconSymbol';
import { Colors } from '@/constants/Colors';

export type ThemedIconProps = & {
  type: 'orange' | 'green' | 'red' | 'grey' | 'greyLight' | 'greyDark';
  size: number;
  name: IconSymbolName;
};

export function ThemedIcon({ 
  type = 'orange', 
  size = 28,
  name = 'plus',
}: ThemedIconProps) {
  if(type === 'grey') {
    const colorScheme = useColorScheme();
    if(colorScheme === 'light') {
      type = 'greyLight';
    } else {
      type = 'greyDark';
    }
  }

  return <IconSymbol size={size} name={name} color={Colors[type].icon} />;
}