import { ThemedView } from './ThemedView';

export function TabContainer(props: any) {
  return <ThemedView style={{padding: 20, flex: 1, gap: 20}} >{props.children}</ThemedView>;
}