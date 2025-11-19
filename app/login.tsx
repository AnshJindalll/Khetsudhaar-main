import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Import the SVG with the correct name
import UserIcon from '../assets/images/user.svg';

// --- OTP OVERLAY COMPONENT ---
interface OtpOverlayProps {
  onConfirm: () => void; 
  onClose: () => void;
  mobileNo: string;
}

const OtpOverlay: React.FC<OtpOverlayProps> = ({ onConfirm, onClose, mobileNo }) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleResendOtp = () => {
      if (timer === 0) {
          console.log(`Resending OTP to ${mobileNo}...`);
          setTimer(30); // Reset timer
      }
  };
  
  const isOtpComplete = otp.every(digit => digit.length === 1);

  return (
    <View style={overlayStyles.fullScreenOverlay}>
      <View style={overlayStyles.otpBox}>
        <TouchableOpacity style={overlayStyles.closeButton} onPress={onClose}>
            <Text style={overlayStyles.closeText}>X</Text>
        </TouchableOpacity>
        <Text style={overlayStyles.enterOtpText}>ENTER OTP</Text>
        <View style={overlayStyles.otpInputContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => {
                if (el) {
                  inputRefs.current[index] = el;
                }
              }}
              style={overlayStyles.otpInput}
              value={digit}
              onChangeText={(text) => handleOtpChange(text.slice(-1), index)}
              keyboardType="numeric"
              maxLength={1}
              autoFocus={index === 0}
              onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace' && digit === '' && index > 0) {
                      inputRefs.current[index - 1]?.focus();
                  }
              }}
            />
          ))}
        </View>
        <TouchableOpacity
          style={[
            overlayStyles.confirmButton,
            isOtpComplete ? overlayStyles.confirmButtonActive : overlayStyles.confirmButtonDisabled,
          ]}
          disabled={!isOtpComplete}
          onPress={onConfirm}>
          <Text style={overlayStyles.confirmButtonText}>CONFIRM</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleResendOtp} disabled={timer !== 0}>
            <Text style={overlayStyles.resendText}>
                RESEND OTP? {timer > 0 ? `${timer}SEC` : 'RESEND'}
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
// --- END OF OTP OVERLAY ---


// --- LOGIN SCREEN MAIN COMPONENT ---
export default function LoginScreen() {
  const router = useRouter();
  // Read the lesson ID that was passed from the reward page
  const { lesson_completed } = useLocalSearchParams<{ lesson_completed?: string }>();

  const [fullName, setFullName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [agriStackId, setAgriStackId] = useState('');
  const [showOtpOverlay, setShowOtpOverlay] = useState(false);

  const handleSendOTP = () => {
    if (mobileNo.length === 10) {
        // Mock sending OTP
        console.log('Sending OTP (Mock)...');
        setShowOtpOverlay(true); 
    } else {
        Alert.alert('Invalid Phone', 'Please enter a valid 10-digit mobile number');
    }
  };

  const handleConfirmLogin = () => {
    console.log('Logging in...');
    // Pass the lesson_completed ID forward to the lessons page!
    router.replace({
      pathname: '/lessons',
      params: { lesson_completed: lesson_completed } 
    }); 
  };
  
  const handleOtpConfirmation = () => {
      // Mock verifying OTP
      console.log('OTP Verified (Mock)');
      setShowOtpOverlay(false); 
      handleConfirmLogin(); 
  };

  const isSendOtpActive = mobileNo.length === 10;
  const isFinalConfirmActive = false; 

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>LOGIN</Text>
        
        <View style={styles.avatarContainer}>
          <UserIcon width={100} height={100} /> 
        </View>

        <Text style={styles.inputLabel}>FULL NAME</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Full name"
          placeholderTextColor="#A0A0A0"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.inputLabel}>MOBILE NO.</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone no."
          placeholderTextColor="#A0A0A0"
          keyboardType="numeric"
          maxLength={10}
          value={mobileNo}
          onChangeText={setMobileNo}
        />

        <Text style={styles.inputLabel}>AGRISTACK ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your agristack id"
          placeholderTextColor="#A0A0A0"
          value={agriStackId}
          onChangeText={setAgriStackId}
        />

        <TouchableOpacity 
          style={[
            styles.sendOtpButton,
            isSendOtpActive ? styles.sendOtpButtonActive : styles.sendOtpButtonDisabled,
          ]}
          disabled={!isSendOtpActive}
          onPress={handleSendOTP}>
          <Text style={styles.sendOtpButtonText}>SEND OTP</Text>
        </TouchableOpacity>

        <View style={styles.accountLinkContainer}>
          <Text style={styles.accountLinkText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => console.log('Navigate to Create one')}>
            <Text style={styles.createOneText}>Create one</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.dataNote}>DATA AS PER FARMER REGISTRY 2025</Text>

        <TouchableOpacity
          style={[
            styles.confirmButton,
            isFinalConfirmActive ? styles.confirmButtonActive : styles.confirmButtonDisabled,
          ]}
          disabled={!isFinalConfirmActive}
          onPress={handleConfirmLogin}>
          <Text style={styles.confirmButtonText}>CONFIRM</Text>
        </TouchableOpacity>
        
      </ScrollView>
      
      {showOtpOverlay && (
        <OtpOverlay 
            onConfirm={handleOtpConfirmation} 
            onClose={() => setShowOtpOverlay(false)} 
            mobileNo={mobileNo}
        />
      )}
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#151718',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  avatarContainer: {
    backgroundColor: '#333333',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  inputLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    width: '100%',
    backgroundColor: '#333333',
    color: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444444',
  },
  sendOtpButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 25,
  },
  sendOtpButtonActive: {
    backgroundColor: '#388e3c',
  },
  sendOtpButtonDisabled: {
    backgroundColor: '#555555',
  },
  sendOtpButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  accountLinkContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  accountLinkText: {
    color: '#B0B0B0',
    fontSize: 14,
    marginRight: 5,
  },
  createOneText: {
    color: '#388e3c',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  dataNote: {
    color: '#B0B0B0',
    fontSize: 12,
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  confirmButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
  },
  confirmButtonDisabled: {
    backgroundColor: '#555555',
  },
  confirmButtonActive: {
    backgroundColor: '#388e3c',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const overlayStyles = StyleSheet.create({
    fullScreenOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10, 
    },
    otpBox: {
        width: '85%',
        maxWidth: 350,
        backgroundColor: '#333333',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#444444',
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        padding: 5,
    },
    closeText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    enterOtpText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: 10,
        letterSpacing: 1.5,
        borderBottomWidth: 2,
        borderColor: '#FFFFFF',
        paddingBottom: 5,
    },
    otpInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 25,
    },
    otpInput: {
        width: 50,
        height: 50,
        backgroundColor: '#151718',
        borderRadius: 10,
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#555555',
    },
    confirmButton: {
        width: '70%',
        paddingVertical: 12,
        borderRadius: 30,
        marginBottom: 15,
    },
    confirmButtonDisabled: {
        backgroundColor: '#555555',
    },
    confirmButtonActive: {
        backgroundColor: '#388e3c',
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    resendText: {
        color: '#FDD835',
        fontSize: 14,
        fontWeight: '500',
    },
});