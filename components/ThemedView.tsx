import { View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  let backgroundColor;

  if (lightColor || darkColor) {
    backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      'background'
    );
  } else {
    backgroundColor = 'transparent';
  }

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
