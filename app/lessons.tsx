import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { supabase } from '../utils/supabase';
import { useTranslation } from '@/hooks/useTranslation';
import { DEFAULT_LANGUAGE } from '@/constants/translations';

import Coin from '../assets/images/coin.svg';
import Mascot from '../assets/images/Mascot.svg';
import MascotFarmer from '../assets/images/MascotFarmer.svg';

// --- TYPE DEFINITIONS ---

interface LessonData {
  id: number;
  title: string; 
  description: string;
  sequence: number;
  points: number;
  theme: string | null; 
}

interface Lesson extends LessonData {
  status: 'current' | 'completed' | 'locked';
}

// Helper to determine lesson completion status
const determineStatus = (allLessons: LessonData[], completedIds: Set<number>, userId: string | undefined): Lesson[] => {
    let lastCompletedId = 0;
    
    if (userId) {
        const completedSequences = allLessons
          .filter(l => completedIds.has(l.id))
          .map(l => l.sequence);
        
        if (completedSequences.length > 0) {
          lastCompletedId = Math.max(...completedSequences);
        }
    }
    
    return allLessons.map(lesson => {
        const isCompleted = completedIds.has(lesson.id); 
        let status: 'current' | 'completed' | 'locked' = 'locked';

        if (isCompleted) {
          status = 'completed';
        } else if (lesson.sequence === lastCompletedId + 1) {
          status = 'current';
        } else if (lastCompletedId === 0 && lesson.sequence === 1) {
          status = 'current';
        }

        return { ...lesson, status } as Lesson;
    });
};

/**
 * Fetches all available lessons using the user's language preference with absolute safety.
 */
const fetchLessonsAndProgress = async (langCode: string): Promise<{lessons: Lesson[], lastCompletedId: number}> => {
  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData.session?.user.id;
  const isGuest = !userId;
  
  const fallbackTitleColumn = `title_${DEFAULT_LANGUAGE}`;
  const fallbackDescriptionColumn = `description_${DEFAULT_LANGUAGE}`;
  const localizedTitleColumn = `title_${langCode}`;
  const localizedDescriptionColumn = `description_${langCode}`;

  let rawLessons: any[] | null = null;
  let finalLangCode = langCode;

  // 1. ATTEMPT localized query with safety fields
  let selectFields = [
    'id', 
    'sequence', 
    'points', 
    'theme', 
    fallbackTitleColumn,
    fallbackDescriptionColumn,
  ];

  if (langCode !== DEFAULT_LANGUAGE) {
    selectFields.push(localizedTitleColumn, localizedDescriptionColumn);
  }
  
  try {
    const { data, error } = await supabase
      .from('lessons')
      .select(selectFields.join(','))
      .order('sequence', { ascending: true })
      .returns<any[]>();
      
    if (error) {
        console.warn(`Localized query failed for ${langCode}. Switching to English fallback.`);
        throw new Error("Localized query failed.");
    }
    rawLessons = data;
    
  } catch (initialError) {
    // 2. RUN SAFE (English-only) FALLBACK QUERY
    finalLangCode = DEFAULT_LANGUAGE;
    const safeSelectFields = [
        'id', 'sequence', 'points', 'theme', fallbackTitleColumn, fallbackDescriptionColumn
    ].join(',');

    const { data: safeData, error: safeError } = await supabase
      .from('lessons')
      .select(safeSelectFields)
      .order('sequence', { ascending: true })
      .returns<any[]>();

    if (safeError) {
      console.error('FATAL DB ERROR: Could not retrieve base lesson data:', safeError.message);
      Alert.alert('Data Error', 'Failed to load lessons from the server.');
      return { lessons: [], lastCompletedId: 0 };
    }
    rawLessons = safeData;
  }
  
  // 3. Process data
  const completedLessons = isGuest
    ? []
    : (await supabase.from('user_lessons').select('lesson_id').eq('user_id', userId)).data || [];
  const completedIds = new Set(completedLessons.map(c => c.lesson_id));

  const cleanedLessons: LessonData[] = (rawLessons || []).map(lesson => {
      const currentTitleKey = `title_${finalLangCode}`;
      const currentDescriptionKey = `description_${finalLangCode}`;
      const fallbackTitleKey = `title_${DEFAULT_LANGUAGE}`;
      const fallbackDescriptionKey = `description_${DEFAULT_LANGUAGE}`;

      return {
          id: lesson.id,
          sequence: lesson.sequence,
          points: lesson.points,
          theme: lesson.theme,
          title: lesson[currentTitleKey] || lesson[fallbackTitleKey] || 'Lesson Title Missing', 
          description: lesson[currentDescriptionKey] || lesson[fallbackDescriptionKey] || 'Lesson description missing.',
      };
  });
  
  const finalLessons = determineStatus(cleanedLessons, completedIds, userId);

  // Recalculate lastCompletedId 
  let lastCompletedId = 0;
  if (userId) {
    const completedSequences = finalLessons
      .filter(l => l.status === 'completed')
      .map(l => l.sequence);
    
    if (completedSequences.length > 0) {
      lastCompletedId = Math.max(...completedSequences);
    }
  }

  return { lessons: finalLessons, lastCompletedId };
};

