import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing, Share, Alert, TextInput, TouchableWithoutFeedback, Keyboard, Platform, Clipboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getFontFamily } from '../../components/FontConfig';

interface SharePageProps {
  fontsLoaded?: boolean;
  onBack?: () => void;
}

const SharePage: React.FC<SharePageProps> = ({ fontsLoaded = true, onBack }) => {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [content, setContent] = useState(`🛒 Visit Nanay Rita's Store! 

Fresh vegetables, fruits, and daily essentials at unbeatable prices!

🥬 Fresh Vegetables: ₱20-50
🍎 Seasonal Fruits: ₱30-80  
🥛 Daily Essentials: ₱15-100

📍 Located at: Barangay San Jose, Batangas City
⏰ Open: 6:00 AM - 8:00 PM daily

Come visit us for quality products and friendly service! 🌟`);
  const [isEditing, setIsEditing] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // Animation refs
  const headerAnimation = useRef(new Animated.Value(0)).current;
  const contentAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;
  const regenerateAnimation = useRef(new Animated.Value(1)).current;
  const rotationAnimation = useRef(new Animated.Value(0)).current;

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

    // Start continuous rotation animation for gradient border
    const startRotation = () => {
      rotationAnimation.setValue(0);
      Animated.timing(rotationAnimation, {
        toValue: 1,
        duration: 4000, // 4 seconds for full rotation
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => startRotation()); // Loop continuously
    };
    startRotation();
  }, []);

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    
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

    // Simulate AI generation delay
    setTimeout(() => {
      const sampleContents = [
        `🛒 Visit Nanay Rita's Store! 

Fresh vegetables, fruits, and daily essentials at unbeatable prices!

🥬 Fresh Vegetables: ₱20-50
🍎 Seasonal Fruits: ₱30-80  
🥛 Daily Essentials: ₱15-100

📍 Located at: Barangay San Jose, Batangas City
⏰ Open: 6:00 AM - 8:00 PM daily

Come visit us for quality products and friendly service! 🌟`,

        `🌟 Nanay Rita's Fresh Market 

Your neighborhood store for quality goods at affordable prices!

🛍️ What we offer:
• Farm-fresh vegetables
• Ripe seasonal fruits  
• Household essentials
• Snacks and beverages

💰 Great prices, great quality!
📍 Barangay San Jose, Batangas City
🕕 Daily: 6:00 AM - 8:00 PM

Thank you for supporting local business! ❤️`,

        `🏪 Nanay Rita's General Store

Quality products • Affordable prices • Friendly service

🥕 Fresh produce daily
🍌 Seasonal fruits available
🧴 Household necessities
☕ Snacks & refreshments

📍 Find us at: Barangay San Jose, Batangas City
⏰ Store hours: 6:00 AM - 8:00 PM

Supporting our community, one customer at a time! 🤝`
      ];
      
      const randomContent = sampleContents[Math.floor(Math.random() * sampleContents.length)];
      setContent(randomContent);
      setIsRegenerating(false);
    }, 1500);
  };

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
          {/* Gradient Border Wrapper */}
          <View style={styles.gradientWrapper}>
            <Animated.View 
              style={[
                styles.gradientBorderContainer,
                {
                  transform: [
                    {
                      rotate: rotationAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                },
              ]}
            >
              <LinearGradient
                colors={['#FF6B9D', '#4D0045', '#8B5FBF', '#D946EF', '#FF6B9D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBorder}
              />
            </Animated.View>
            
            {/* Content Card */}
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
                placeholder="Enter your store information..."
                placeholderTextColor="#999"
                onFocus={() => setIsEditing(true)}
                onBlur={() => setIsEditing(false)}
              />
            </View>
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
    backgroundColor: '#F8F9FA', // Slightly warmer background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 24, // Increased for better spacing
    paddingBottom: 24, // Increased for better spacing
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0, // Removed border for cleaner look
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  backButton: {
    width: 44, // Larger touch target
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: '#F8F9FA',
  },
  headerTitle: {
    fontSize: 24,
    color: '#1A1A1A', // Darker for better contrast
    flex: 1,
    textAlign: 'center',
    marginRight: 44, // Compensate for back button width
    fontWeight: '600',
  },
  headerSpacer: {
    width: 44,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24, // Increased padding
    paddingTop: 40, // More generous top spacing
    paddingBottom: 20,
    position: 'relative',
  },
  gradientWrapper: {
    position: 'relative',
  },
  gradientBorderContainer: {
    position: 'absolute',
    top: -3, // Offset to create border effect
    left: -3,
    right: -3,
    bottom: -3,
    zIndex: 0,
    borderRadius: 23, // Slightly larger than content card
  },
  gradientBorder: {
    flex: 1,
    borderRadius: 23,
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20, // More rounded corners
    padding: 32, // More generous padding
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08, // Softer shadow
    shadowRadius: 20,
    elevation: 8,
    zIndex: 1, // Ensure it's above the gradient
    position: 'relative',
  },
  generatedText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  editableText: {
    fontSize: 16,
    color: '#2D3748', // Better text color
    lineHeight: 26, // Improved line height
    padding: 0,
    minHeight: 120, // Slightly larger
    textAlignVertical: 'top',
    fontWeight: '400',
  },
  editableTextFocused: {
    borderColor: '#4D0045',
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#FAFBFC', // Subtle background when focused
  },
  helperText: {
    fontSize: 14,
    color: '#718096', // More muted color
    textAlign: 'center',
    marginTop: 16, // Increased spacing
    fontWeight: '400',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 20, // Increased gap
  },
  downloadButton: {
    width: 56, // Larger
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  regenerateButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28, // More rounded
    paddingHorizontal: 28, // Better padding
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#4D0045',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    minWidth: 120, // Ensure consistent width
  },
  regenerateButtonDisabled: {
    opacity: 0.6,
  },
  regenerateButtonText: {
    color: '#4D0045',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  shareButton: {
    backgroundColor: '#4D0045',
    borderRadius: 28, // More rounded
    paddingHorizontal: 32, // Better padding
    paddingVertical: 16,
    shadowColor: '#4D0045',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    minWidth: 100, // Ensure consistent width
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
}); 