import { useRouter, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

// --- Mock Data for Lesson Details ---
const LESSON_DETAILS: { [key: string]: any } = {
  '1': {
    title: 'Basics of Sustainable Banana Farming in Kerala',
    summary:
      'Hello friends! Today we will talk about sustainable farming — farming that does not harm our soil and water.\n\nIt means growing good crops today while also keeping our land healthy for tomorrow.\n\nWith sustainable farming, the soil stays healthy, water is saved, and we use fewer chemicals. This way, you can earn good profits every year.',
    howTo: [
      'Use cow dung manure and compost.',
      'Rotate crops.',
      'Save water with drip or sprinkler irrigation.',
      'Plant trees and greenery around the fields.',
    ],
    conclusion:
      'With sustainable farming, the land will stay happy, we will be happy, and so will our children.\nAny questions? Feel free to ask!',
  },
  '2': {
    title: 'Healthy Soil for Better Plants',
    summary: 'This is the summary for Lesson 2. It will teach you all about compost and healthy soil.',
    howTo: ['Add banana waste to compost.', 'Mix it with dry leaves.', 'Wait 2 months.'],
    conclusion: 'Now your soil is rich!',
  },
  // You can add entries for '3', '4', '5' here later
};
// -------------------------------------

// A simple component for bullet points
const BulletPoint = ({ text }: { text: string }) => (
  <View style={styles.bulletContainer}>
    <Text style={styles.bullet}>•</Text>
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

export default function LessonDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Get the lesson data, or default to lesson 1 if ID is invalid
  const lesson = LESSON_DETAILS[id] || LESSON_DETAILS['1'];

  // --- THIS FUNCTION IS NOW UPDATED ---
  const handleNext = () => {
    // Navigate to the quiz page for the CURRENT lesson ID
    router.push({
      pathname: '/quiz/[id]',
      params: { id: id },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.lessonNumber}>{id}</Text>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
          </View>

          {/* Video Player Placeholder */}
          <View style={styles.videoPlayer}>
            <View style={styles.playButton} />
          </View>

          {/* Summary Text */}
          <Text style={styles.summaryText}>{lesson.summary}</Text>

          {/* How to do it */}
          <Text style={styles.howToTitle}>How to do it?</Text>
          {lesson.howTo.map((point: string, index: number) => (
            <BulletPoint key={index} text={point} />
          ))}

          {/* Conclusion */}
          <Text style={styles.summaryText}>{lesson.conclusion}</Text>
        </View>

        {/* Next Button (onPress now goes to quiz) */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>&gt;</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles are the same as before
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#151718',
  },
  container: {
    padding: 15,
  },
  card: {
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#444',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  lessonNumber: {
    color: '#FFFFFF',
    fontSize: 80,
    fontWeight: '900',
    fontFamily: 'monospace', // Blocky/Pixel font
    marginRight: 15,
    lineHeight: 80,
  },
  lessonTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
  },
  videoPlayer: {
    width: '100%',
    height: 200,
    backgroundColor: '#388e3c',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  playButton: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 30,
    borderTopWidth: 20,
    borderBottomWidth: 20,
    borderLeftColor: 'rgba(255, 255, 255, 0.9)',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginLeft: 5,
  },
  summaryText: {
    color: '#B0B0B0',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  howToTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bulletContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    color: '#B0B0B0',
    fontSize: 18,
    marginRight: 10,
    lineHeight: 22,
  },
  bulletText: {
    color: '#B0B0B0',
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
  nextButton: {
    backgroundColor: '#388e3c',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900', // Bolder
    fontFamily: 'monospace', // Blocky/Pixel font
    lineHeight: 60,
    transform: [{ translateX: 2 }],
  },
});