// --- Reusable Lesson Card Component (remains the same) ---
interface LessonCardProps {
  lesson: Lesson;
  isCurrent?: boolean;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, isCurrent = false }) => {
  const router = useRouter();
  const { id, title, description, points, status, theme } = lesson;

  const cardStyle = [
    styles.lessonCard,
    isCurrent && styles.currentLessonCard,
    status === 'completed' && styles.completedLessonCard,
    status === 'locked' && styles.lockedLessonCard,
    theme === 'women' && status !== 'completed' && styles.womenLessonCard,
  ];

  const isActionable = status !== 'locked';

  return (
    <TouchableOpacity
      style={cardStyle}
      disabled={!isActionable}
      onPress={() =>
        router.push({
          pathname: '/lesson/[id]',
          params: { id: id }, 
        })
      }>
      <Text style={[styles.lessonNumber, isCurrent && styles.currentLessonNumber]}>
        {lesson.sequence}
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
};


// --- LESSONS SCREEN MAIN COMPONENT ---
export default function LessonsScreen() {
  const { lesson_completed } = useLocalSearchParams<{ lesson_completed?: string }>();
  const { t, language, isLoading: isTransLoading } = useTranslation();
  
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastCompletedSeq, setLastCompletedSeq] = useState(0);

  const loadLessons = useCallback(async () => {
    if (!language) return; 

    setLoading(true);
    const { lessons: fetchedLessons, lastCompletedId: completedSeq } = await fetchLessonsAndProgress(language);
    setLessons(fetchedLessons);
    setLastCompletedSeq(completedSeq);
    setLoading(false);
  }, [language]); 

  useEffect(() => {
    if (!isTransLoading) {
        loadLessons(); 
    }
  }, [lesson_completed, loadLessons, isTransLoading]);
  
  const { currentLesson, completedLessons, upcomingLessons, totalScore } = useMemo(() => {
    const current = lessons.find((l) => l.status === 'current');
    const completed = lessons.filter((l) => l.status === 'completed');
    const upcoming = lessons.filter((l) => l.status === 'locked');
    const score = completed.reduce((sum, l) => sum + l.points, 0);

    return {
      currentLesson: current,
      completedLessons: completed,
      upcomingLessons: upcoming,
      totalScore: score,
    };
  }, [lessons]);

  if (loading || isTransLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#388e3c" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Current Lesson Section */}
        {currentLesson && (
          <>
            <View style={styles.currentSection}>
              <Mascot width={140} height={140} style={styles.mascot} /> 
              <View style={styles.currentTag}>
                <Text style={styles.currentTagText}>CURRENT {t('lessons')}</Text> 
              </View>
            </View>
            <LessonCard lesson={currentLesson} isCurrent={true} />
          </>
        )}

        {/* Upcoming Lessons Section */}
        {upcomingLessons.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>UPCOMING {t('lessons')}</Text>
            {upcomingLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </>
        )}

        {/* Recently Completed Section */}
        {completedLessons.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>RECENTLY {t('completed')} {t('lessons')}</Text>
            <View style={styles.completedSectionHeader}>
              <MascotFarmer width={100} height={100} style={styles.farmerMascot} />
              <Text style={styles.totalScore}>TOTAL SCORE {totalScore}</Text>
            </View>
            {completedLessons.sort((a, b) => b.sequence - a.sequence).map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// --- STYLES (Kept exactly as provided by the user) ---

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151718',
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
  womenLessonCard: {
    backgroundColor: '#4A148C', // Dark Purple/Pink
    borderColor: '#C2185B', // Hot Pink Border
    shadowColor: '#C2185B',
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
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