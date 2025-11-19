import { FontAwesome5 } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

// --- FUNCTIONS FOR THE CONSISTENT APP HEADER ---

// Profile Icon (for post-login screens)
function AppHeaderLeft() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push('/profile')}>
      <FontAwesome5 name="user-circle" size={28} color="white" style={styles.profileIcon} />
    </TouchableOpacity>
  );
}

// Logo (for all screens)
function AppHeaderRight() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push('/dashboard')}>
      <Image
        source={require('@/assets/images/Applogo.png')}
        style={styles.logoRight}
      />
    </TouchableOpacity>
  );
}

// --- LAYOUT FILE ---
export default function AppLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          // Global header style
          headerStyle: {
            backgroundColor: '#388e3c', // Khetsudhaar green
          },
          headerTintColor: '#fff', // White text/icons
          headerShadowVisible: false, // Clean flat look
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        
        {/* --- PRE-LOGIN SCREENS --- */}
        {/* These screens have NO profile icon */}
        <Stack.Screen
          name="login"
          options={{
            headerShown: true,
            headerTitle: 'LOGIN',
            headerLeft: () => null, // No profile icon
            headerRight: () => <AppHeaderRight />,
          }}
        />
        <Stack.Screen
          name="language"
          options={{
            headerShown: true,
            headerTitle: 'LANGUAGE',
            headerLeft: () => null, // No profile icon
            headerRight: () => <AppHeaderRight />,
          }}
        />
        <Stack.Screen
          name="crop"
          options={{
            headerShown: true,
            headerTitle: 'CHOOSE CROP',
            headerLeft: () => null, // No profile icon
            headerRight: () => <AppHeaderRight />,
          }}
        />
        
        {/* --- POST-LOGIN SCREENS --- */}
        {/* These screens HAVE the profile icon */}
        <Stack.Screen
          name="dashboard"
          options={{
            headerShown: true,
            headerTitle: 'DASHBOARD',
            headerLeft: () => <AppHeaderLeft />,
            headerRight: () => <AppHeaderRight />,
          }}
        />
        <Stack.Screen
          name="lessons"
          options={{
            headerShown: true,
            headerTitle: 'LESSONS',
            headerLeft: () => <AppHeaderLeft />,
            headerRight: () => <AppHeaderRight />,
          }}
        />
        <Stack.Screen
          name="lesson/[id]"
          options={{
            headerShown: true,
            headerTitle: 'LESSON DETAIL',
            headerLeft: () => <AppHeaderLeft />,
            headerRight: () => <AppHeaderRight />,
          }}
        />
        
        <Stack.Screen
          name="profile"
          options={{
            headerShown: true,
            headerTitle: 'PROFILE',
            headerLeft: () => <AppHeaderLeft />,
            headerRight: () => <AppHeaderRight />,
          }}
        />
        <Stack.Screen
          name="reward-root"
          options={{
            headerShown: true,
            headerTitle: 'REWARDS',
            headerLeft: () => <AppHeaderLeft />,
            headerRight: () => <AppHeaderRight />,
          }}
        />
        <Stack.Screen
          name="leaderboard"
          options={{
            headerShown: true,
            headerTitle: 'LEADERBOARD',
            headerLeft: () => <AppHeaderLeft />,
            headerRight: () => <AppHeaderRight />,
          }}
        />
        <Stack.Screen
          name="quests" 
          options={{
            headerShown: true,
            headerTitle: 'DAILY QUESTS', 
            headerLeft: () => <AppHeaderLeft />,
            headerRight: () => <AppHeaderRight />,
          }}
        />
        <Stack.Screen
          name="marketPrices"
          options={{
            headerShown: true,
            headerTitle: 'MARKET PRICES',
            headerLeft: () => <AppHeaderLeft />,
            headerRight: () => <AppHeaderRight />,
          }}
        />
        <Stack.Screen
          name="quest-details"
          options={{
            headerShown: true,
            headerTitle: 'QUEST DETAILS', 
            headerLeft: () => <AppHeaderLeft />,
            headerRight: () => <AppHeaderRight />,
          }}
        />
        <Stack.Screen
          name="quest-complete" 
          options={{
            headerShown: true,
            headerTitle: 'QUEST COMPLETE',
            headerLeft: () => <AppHeaderLeft />,
            headerRight: () => <AppHeaderRight />,
          }}
        />
        <Stack.Screen
          name="quest-quiz" 
          options={{
            headerShown: true,
            headerTitle: 'QUEST QUIZ',
            headerLeft: () => <AppHeaderLeft />,
            headerRight: () => <AppHeaderRight />,
          }}
        />
      </Stack>

      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  logoRight: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  profileIcon: {
    marginLeft: 15,
  },
});