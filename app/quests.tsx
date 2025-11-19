import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
// --- Import useRouter ---
import { useRouter } from 'expo-router';

// Import the SVG icons we'll need
import Qcoin from '../assets/images/Qcoin.svg';
import Checkmark from '../assets/images/check.svg';

// Use the monospace font consistent with your other app screens
const PIXEL_FONT = 'monospace';

/**
 * A reusable component for the quest items
 */
const QuestItem = ({
  title,
  subtitle,
  description,
  points,
  onPress, // --- Add onPress prop ---
}: {
  title: string;
  subtitle: string;
  description: string;
  points: string;
  onPress: () => void; // <--- THIS IS THE FIX
}) => (
  // --- Make this a TouchableOpacity ---
  <TouchableOpacity style={styles.questCard} onPress={onPress}>
    <View style={styles.questTextContainer}>
      <Text style={styles.questTitle}>{title}</Text>
      <Text style={styles.questSubtitle}>{subtitle}</Text>
      <Text style={styles.questDescription}>{description}</Text>
    </View>
    <View style={styles.questReward}>
      <Qcoin width={32} height={32} />
      <Text style={styles.questRewardText}>{points}</Text>
    </View>
  </TouchableOpacity>
);

/**
 * The main Quests Screen component.
 */
export default function QuestsScreen() {
  const router = useRouter(); // --- Get the router ---

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* --- Title --- */}
        <Text style={styles.mainTitle}>MONTHLY QUESTS</Text>

        {/* --- Quest Completed Button --- */}
        <TouchableOpacity style={styles.completedButton}>
          <Checkmark
            width={24}
            height={24}
            style={styles.completedIcon}
          />
          <Text style={styles.completedButtonText}>QUEST COMPLETED!</Text>
        </TouchableOpacity>

        {/* --- Quest Items --- */}
        <QuestItem
          title="Sustainable Banana"
          subtitle="Farming - Simple Steps"
          description="Grow bananas using eco-friendly methods that protect your land and water"
          points="1000"
          // --- Add navigation ---
          onPress={() => router.push('/quest-details')}
        />
        <QuestItem
          title="Water Smart Farming"
          subtitle="" // No subtitle in the image
          description="Learn how to save water while growing healthy crops on a large farm (up to 100 km²) using simple, smart irrigation methods."
          points="1000"
          // --- Add navigation (can point to a different quest later) ---
          onPress={() => router.push('/quest-details')}
        />

        {/* --- Leaderboard Position --- */}
        <View style={styles.leaderboardContainer}>
          <View>
            <Text style={styles.leaderboardLabel}>CURRENT</Text>
            <Text style={styles.leaderboardLabel}>LEADERBOAD</Text>
            <Text style={styles.leaderboardLabel}>POSTION</Text>
          </View>
          <View style={styles.leaderboardRankBox}>
            <Text style={styles.leaderboardRank}>4</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles (No changes needed) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  mainTitle: {
    color: 'white',
    fontFamily: PIXEL_FONT,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
    fontWeight: 'bold',
  },
  completedButton: {
    backgroundColor: '#388E3C', // Dark green
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#66BB6A', // Lighter green border
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  completedIcon: {
    marginRight: 10,
  },
  completedButtonText: {
    color: 'white',
    fontFamily: PIXEL_FONT,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Quest Card
  questCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#424242',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  questTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  questTitle: {
    color: 'white',
    fontFamily: PIXEL_FONT,
    fontSize: 16,
    fontWeight: 'bold',
  },
  questSubtitle: {
    color: 'white',
    fontFamily: PIXEL_FONT,
    fontSize: 12,
    marginTop: 4,
    fontWeight: 'bold',
  },
  questDescription: {
    color: '#BDBDBD', // Lighter grey
    fontSize: 12,
    marginTop: 8,
  },
  questReward: {
    alignItems: 'center',
    gap: 4,
  },
  questRewardText: {
    color: '#F1B301',
    fontFamily: PIXEL_FONT,
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Leaderboard
  leaderboardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#424242',
  },
  leaderboardLabel: {
    color: 'white',
    fontFamily: PIXEL_FONT,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  leaderboardRankBox: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#424242',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaderboardRank: {
    color: 'white',
    fontFamily: PIXEL_FONT,
    fontSize: 64,
    fontWeight: 'bold',
  },
});