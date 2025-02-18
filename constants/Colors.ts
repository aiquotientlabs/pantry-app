/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  orange: {
    text: '#11181C',
    background: '#F5BD4D',
    tint: '#F5BD4D',
    icon: '#F5BD4D',
    border: '#F3B12B'
  },
  green: {
    text: '#11181C',
    background: '#4DF652',
    tint: '#4DF652',
    icon: '#4DF652',
    border: '#2AEF31'
  },
  red: {
    text: '#11181C',
    background: 'F64D4D',
    tint: '#F64D4D',
    icon: '#F64D4D',
    border: '#F32B2B'
  },
  grey: {
    text: '#11181C',
    background: '',
    tint: '#EFEFEF',
    icon: '#EFEFEF',
    border: '#E2E2E2'
  },
};