import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const PIXEL_FONT = 'monospace';

// --- Quiz Data ---
const QUIZ_DATA = {
    question: 'What changes did you notice in the soil condition after adding compost or farmyard manure?', 
    options: [
        { id: 'a', text: 'Increased soil compaction and runoff' },
        { id: 'b', text: 'Improved soil structure, aeration, and water retention' }, // Correct Answer
        { id: 'c', text: 'Reduced nutrient availability and microbial activity' },
        { id: 'd', text: 'A rapid decrease in soil pH (more acidic)' },
    ],
    correctAnswerId: 'b',
    xpReward: 1500,
};

export default function QuizScreen() {
    const router = useRouter();
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleAnswerSelect = (id: string) => {
        if (!isAnswerSubmitted) {
            setSelectedAnswer(id);
        }
    };

 const handleSubmit = () => {
        if (!selectedAnswer) return;

        const correct = selectedAnswer === QUIZ_DATA.correctAnswerId;
        setIsCorrect(correct);
        setIsAnswerSubmitted(true);

        // Logic from the nested function has been moved here
        if (correct) {
            // FIX: Navigate to the quest completion screen
            setTimeout(() => {
                router.push('/quest-complete'); // Navigate on success
            }, 2000);
        }
    }; // <-- End of the *correct* function

    // Logic to reset the quiz for 'Try Again'
    const handleTryAgain = () => {
        setSelectedAnswer(null);
        setIsAnswerSubmitted(false);
        setIsCorrect(false);
    };
    const getOptionStyle = (id: string) => {
        if (!isAnswerSubmitted) {
            return id === selectedAnswer ? styles.optionSelected : styles.optionDefault;
        }

        // After submission:
        if (id === QUIZ_DATA.correctAnswerId) {
            return styles.optionCorrect; // Correct answer is always green
        }
        if (id === selectedAnswer && !isCorrect) {
            return styles.optionIncorrect; // User's wrong answer is red
        }
        return styles.optionDefault; // Other unselected options are default color
    };

    const getIcon = (id: string) => {
        if (!isAnswerSubmitted || id !== selectedAnswer) return 'circle';
        
        return isCorrect ? 'check-circle' : 'times-circle';
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                {/* --- Quiz Header --- */}
                <View style={styles.headerBox}>
                    <Text style={styles.headerText}>FINAL QUEST QUIZ</Text>
                    <View style={styles.rewardContainer}>
                        <Text style={styles.rewardText}>REWARD: {QUIZ_DATA.xpReward} XP</Text>
                    </View>
                </View>

                {/* --- Question --- */}
                <View style={styles.questionBox}>
                    <Text style={styles.questionText}>
                        {QUIZ_DATA.question}
                    </Text>
                </View>

                {/* --- Options --- */}
                <View style={styles.optionsList}>
                    {QUIZ_DATA.options.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            style={getOptionStyle(option.id)}
                            onPress={() => handleAnswerSelect(option.id)}
                            disabled={isAnswerSubmitted}
                        >
                            <FontAwesome5 
                                name={getIcon(option.id)}
                                size={20}
                                color={isAnswerSubmitted ? (option.id === QUIZ_DATA.correctAnswerId ? 'white' : 'white') : (option.id === selectedAnswer ? 'white' : '#B0B0B0')}
                                style={styles.optionIcon}
                            />
                            <Text style={styles.optionText}>{option.text}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* --- Feedback & Action Button --- */}
                {!isAnswerSubmitted && (
                    <TouchableOpacity 
                        style={[styles.submitButton, !selectedAnswer && styles.submitButtonDisabled]}
                        onPress={handleSubmit}
                        disabled={!selectedAnswer}
                    >
                        <Text style={styles.submitButtonText}>SUBMIT ANSWER</Text>
                    </TouchableOpacity>
                )}

                {isAnswerSubmitted && (
                    <View style={styles.feedbackContainer}>
                        <Text style={isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}>
                            {isCorrect ? '✅ CORRECT! Reward Claimed!' : '❌ INCORRECT!'}
                        </Text>
                        {!isCorrect && (
                             <TouchableOpacity 
                                style={styles.tryAgainButton}
                                onPress={handleTryAgain}
                            >
                                <Text style={styles.tryAgainButtonText}>TRY AGAIN</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
                
            </ScrollView>
        </SafeAreaView>
    );
}

// --- Styles ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151718',
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    headerBox: {
        marginBottom: 30,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: PIXEL_FONT,
        marginBottom: 10,
    },
    rewardContainer: {
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    rewardText: {
        color: '#FFD700',
        fontSize: 16,
        fontWeight: 'bold',
    },
    questionBox: {
        backgroundColor: '#2C2C2E',
        borderRadius: 15,
        padding: 20,
        marginBottom: 30,
        borderLeftWidth: 5,
        borderLeftColor: '#3498DB',
    },
    questionText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 25,
    },
    optionsList: {
        gap: 15,
        marginBottom: 30,
    },
    // --- Option Styles ---
    optionDefault: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2C2C2E',
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#333',
    },
    optionSelected: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3498DB', // Blue selected state
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#2980B9',
    },
    optionCorrect: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4CAF50', // Green Correct state
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#388E3C',
    },
    optionIncorrect: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C0392B', // Red Incorrect state
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#A93226',
    },
    optionIcon: {
        marginRight: 15,
        width: 20,
        textAlign: 'center',
    },
    optionText: {
        flex: 1,
        color: 'white',
        fontSize: 16,
    },
    // --- Button Styles ---
    submitButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    submitButtonDisabled: {
        backgroundColor: '#555555',
        opacity: 0.7,
    },
    submitButtonText: {
        color: '#151718',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: PIXEL_FONT,
    },
    // --- Feedback Styles ---
    feedbackContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    feedbackCorrect: {
        color: '#4CAF50',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    feedbackIncorrect: {
        color: '#C0392B',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    tryAgainButton: {
        backgroundColor: '#3498DB',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    tryAgainButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});