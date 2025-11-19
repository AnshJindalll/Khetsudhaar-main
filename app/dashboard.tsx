import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

// --- Import SVG Assets ---
import Coin from '../assets/images/coin.svg';
import LeaderBoard from '../assets/images/LeaderBoard.svg';
import Lessons from '../assets/images/Lessons.svg';
import MarketPrice from '../assets/images/market-price.svg';
import MascotFarmer from '../assets/images/MascotFarmer.svg';
import Quest from '../assets/images/Quest.svg';
import Reward from '../assets/images/Reward.svg';

const PIXEL_FONT = 'monospace';

// --- Helper component for the 4 big buttons ---
const HubButton = ({
  icon,
  label,
  onPress,
  style,
  textStyle,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: object;
}) => (
  <TouchableOpacity style={[styles.buttonBase, style]} onPress={onPress}>
    {icon}
    <Text style={[styles.buttonText, textStyle]}>{label}</Text>
  </TouchableOpacity>
);

export default function DashboardScreen() {
  const router = useRouter();

  const currentLesson = {
    number: '3',
    title: 'Shade and Plant Diversity for Bananas',
    description:
      'How to use shade trees and mixed crops to protect bananas, save water, and stop pests naturally.',
    points: 1000,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* --- 1. Current Lesson --- */}
        <View style={styles.currentLessonContainer}>
          <MascotFarmer width={120} height={120} style={styles.mascot} />
          <TouchableOpacity
            style={[styles.currentLessonCardBase, styles.currentLessonCardGlow]}
            onPress={() =>
              router.push({
                pathname: '/lesson/[id]',
                params: { id: currentLesson.number },
              })
            }>
            <View style={styles.lessonInfo}>
              <Text style={styles.currentLessonTitle}>CURRENT LESSON</Text>
              <View style={styles.lessonRow}>
                <Text style={styles.lessonNumber}>{currentLesson.number}</Text>
                <View style={styles.lessonDetails}>
                  <Text style={styles.lessonTitle} numberOfLines={2}>
                    {currentLesson.title}
                  </Text>
                </View>
                <View style={styles.pointsContainer}>
                  <Coin width={20} height={20} style={styles.coinIcon} />
                  <Text style={styles.pointsText}>{currentLesson.points}</Text>
                </View>
              </View>
              <Text style={styles.lessonDescription} numberOfLines={2}>
                {currentLesson.description}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* --- 2. Grid Buttons (ALL BUTTONS) --- */}
        <View style={styles.gridContainer}>
          {/* Top Row (Squares) */}
          <View style={styles.gridRow}>
            <HubButton
              label="QUESTS"
              icon={<Quest width={80} height={80} />}
              onPress={() => router.push('/quests')} // <-- UPDATED: Links directly to /quests
              style={[styles.buttonSquare, styles.questsButton]}
              textStyle={styles.squareButtonText}
            />
            <HubButton
              label="LEADERBOARD"
              icon={<LeaderBoard width={80} height={80} />}
              onPress={() => router.push('/leaderboard' as any)}
              style={[styles.buttonSquare, styles.leaderboardButton]}
              textStyle={styles.squareButtonText}
            />
          </View>

          {/* Bottom Row (Rectangles) */}
          <View style={styles.gridRow}>
            <HubButton
              label="REWARDS"
              icon={<Reward width={80} height={80} />}
              onPress={() => router.push('/reward-root' as any)}
              style={[styles.buttonRect, styles.rewardsButton]}
              textStyle={styles.rectButtonText}
            />
          </View>
          <View style={styles.gridRow}>
            <HubButton
              label="LESSONS"
              icon={<Lessons width={80} height={80} />}
              onPress={() =>
                router.push({
                  pathname: '/lessons',
                  params: { lesson_completed: '2' },
                } as any)
              }
              style={[styles.buttonRect, styles.lessonsButton]}
              textStyle={styles.rectButtonText}
            />
          </View>
          {/* --- NEW MARKET PRICES TILE --- */}
         <View style={styles.gridRow}>
            // In dashboard.tsx
<HubButton
  label="MARKET PRICES"
  icon={<MarketPrice width={80} height={80} />}
  onPress={() => router.push('/marketPrices' as any)} // <-- FIX
  style={[styles.buttonRect, styles.marketButton]}
  textStyle={styles.rectButtonText}
/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40, // Add space at the bottom
  },
  // --- Current Lesson Styles ---
  currentLessonContainer: {
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  currentLessonCardBase: {
    backgroundColor: '#222',
    borderRadius: 20,
    padding: 15,
    paddingLeft: 100,
    minHeight: 130,
    justifyContent: 'center',
  },
  currentLessonCardGlow: {
    borderColor: '#388e3c',
    borderWidth: 1,
    shadowColor: '#388e3c',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  mascot: {
    position: 'absolute',
    left: 0,
    top: -20,
    zIndex: 5,
  },
  lessonInfo: {
    flex: 1,
  },
  currentLessonTitle: {
    color: '#9E9E9E',
    fontSize: 12,
    fontFamily: PIXEL_FONT,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  lessonNumber: {
    color: 'white',
    fontSize: 70,
    fontFamily: PIXEL_FONT,
    lineHeight: 70,
    marginRight: 10,
  },
  lessonDetails: {
    flex: 1,
  },
  lessonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    alignSelf: 'flex-start',
  },
  coinIcon: {
    marginRight: 4,
  },
  pointsText: {
    color: '#FDD835',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lessonDescription: {
    color: '#B0B0B0',
    fontSize: 12,
  },
  // --- Grid Styles ---
  gridContainer: {
    width: '100%',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  // Base style for all buttons
  buttonBase: {
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 8, // Add consistent margin
  },
  // Style for the top row (squares)
  buttonSquare: {
    flex: 1,
    aspectRatio: 1,
  },
  // Style for the bottom row (rectangles)
  buttonRect: {
    flex: 1, // Full width
    height: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Base text style
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: PIXEL_FONT,
  },
  // Text for squares
  squareButtonText: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  // Text for rectangles
  rectButtonText: {
    fontSize: 20,
    marginLeft: 16,
  },
  // Specific Button Colors
  questsButton: {
    backgroundColor: 'rgba(74, 20, 140, 0.5)',
    borderColor: '#4A148C',
  },
  leaderboardButton: {
    backgroundColor: 'rgba(253, 216, 53, 0.2)',
    borderColor: '#FDD835',
  },
  rewardsButton: {
    backgroundColor: 'rgba(194, 24, 91, 0.5)',
    borderColor: '#C2185B',
  },
  lessonsButton: {
    backgroundColor: 'rgba(56, 142, 60, 0.5)',
    borderColor: '#388e3c',
  },
  marketButton: {
    backgroundColor: 'rgba(2, 119, 189, 0.5)', // Blue
    borderColor: '#0277BD',
  },
});