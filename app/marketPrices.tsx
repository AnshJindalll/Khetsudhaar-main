import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const PIXEL_FONT = 'monospace';

// --- 1. REMOVED SVG IMPORTS ---

// --- 2. Map for easy image lookup (NOW USES require()) ---
const CROP_IMAGES: { [key: string]: any } = {
  banana: require('../assets/images/crops/banana.png'),
  coffee: require('../assets/images/crops/coffee.png'),
  black_pepper: require('../assets/images/crops/black_pepper.png'),
  coconut: require('../assets/images/crops/coconut.png'),
  cardamom: require('../assets/images/crops/cardamom.png'),
  ginger: require('../assets/images/crops/ginger.png'), // Added this one from your assets
};

// --- 3. Mock Data for Market Prices (Now with 'id') ---
const MARKET_DATA = [
  { id: 'banana', crop: 'BANANA (Raw)', unit: 'Kg', price: 25.5, trend: 'up', change: 1.2 },
  { id: 'coffee', crop: 'COFFEE (Arabica)', unit: 'Kg', price: 350.0, trend: 'down', change: 5.5 },
  { id: 'black_pepper', crop: 'BLACK PEPPER', unit: 'Kg', price: 550.0, trend: 'stable', change: 0.0 },
  { id: 'coconut', crop: 'COCONUT (Copra)', unit: 'Piece', price: 18.0, trend: 'up', change: 0.5 },
  { id: 'cardamom', crop: 'CARDAMOM (Green)', unit: 'Kg', price: 1800.0, trend: 'down', change: 50.0 },
];

/**
 * Helper component for displaying a single crop's price.
 */
const PriceCard: React.FC<(typeof MARKET_DATA)[0]> = ({
  id,
  crop,
  unit,
  price,
  trend,
  change,
}) => {
  // Determine color and icon based on price trend
  let trendColor = '#B0B0B0'; // Default gray for stable
  let trendIcon = 'minus';
  let trendText = 'STABLE';

  if (trend === 'up') {
    trendColor = '#4CAF50'; // Green
    trendIcon = 'caret-up';
    trendText = `+${change.toFixed(2)}`;
  } else if (trend === 'down') {
    trendColor = '#C0392B'; // Red
    trendIcon = 'caret-down';
    trendText = `-${change.toFixed(2)}`;
  }

  // --- 4. Use the correct image source ---
  // The <Image> component now works because CROP_IMAGES[id] returns a require()
  const cropImageSource = CROP_IMAGES[id] || null; // Fallback for missing image

  return (
    <View style={styles.priceCard}>
      <View style={styles.cropVisuals}>
        {/* Display Crop Image */}
        {cropImageSource && (
          <Image source={cropImageSource} style={styles.cropImage} />
        )}
        <View style={styles.cropInfo}>
          <Text style={styles.cropTitle}>{crop}</Text>
          <Text style={styles.cropUnit}>Price per {unit}</Text>
        </View>
      </View>

      <View style={styles.priceDetails}>
        <Text style={styles.cropPrice}>₹ {price.toFixed(2)}</Text>
        <View style={[styles.trendContainer, { borderColor: trendColor }]}>
          <FontAwesome5
            name={trendIcon as any}
            size={14}
            color={trendColor}
            style={styles.trendIcon}
          />
          <Text style={[styles.trendText, { color: trendColor }]}>{trendText}</Text>
        </View>
      </View>
    </View>
  );
};

// --- Main Screen Component ---
export default function MarketPricesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* --- Market Summary --- */}
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>ALL INDIA SPOT PRICES</Text>
          <Text style={styles.summaryDate}>As of: 17 Nov, 2025</Text>
          <Text style={styles.summaryTip}>
            Prices are indicative and may vary by location.
          </Text>
        </View>

        {/* --- Prices List --- */}
        <View style={styles.pricesList}>
          {MARKET_DATA.map((data) => (
            <PriceCard key={data.id} {...data} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151718', // Dark background
  },
  scrollContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  // --- Summary Styles ---
  summaryBox: {
    backgroundColor: '#2C2C2E',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#0277BD', // Blue from dashboard tile
  },
  summaryTitle: {
    color: '#0277BD',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: PIXEL_FONT,
    marginBottom: 5,
  },
  summaryDate: {
    color: '#DEDEDE',
    fontSize: 14,
    marginBottom: 10,
  },
  summaryTip: {
    color: '#B0B0B0',
    fontSize: 12,
    fontStyle: 'italic',
  },
  // --- Price Card Styles ---
  pricesList: {
    gap: 12,
  },
  priceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#383838',
  },
  // New styles for crop image and info
  cropVisuals: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Allow this side to grow
    marginRight: 8, // Add space between visuals and price
  },
  cropImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#1C1C1E', // Added a background for images with transparency
  },
  cropInfo: {
     flex: 1, // Allow text to wrap if needed
  },
  // Existing styles
  cropTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: PIXEL_FONT,
    flexWrap: 'wrap', // Allow title to wrap
  },
  cropUnit: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  priceDetails: {
    alignItems: 'flex-end',
  },
  cropPrice: {
    color: '#FFD700', // Gold/Yellow for price
    fontSize: 22,
    fontWeight: '900',
    fontFamily: PIXEL_FONT,
    marginBottom: 4,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
  },
  trendIcon: {
    marginRight: 4,
  },
  trendText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});