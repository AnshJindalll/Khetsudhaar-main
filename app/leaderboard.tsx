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
import Qcoin from '../assets/images/Qcoin.svg'; // <-- 1. IMPORT YOUR NEW ICON
import Coin from '../assets/images/coin.svg'; // This is for the '1.5X' and '1X'
import WinMascot from '../assets/images/winMascot.svg';

const PIXEL_FONT = 'monospace';

// --- Mock Data based on your image ---
const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Cheruvayal K.', score: 14000 },
  { rank: 2, name: 'Sathyanara B', score: 12000 },
  { rank: 3, name: 'Joseph M', score: 10000 },
  { rank: 4, name: 'Murti C', score: 8000, isUser: true },
  { rank: 5, name: 'Roymon K.A.', score: 6000 },
  { rank: 6, name: 'Raghunathan P.', score: 5000 },
  { rank: 7, name: 'Sasidharan', score: 3000 },
  { rank: 8, name: 'Sujith S.U.', score: 1000 },
];

// --- Reusable Row Component ---
const RankRow = ({
  rank,
  name,
  score,
  isUser = false,
}: {
  rank: number;
  name: string;
  score: number;
  isUser?: boolean;
}) => {
  // Determine special styling
  let cardStyle: StyleProp<ViewStyle> = styles.defaultCard;
  let numberStyle: StyleProp<ViewStyle> = styles.rankNumberContainer;

  if (isUser) {
    cardStyle = styles.userCard;
    numberStyle = [styles.rankNumberContainer, styles.userRankNumber];
  } else if (rank === 1) {
    cardStyle = styles.goldCard;
    numberStyle = [styles.rankNumberContainer, styles.goldRankNumber];
  } else if (rank === 2) {
    cardStyle = styles.silverCard;
    numberStyle = [styles.rankNumberContainer, styles.silverRankNumber];
  } else if (rank === 3) {
    cardStyle = styles.bronzeCard;
    numberStyle = [styles.rankNumberContainer, styles.bronzeRankNumber];
  }

  return (
    <TouchableOpacity style={[styles.rankCardBase, cardStyle]}>
      <View style={numberStyle}>
        <Text style={styles.rankNumber}>{rank}</Text>
      </View>
      <Text style={styles.rankName}>{name}</Text>
      <View style={styles.scoreContainer}>
        <Qcoin width={24} height={24} /> {/* <-- 2. USE YOUR NEW ICON HERE */}
        <Text style={styles.rankScore}>{score}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function LeaderboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* --- Header Section --- */}
        <View style={styles.headerContainer}>
          <WinMascot width={100} height={100} style={styles.mascot} />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>MONTHLY LEADERBOARD</Text>
            <View style={styles.multiplierContainer}>
              <Coin width={24} height={24} style={styles.coinIcon} />
              <Text style={styles.multiplierText}>1.5X</Text>
            </View>
          </View>
        </View>

        {/* --- Leaderboard List --- */}
        <View style={styles.listContainer}>
          {MOCK_LEADERBOARD.map((user) => (
            <React.Fragment key={user.rank}>
              {/* --- 1X Multiplier Divider --- */}
              {user.rank === 4 && (
                <View style={styles.dividerContainer}>
                  <View style={styles.dividerLine} />
                  <View style={styles.dividerChip}>
                    <Coin width={20} height={20} style={styles.coinIcon} />
                    <Text style={styles.multiplierText}>1X</Text>
                  </View>
                  <View style={styles.dividerLine} />
                </View>
              )}
              {/* --- Rank Row --- */}
              <RankRow
                rank={user.rank}
                name={user.name}
                score={user.score}
                isUser={user.isUser}
              />
            </React.Fragment>
          ))}
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
    paddingBottom: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  mascot: {
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: PIXEL_FONT,
    letterSpacing: 1,
  },
  multiplierContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(253, 216, 53, 0.1)',
    borderColor: '#FDD835',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 8,
    alignSelf: 'flex-start',
    // Glow
    shadowColor: '#FDD835',
    shadowOpacity: 0.7,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  coinIcon: {
    marginRight: 6,
  },
  multiplierText: {
    color: '#FDD835',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: PIXEL_FONT,
  },
  listContainer: {
    gap: 12, // Adds space between each row
  },
  // Base style for ALL cards
  rankCardBase: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 2,
    // Base glow for all special cards
    shadowOpacity: 0.7,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  // --- Podium & User Styles ---
  goldCard: {
    backgroundColor: '#544607',
    borderColor: '#FDD835',
    shadowColor: '#FDD835',
  },
  silverCard: {
    backgroundColor: '#4E5357',
    borderColor: '#C0C0C0',
    shadowColor: '#C0C0C0',
  },
  bronzeCard: {
    backgroundColor: '#5C3A21',
    borderColor: '#CD7F32',
    shadowColor: '#CD7F32',
  },
  userCard: {
    backgroundColor: '#1E3A5F', // Special blue for user
    borderColor: '#0277BD',
    shadowColor: '#0277BD',
  },
  // --- Default style for ranks 5+ ---
  defaultCard: {
    backgroundColor: '#333333',
    borderColor: '#424242',
    elevation: 0, // No glow
    shadowOpacity: 0, // No glow
  },
  // --- Rank Number Styles ---
  rankNumberContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  goldRankNumber: {
    backgroundColor: 'rgba(253, 216, 53, 0.2)',
    borderColor: 'rgba(253, 216, 53, 0.5)',
  },
  silverRankNumber: {
    backgroundColor: 'rgba(192, 192, 192, 0.2)',
    borderColor: 'rgba(192, 192, 192, 0.5)',
  },
  bronzeRankNumber: {
    backgroundColor: 'rgba(205, 127, 50, 0.2)',
    borderColor: 'rgba(205, 127, 50, 0.5)',
  },
  userRankNumber: {
    backgroundColor: 'rgba(2, 119, 189, 0.2)',
    borderColor: 'rgba(2, 119, 189, 0.5)',
  },
  rankNumber: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: PIXEL_FONT,
  },
  rankName: {
    flex: 1, // Take up remaining space
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  rankScore: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: PIXEL_FONT,
    marginLeft: 6,
  },
  // --- Divider Styles ---
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#424242',
  },
  dividerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});