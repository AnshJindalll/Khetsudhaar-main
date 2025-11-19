import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

// --- Import SVG Assets ---
import Banana from '../assets/images/Banana.svg';
import Coin from '../assets/images/coin.svg';
import FarmIcon from '../assets/images/farm.svg';
import LeafIcon from '../assets/images/leafIcon.svg';
import SusScore from '../assets/images/SusScore.svg';
import UserImage from '../assets/images/UserImage.svg';

// InfoBox helper
const InfoBox = ({ label, value, icon }: { label: string, value: string, icon?: string }) => (
  <View style={styles.infoBoxContainer}>
    <Text style={styles.infoBoxLabel}>{label}</Text>
    <View style={styles.infoBox}>
      {icon === 'farm' && <FarmIcon width={24} height={24} style={styles.infoBoxIcon} />}
      <Text style={styles.infoBoxValue}>{value}</Text>
    </View>
  </View>
);

export default function ProfileScreen() {
  return (
    // Use SafeAreaView as the root
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* --- Profile Picture --- */}
        <View style={styles.UserImageContainer}>
          <UserImage width={128} height={128} style={styles.UserImage} />
        </View>

        {/* --- Main Info Card --- */}
        <View style={styles.mainCard}>
          {/* Top Section */}
          <View style={styles.cardTopRow}>
            <View style={styles.nameSection}>
              <Text style={styles.idNumber}>293232322</Text>
              <Text style={styles.name}>Murti C</Text>
            </View>
            <Banana width={64} height={64} style={styles.Banana} />
          </View>

          {/* Address Section */}
          <View style={styles.addressContainer}>
            <Text style={styles.infoBoxLabel}>ADDRESS</Text>
            <View style={styles.addressPill}>
              <Text style={styles.addressText}>
                45/12, Kunnumpuram Lane, Puthencruz, Kerala 682307
              </Text>
            </View>
          </View>

          {/* Info Grid */}
          <View style={styles.infoGridRow}>
            <InfoBox label="LAND SIZE" value="50KM" icon="farm" />
            <InfoBox label="STATE" value="KERALA" />
          </View>
          <View style={styles.infoGridRow}>
            <InfoBox label="SEASON" value="UIRIPPU" />
            <InfoBox label="HARVESTING" value="AUG-SEPT" />
          </View>
          <View style={styles.infoGridRow}>
            <InfoBox label="RANK" value="#4" />
            <InfoBox label="MKT PRICE(KG)" value="50" />
          </View>

          {/* Points Section */}
          <View style={styles.pointsRow}>
            <View style={styles.pointsBox}>
              <Coin width={24} height={24} />
              <Text style={styles.pointsText}>2000</Text>
            </View>
            <View style={styles.pointsBox}>
              <LeafIcon width={24} height={24} />
              <Text style={styles.pointsText}>8000</Text>
            </View>
          </View>
        </View>

        {/* --- Sustainability Score --- */}
        <View style={styles.sustainabilityCard}>
          <SusScore width={80} height={80} style={styles.gaugeIcon} />
          <View>
            <Text style={styles.sustainabilityTitle}>SUSTAINABILITY SCORE</Text>
            <Text style={styles.sustainabilityValue}>LOW</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 20,
  },
  UserImageContainer: {
    alignItems: 'center',
    marginBottom: -64,
    zIndex: 1,
  },
  UserImage: {
    borderRadius: 64,
    borderWidth: 4,
    borderColor: 'white',
    overflow: 'hidden',
  },
  mainCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 24,
    padding: 24,
    paddingTop: 80,
    marginTop: 16,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nameSection: {
    flex: 1,
  },
  idNumber: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 4,
  },
  Banana: {
    marginLeft: 16,
  },
  addressContainer: {
    marginTop: 16,
  },
  addressPill: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 99,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 4,
  },
  addressText: {
    color: '#C8E6C9',
    fontSize: 14,
  },
  infoGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 16,
  },
  infoBoxContainer: {
    flex: 1,
  },
  infoBoxLabel: {
    color: '#9E9E9E',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  infoBox: {
    backgroundColor: '#3E3E42',
    borderRadius: 12,
    padding: 12,
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBoxIcon: {
    marginRight: 8,
  },
  infoBoxValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 16,
  },
  pointsBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 99,
    paddingVertical: 12,
    gap: 10,
  },
  pointsText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sustainabilityCard: {
    backgroundColor: 'rgba(192, 22, 22, 0.7)',
    borderColor: '#C01616',
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gaugeIcon: {
    marginRight: 16,
  },
  sustainabilityTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  sustainabilityValue: {
    color: '#FF5252',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
});