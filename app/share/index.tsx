import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing, Share, Alert, TextInput, TouchableWithoutFeedback, Keyboard, Platform, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFontFamily } from '../../components/FontConfig';
import { ShareStoreAI } from '../../lib/AI/shareStoreAI';
import { LoadSampleProducts } from '../../lib/inventory';

LoadSampleProducts();
interface SharePageProps {
  fontsLoaded?: boolean;
  onBack?: () => void;
}

const SharePage: React.FC<SharePageProps> = ({ fontsLoaded = true, onBack }) => {
  const [isRegenerating, setIsRegenerating] = useState(false);
//   const [content, setContent] = useState(`🛒 Visit Nanay Rita's Store!
//
// Fresh vegetables, fruits, and daily essentials at unbeatable prices!
//
// 🥬 Fresh Vegetables: ₱20-50
// 🍎 Seasonal Fruits: ₱30-80
// 🥛 Daily Essentials: ₱15-100
//
// 📍 Located at: Barangay San Jose, Batangas City
// ⏰ Open: 6:00 AM - 8:00 PM daily
//
// Come visit us for quality products and friendly service! 🌟`);
  const [content, setContent] = useState('')
  const [isEditing, setIsEditing] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const fetch = async() => {
      const result = await ShareStoreAI({storeName: 'Nanay Rita', location: 'Lahug'})
      setContent(result);
    }

    fetch();
  }, [])
  // Animation refs
  const headerAnimation = useRef(new Animated.Value(0)).current;
  const contentAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;
  const regenerateAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Stagger animations for smooth entrance
    const animations = [
      { animation: headerAnimation, delay: 0 },
      { animation: contentAnimation, delay: 200 },
      { animation: buttonAnimation, delay: 400 },
    ];

    animations.forEach(({ animation, delay }) => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 600,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    const newShare = await ShareStoreAI({storeName: 'Nanay Rita', location: 'Lahug'})

    // Animate regenerate button
    Animated.sequence([
      Animated.timing(regenerateAnimation, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(regenerateAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setContent(newShare);
  }

  const handleShare = async () => {
    try {
      setIsSharing(true);

      // Validate content
      if (!content || content.trim().length === 0) {
        Alert.alert('Error', 'Please add some content to share');
        return;
      }

      const shareOptions = {
        message: content,
        // Remove url property to prevent link conversion
        ...(Platform.OS === 'ios' && { title: 'Share Store' })
      };

      const result = await Share.share(shareOptions);

      if (result.action === Share.sharedAction) {
        // Optional: Show success message
        // Alert.alert('Success', 'Content shared successfully!');
      } else if (result.action === Share.dismissedAction) {
        // console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Share error:', error);

      // Fallback to clipboard
      try {
        Clipboard.setString(content);
        Alert.alert(
          'Share Failed',
          'Unable to share directly. Content copied to clipboard instead. You can paste it in your preferred app.',
          [{ text: 'OK' }]
        );
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError);
        Alert.alert(
          'Error',
          'Unable to share or copy content. Please try again.',
          [{ text: 'OK' }]
        );
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: headerAnimation,
            transform: [
              {
                translateY: headerAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-30, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#4D0045" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontFamily: getFontFamily('bold', fontsLoaded) }]}>
          Share your Store!
        </Text>
        <View style={styles.headerSpacer} />
      </Animated.View>

      {/* Content Card */}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: contentAnimation,
              transform: [
                {
                  translateY: contentAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
                {
                  scale: contentAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.contentCard}>
            <TextInput
              style={[
                styles.editableText,
                { fontFamily: getFontFamily('regular', fontsLoaded) },
                isEditing && styles.editableTextFocused
              ]}
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
              placeholder="Regenerating shareable post..."
              placeholderTextColor="#999"
              onFocus={() => setIsEditing(true)}
              onBlur={() => setIsEditing(false)}
            />
          </View>
          <Text style={[styles.helperText, { fontFamily: getFontFamily('regular', fontsLoaded) }]}>
            {isEditing ? 'Tap outside to finish editing' : 'Click to edit'}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>

      {/* Action Buttons */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            opacity: buttonAnimation,
            transform: [
              {
                translateY: buttonAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={() => Alert.alert('Download', 'Download feature coming soon!')}
        >
          <Ionicons name="download-outline" size={24} color="#4D0045" />
        </TouchableOpacity>

        <Animated.View style={{ transform: [{ scale: regenerateAnimation }] }}>
          <TouchableOpacity
            style={[styles.regenerateButton, isRegenerating && styles.regenerateButtonDisabled]}
            onPress={handleRegenerate}
            disabled={isRegenerating}
          >
            <Text style={[styles.regenerateButtonText, { fontFamily: getFontFamily('medium', fontsLoaded) }]}>
              {isRegenerating ? 'Regenerating...' : 'Regenerate'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Text style={[styles.shareButtonText, { fontFamily: getFontFamily('bold', fontsLoaded) }]}>
            Share
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SharePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    color: '#4D0045',
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // Compensate for back button width
  },
  headerSpacer: {
    width: 40,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  contentCard: {
    backgroundColor: '#E8D5E8',
    borderRadius: 16,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  generatedText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  editableText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    padding: 0, // Remove default padding
    minHeight: 100, // Ensure minimum height for multiline
    textAlignVertical: 'top',
  },
  editableTextFocused: {
    borderColor: '#4D0045',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  helperText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 15,
  },
  downloadButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  regenerateButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: '#4D0045',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  regenerateButtonDisabled: {
    opacity: 0.6,
  },
  regenerateButtonText: {
    color: '#4D0045',
    fontSize: 16,
    textAlign: 'center',
  },
  shareButton: {
    backgroundColor: '#4D0045',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 15,
    shadowColor: '#4D0045',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});
