import { useRouter, useLocalSearchParams } from 'expo-router'; // Import useLocalSearchParams
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import Mascot from '../assets/images/Mascot.svg';
import Coin from '../assets/images/coin.svg';
import MascotFarmer from '../assets/images/MascotFarmer.svg';

// --- THIS IS THE FULL LIST OF LESSONS ---
// We've added Lesson 6 with a 'theme'
const ALL_LESSONS = [
  {
    number: '1',
    title: 'Basics of Sustainable Farming',
    description: "How to grow plants sustainably...",
    points: 1000,
    status: 'locked',
  },
  {
    number: '2',
    title: 'Healthy Soil for Better Plants',
    description: 'How to make soil rich with banana waste compost...',
    points: 1500,
    status: 'locked',
  },
  {
    number: '3',
    title: 'Shade and Plant Diversity for Bananas',
    description: 'How to use shade trees and mixed crops...',
    points: 1000,
    status: 'locked',
  },
  {
    number: '4',
    title: 'Smart Water Use for Banana Farms',
    description: 'How to save water with mulching and drip...',
    points: 1500,
    status: 'locked',
  },
  {
    number: '5',
    title: 'Natural Pest Control and Clean Harvesting',
    description: 'How to stop pests with neem, pick ripe bananas...',
    points: 1000,
    status: 'locked',
  },
  {
    number: '6', // The new lesson
    title: 'Women-Led Sustainable Farming in Kerala',
    description: 'Learn from women farmers in Kerala who grow...',
    points: 1000,
    status: 'locked',
    theme: 'women', // The new property for pink style
  },
];
// ----------------------------------------

// Reusable Lesson Card Component
function LessonCard({
  lesson,
  isCurrent = false,
}: {
  lesson: (typeof ALL_LESSONS)[0];
  isCurrent?: boolean;
}) {
  const router = useRouter();
  const { number, title, description, points, status, theme } = lesson;

  // --- STYLE LOGIC UPDATED ---
  // It now also checks for the 'women' theme
  const cardStyle = [
    styles.lessonCard,
    isCurrent && styles.currentLessonCard,
    status === 'completed' && styles.completedLessonCard,
    status === 'locked' && styles.lockedLessonCard,
    theme === 'women' && status !== 'completed' && styles.womenLessonCard,
  ];
  // -------------------------

  return (
    <TouchableOpacity
      style={cardStyle}
      disabled={status === 'locked'}
      onPress={() =>
        router.push({
          pathname: '/lesson/[id]',
          params: { id: number },
        })
      }>
      <Text style={[styles.lessonNumber, isCurrent && styles.currentLessonNumber]}>
        {number}
      </Text>
      <View style={styles.lessonContent}>
        <Text style={styles.lessonTitle}>{title}</Text>
        {status !== 'completed' && (
          <Text style={styles.lessonDescription}>{description}</Text>
        )}
        <View style={styles.pointsContainer}>
          <Coin width={24} height={24} style={styles.coinIcon} />
          <Text style={styles.pointsText}>{points}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function LessonsScreen() {
  // --- THIS IS THE NEW DYNAMIC LOGIC ---
  // Read the signal from the URL (e.g., lesson_completed=2)
  const { lesson_completed } = useLocalSearchParams<{ lesson_completed?: string }>();
  
  // Get the number of the last completed lesson
  // If nothing is passed, default to '0' (meaning no lessons are complete)
  const lastCompletedId = parseInt(lesson_completed || '0', 10);

  // Dynamically set status for all lessons
  const LESSON_DATA = ALL_LESSONS.map((lesson) => {
    const lessonId = parseInt(lesson.number, 10);
    let status = 'locked'; // Default
    if (lessonId <= lastCompletedId) {
      status = 'completed';
    } else if (lessonId === lastCompletedId + 1) {
      // This is the next lesson
      status = 'current';
    }
    return { ...lesson, status };
  });
  // ------------------------------------

  // The rest of the page just works with the new dynamic data
  const currentLesson = LESSON_DATA.find((l) => l.status === 'current');
  const completedLessons = LESSON_DATA.filter((l) => l.status === 'completed');
  const upcomingLessons = LESSON_DATA.filter(
    (l) => l.status !== 'current' && l.status !== 'completed'
  );

  const totalScore = completedLessons.reduce((sum, l) => sum + l.points, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Current Lesson Section */}
        {currentLesson && (
          <>
            <View style={styles.currentSection}>
              <Mascot width={140} height={140} style={styles.mascot} />
              <View style={styles.currentTag}>
                <Text style={styles.currentTagText}>CURRENT LESSON</Text>
              </View>
            </View>
            <LessonCard lesson={currentLesson} isCurrent={true} />
          </>
        )}

        {/* Upcoming Lessons Section */}
        {upcomingLessons.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>UPCOMING LESSONS</Text>
            {upcomingLessons.map((lesson) => (
              <LessonCard key={lesson.number} lesson={lesson} />
            ))}
          </>
        )}

        {/* Recently Completed Section */}
        {completedLessons.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>RECENTLY COMPLETED LESSON</Text>
            <View style={styles.completedSectionHeader}>
              <MascotFarmer width={100} height={100} style={styles.farmerMascot} />
              <Text style={styles.totalScore}>TOTALSCORE {totalScore}</Text>
            </View>
            {/* Sort completed lessons in reverse order so latest is first */}
            {completedLessons.sort((a, b) => parseInt(b.number) - parseInt(a.number)).map((lesson) => (
              <LessonCard key={lesson.number} lesson={lesson} />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#151718',
  },
  container: {
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 30,
  },
  currentSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 90,
    marginBottom: -40,
    paddingHorizontal: 10,
    zIndex: 10,
  },
  mascot: {
    transform: [{ translateX: -15 }],
  },
  currentTag: {
    backgroundColor: '#388e3c',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
    transform: [{ translateY: -30 }],
    shadowColor: '#388e3c',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  currentTagText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#777',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 25,
    letterSpacing: 1,
  },
  lessonCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  currentLessonCard: {
    paddingLeft: 20,
    backgroundColor: '#222',
    borderColor: '#388e3c',
    shadowColor: '#388e3c',
    shadowOpacity: 0.7,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
  },
  lockedLessonCard: {
    backgroundColor: '#222',
    opacity: 0.6,
  },
  completedLessonCard: {
    backgroundColor: '#2E7D32',
    borderColor: '#388E3C',
    paddingLeft: 20,
  },
  // --- NEW PINK STYLE ---
  womenLessonCard: {
    backgroundColor: '#4A148C', // Dark Purple/Pink
    borderColor: '#C2185B', // Hot Pink Border
    // Pink Glow
    shadowColor: '#C2185B',
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  // ----------------------
  lessonNumber: {
    color: '#555',
    fontSize: 80,
    fontWeight: '900',
    fontFamily: 'monospace',
    marginRight: 15,
    lineHeight: 80,
  },
  currentLessonNumber: {
    color: '#FFFFFF',
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  lessonDescription: {
    color: '#B0B0B0',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 5,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  coinIcon: {
    marginRight: 8,
  },
  pointsText: {
    color: '#FDD835',
    fontSize: 18,
    fontWeight: 'bold',
  },
  completedSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  farmerMascot: {
    width: 100,
    height: 100,
  },
  totalScore: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});