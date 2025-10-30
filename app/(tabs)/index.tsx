import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Sihirli Menü</ThemedText>
      <ThemedText style={styles.subtitle}>
        Animasyonlu menü uygulamasına hoş geldiniz!
      </ThemedText>
      <ThemedText style={styles.description}>
        Alt menüden Anasayfa, Profil, Mesajlar, Fotoğraflar ve Ayarlar sayfalarına geçiş yapabilirsiniz.
      </ThemedText>
      <ThemedText style={styles.info}>
        Her menü öğesine tıkladığınızda yukarı doğru animasyonlu bir geçiş göreceksiniz.
      </ThemedText>
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
  subtitle: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  info: {
    fontSize: 14,
    marginTop: 30,
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.8,
  },
});
