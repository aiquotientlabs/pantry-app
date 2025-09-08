import { StyleSheet, useColorScheme, View, Text } from 'react-native';
import { ThemedView, type ThemedViewProps } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { ThemedBadge } from './ThemedBadge';
import { ThemedSelect } from './ThemedSelect';

export type ItemContainerProps = ThemedViewProps & {
  type?: 'orange' | 'green' | 'red' | 'grey' | 'greyLight' | 'greyDark';
  shape?: 'default';
  name: string;
  quantity: string;
  category: string;
  expiration: string;
  selected?: boolean;
  onPress?: () => void;
};

export function ItemContainer({
  style,
  type = 'orange',
  shape = 'default',
  name = '',
  quantity = '',
  category = '',
  expiration = '',
  selected = false,
  onPress,
}: ItemContainerProps) {
  const colorScheme = useColorScheme();
  let resolvedType = type;
  if (type === 'grey') {
    resolvedType = colorScheme === 'light' ? 'greyLight' : 'greyDark';
  }
  
  return (
    <ThemedSelect
      style={[
        styles.default,
        shape === 'default' ? styles.defaultShape : undefined,
        style
      ]}
      isSelected={selected}
      onPress={onPress}
      select='red'
      type={resolvedType}
    >
      <View style={{padding: 5}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ThemedText type='title' darkColor='' style={{flex: 1}}>{name}</ThemedText>
          <ThemedBadge><Text style={styles.semiBold}>{category}</Text></ThemedBadge>
        </View>
        <View style={{flexDirection: 'row'}}>
          <ThemedText type='default' style={{flex: 1}}>Exp: {expiration}</ThemedText>
          <ThemedText type='defaultSemiBold'>#{quantity}</ThemedText>
        </View>
      </View>
    </ThemedSelect>
  );
}

const styles = StyleSheet.create({
  semiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
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