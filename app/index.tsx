import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

// Note: Ensure your Mascot.svg file has content.
import Mascot from '../assets/images/Mascot.svg'; // <-- Path fixed

/**
 * This is the root screen of the app, serving as a splash screen.
 * It automatically navigates to the language selection screen after 2.5 seconds.
 */
export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to the language screen after a delay
    const timer = setTimeout(() => {
      router.replace('/language'); // Use replace to prevent going back to the splash screen
    }, 2500); // 2.5-second splash screen

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.centerBlock}>
        <Image source={require('../assets/images/Applogo.png')} style={styles.logo} /> {/* <-- Path fixed */}
        <View style={styles.textStack}>
          <Text style={styles.khetText}>KHET</Text>
        </View>
        <View style={styles.textStack}>
          <Text style={styles.hindiText}>सुधार</Text>
        </View>
      </View>
      <View style={styles.mascotBlock}>
        <Mascot width={320} height={260} />
      </View>
    </View>
  );
}

// Styles are the same as your OpeningScreen.tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#388e3c',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 0,
  },
  centerBlock: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotBlock: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logo: {
    height: 250,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    marginBottom: -40,
  },
  textStack: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 0,
  },
  khetText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 84,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: -35,
    marginTop: 10,
  },
  hindiText: {
    color: '#fff',
    fontSize: 69,
    textAlign: 'center',
    fontFamily: 'sans-serif',
    marginTop: 0,
    marginBottom: 0,
  },
});