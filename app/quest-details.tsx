import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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

// --- Import SVG Assets ---
import Coin from '../assets/images/Qcoin.svg';

const PIXEL_FONT = 'monospace';

// --- Mock Data for the Single Quest ---
const QUEST_DETAILS = {
    id: 'q1',
    title: 'Sustainable Land Management', // The main quest title
    reward: 1000,
    rewardType: 'XP',
    isCompleted: false, // The main quest status
    whatToKnow: { 
        landSize: 'About 0.1 acres (400 sq meters) with well-drained, loamy soil rich in organic matter.',
    },
    steps: [ // Represents the individual tasks to complete the quest
        { text: 'Prepare Soil Naturally: Add compost or farmyard manure instead of chemical fertilizers to keep soil healthy.', completed: true }, // Set to true for demonstration
        { text: 'Water Efficiently: Water plants early morning or late evening and use mulch to keep moisture in soil.', completed: true }, // Set to true for demonstration
    ],
    rewardDescription: 'You help keep your land fertile and save water while growing healthy bananas sustainably.', // The main quest reward text
};

/**
 * Helper component for each step in the quest.
 */
const QuestStep: React.FC<{ text: string; completed: boolean }> = ({ text, completed }) => (
    <View style={styles.stepContainer}>
        <View style={[styles.stepIconBox, completed ? styles.stepCompleted : styles.stepActive]}>
            <FontAwesome5 
                name={completed ? 'check' : 'circle'} 
                size={14} 
                color={completed ? '#fff' : '#4CAF50'} 
            />
        </View>
        <Text style={[styles.stepText, completed && styles.stepTextCompleted]}>{text}</Text>
    </View>
);

// --- Main Screen Component ---
export default function QuestsScreen() {
    const router = useRouter();

    const { title, reward, rewardType, whatToKnow, steps, isCompleted, rewardDescription } = QUEST_DETAILS;
    const completedSteps = steps.filter(s => s.completed).length;
    const totalSteps = steps.length;
    const progressPercentage = (completedSteps / totalSteps) * 100;

    const handleActionButtonPress = () => {
        // --- UPDATED LOGIC HERE ---
        // If all steps are complete, navigate to the new Quiz page
        if (completedSteps === totalSteps) {
            router.push('/quest-quiz'); // <--- FIX: Was '/quiz'
        } else {
            // Otherwise, navigate to lessons to complete the next step
            router.push('/lessons');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                
                {/* --- Main Quest Card: Title and Progress --- */}
                <View style={styles.mainCard}>
                    <View style={styles.titleRow}>
                        <FontAwesome5 name="seedling" size={28} color="#4CAF50" style={styles.trophyIcon} />
                        <Text style={styles.questTitle}>{title}</Text>
                    </View>
                    
                    <View style={styles.rewardBox}>
                        <Text style={styles.rewardText}>XP REWARD:</Text>
                        <Coin width={20} height={20} />
                        <Text style={styles.rewardValue}>{reward} {rewardType}</Text>
                    </View>
                    
                    <Text style={styles.progressLabel}>PROGRESS: {completedSteps}/{totalSteps}</Text>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
                    </View>
                </View>

                {/* --- "What You Need to Know" Section --- */}
                <View style={styles.infoSection}>
                    <Text style={styles.infoTitle}>What You Need to Know</Text>
                    <Text style={styles.infoText}>{whatToKnow.landSize}</Text>
                </View>


                {/* --- Quest Steps Section (Tasks to Complete) --- */}
                <View style={styles.stepsSection}>
                    <Text style={styles.stepsHeader}>Tasks to Complete</Text>
                    <View style={styles.stepsList}>
                        {steps.map((step, index) => (
                            <QuestStep key={index} {...step} />
                        ))}
                    </View>
                </View>

                {/* --- QUEST ACTION CARD --- */}
                <View style={styles.actionCard}>
                    <View style={styles.cardHeader}>
                        <Coin width={40} height={40} /> 
                        <View style={styles.cardHeaderTextContainer}>
                            <Text style={styles.cardTitle}>QUEST REWARD</Text>
                            <Text style={styles.cardSubtitle}>{rewardDescription}</Text>
                        </View>
                    </View>

                    <View style={styles.cardDivider} />

                    <TouchableOpacity 
                        style={styles.actionButton} 
                        onPress={handleActionButtonPress}
                    >
                        <Text style={styles.actionButtonText}>
                            {completedSteps === totalSteps ? 'COMPLETE QUEST QUIZ' : 'CONTINUE LEARNING'}
                        </Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
}
// --- Styles (No changes) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151718', // Dark background
    },
    scrollContainer: {
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    // --- Main Card Styles ---
    mainCard: {
        backgroundColor: '#2C2C2E',
        borderRadius: 20,
        padding: 25,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#4CAF50', // Green border
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    trophyIcon: {
        marginRight: 10,
        color: '#FFD700',
    },
    questTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: PIXEL_FONT,
    },
    rewardBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        borderRadius: 10,
        marginBottom: 15,
    },
    rewardText: {
        color: '#00ff51ff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5,
    },
    rewardValue: {
        color: 'white',
        fontSize: 18,
        fontWeight: '900',
        marginLeft: 5,
        fontFamily: PIXEL_FONT,
    },
    progressLabel: {
        color: '#B0B0B0',
        fontSize: 14,
        marginBottom: 8,
    },
    progressBarBackground: {
        height: 10,
        backgroundColor: '#383838',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 10,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#4CAF50', // Green
        borderRadius: 5,
    },

    // --- Info Section Styles ---
    infoSection: {
        backgroundColor: '#2C2C2E',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        borderLeftWidth: 5,
        borderLeftColor: '#3498DB', // Blue for info
    },
    infoTitle: {
        color: '#3498DB', // Blue
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    infoText: {
        color: '#DEDEDE',
        fontSize: 16,
        lineHeight: 22,
    },
    
    // --- Steps Styles ---
    stepsSection: {
        marginBottom: 30,
    },
    stepsHeader: {
        color: '#4CAF50',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: PIXEL_FONT,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#444444',
        paddingBottom: 5,
    },
    stepsList: {
        gap: 15,
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    stepIconBox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderWidth: 2,
        flexShrink: 0,
    },
    stepActive: {
        borderColor: '#4CAF50',
        backgroundColor: '#2C2C2E',
    },
    stepCompleted: {
        borderColor: '#4CAF50',
        backgroundColor: '#4CAF50',
    },
    stepText: {
        color: 'white',
        fontSize: 16,
        flex: 1,
    },
    stepTextCompleted: {
        color: '#9E9E9E',
        textDecorationLine: 'line-through',
    },
    
    // --- QUEST ACTION CARD STYLES ---
    actionCard: {
        backgroundColor: '#2C2C2E',
        borderRadius: 15,
        padding: 20,
        borderWidth: 2,
        borderColor: '#00ff62ff', // Gold border
        marginBottom: 30,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardHeaderTextContainer: {
        flex: 1,
        marginLeft: 15,
    },
    cardTitle: {
        color: '#FFD700',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: PIXEL_FONT,
        marginBottom: 4,
    },
    cardSubtitle: {
        color: '#DEDEDE',
        fontSize: 14,
        lineHeight: 20,
    },
    cardDivider: {
        height: 1,
        backgroundColor: '#444444',
        marginVertical: 15,
    },
    actionButton: {
        flexDirection: 'row',
        backgroundColor: '#4CAF50', 
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        shadowColor: '#388E3C', // Green shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
    },
    actionButtonText: {
        color: 'white', 
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: PIXEL_FONT,
        letterSpacing: 1,
    },
});