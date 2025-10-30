import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function PhotosScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Fotoğraflar</ThemedText>
      <ThemedText>Fotoğraflarınız burada olacak.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

