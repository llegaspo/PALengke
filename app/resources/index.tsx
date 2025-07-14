import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  Linking, 
  Alert,
  Animated,
  Easing,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFontFamily } from '../../components/FontConfig';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface Article {
  id: string;
  title: string;
  preview: string;
  readTime: string;
  date: string;
  category: string;
  url: string;
  imageUrl: string;
  featured?: boolean;
}

interface ResourcesProps {
  fontsLoaded?: boolean;
  onBack?: () => void;
}

const Resources: React.FC<ResourcesProps> = ({ fontsLoaded = true, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  
  // Animation refs
  const headerAnimation = useRef(new Animated.Value(0)).current;
  const searchAnimation = useRef(new Animated.Value(0)).current;
  const articlesAnimation = useRef(new Animated.Value(0)).current;

  const articles: Article[] = [
    {
      id: '1',
      title: 'From Domestic Helper to Construction CEO: Lyn Macanas Success Story',
      preview: 'Samar-born entrepreneur built thriving construction empire, now launching beauty line...',
      readTime: '6 min read',
      date: 'Mar 12, 2025',
      category: 'Success Stories',
      url: 'https://manilastandard.net/lifestyle/314567801/how-lyn-macanas-scripts-her-teleserye-worthy-success-story.html',
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=200&fit=crop',
      featured: true
    },
    {
      id: '2',
      title: 'Filipina Rises to McDonald\'s National Field President in US',
      preview: 'Myra Doria from Pampanga now oversees 14,000 restaurants after 40-year journey...',
      readTime: '8 min read',
      date: 'Mar 28, 2025',
      category: 'Success Stories',
      url: 'https://manilastandard.net/lifestyle/314573590/the-inspiring-story-of-myra-doria.html',
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop'
    },
    {
      id: '3',
      title: 'OFW Returns Home to Create Opportunities for Women Farmers',
      preview: 'Evelyn de Guzman Breguera built Abundance Agri-Tourism after 17 years abroad...',
      readTime: '7 min read',
      date: 'Nov 23, 2024',
      category: 'Business Growth',
      url: 'https://manilastandard.net/business/314527249/ofw-creates-opportunities-for-women-farmers-youth.html',
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=200&fit=crop'
    },
    {
      id: '4',
      title: 'Pampangueña Rises Above Poverty, Builds P50K Sari-Sari Business',
      preview: 'Maryjoy Delara started with P500, now supports family through store success...',
      readTime: '5 min read',
      date: 'Mar 31, 2025',
      category: 'Operations',
      url: 'https://manilastandard.net/lifestyle/314574642/from-struggle-to-success-pampanguena-rises-above-poverty-builds-biz.html',
      imageUrl: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=400&h=200&fit=crop'
    },
    {
      id: '5',
      title: 'TinapaIsLife: E-Commerce Fish Processing Empowers Local Communities',
      preview: 'Elizabeth M. and team bring healthy tinapa products from Bataan to Metro Manila...',
      readTime: '6 min read',
      date: 'Aug 15, 2024',
      category: 'Finance',
      url: 'https://www.linkedin.com/company/tinapaislife-fish-processing',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=200&fit=crop'
    },
    {
      id: '6',
      title: 'Filipino Women Dominate Sari-Sari Store Ownership, Boost Economy',
      preview: 'Women own 75% of sari-sari stores, control local economy...',
      readTime: '5 min read',
      date: 'Mar 24, 2023',
      category: 'Networking',
      url: 'https://newsinfo.inquirer.net/1747639/filipino-women-take-charge-of-local-economy-as-study-finds-them-dominating-sari-sari-store-ownership',
      imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=200&fit=crop'
    }
  ];

  useEffect(() => {
    // Initialize with all articles
    setFilteredArticles(articles);
    
    // Stagger animations
    const animations = [
      { animation: headerAnimation, delay: 0 },
      { animation: searchAnimation, delay: 200 },
      { animation: articlesAnimation, delay: 400 },
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

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  }, [searchQuery]);

  const handleArticlePress = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open this article');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while opening the article');
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Success Stories': '#FF6B6B',
      'Business Growth': '#4ECDC4',
      'Finance': '#45B7D1',
      'Operations': '#FECA57',
      'Networking': '#9B59B6'
    };
    return colors[category] || '#95A5A6';
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
        {onBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#4D0045" />
          </TouchableOpacity>
        )}
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { fontFamily: getFontFamily('bold', fontsLoaded) }]}>
            Resources
          </Text>
          <Text style={[styles.headerSubtitle, { fontFamily: getFontFamily('regular', fontsLoaded) }]}>
            Real success stories from women entrepreneurs
          </Text>
        </View>
      </Animated.View>

      {/* Search Bar */}
      <Animated.View 
        style={[
          styles.searchContainer,
          {
            opacity: searchAnimation,
            transform: [
              {
                translateY: searchAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={[styles.searchInput, { fontFamily: getFontFamily('regular', fontsLoaded) }]}
            placeholder="Search articles..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      {/* Articles List */}
      <Animated.View 
        style={[
          styles.articlesContainer,
          {
            opacity: articlesAnimation,
            transform: [
              {
                translateY: articlesAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                }),
              },
            ],
          },
        ]}
      >
        <ScrollView 
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.articlesGrid}>
            {filteredArticles.map((article, index) => (
              <TouchableOpacity
                key={article.id}
                style={[
                  styles.articleCard,
                  article.featured && styles.featuredCard
                ]}
                onPress={() => handleArticlePress(article.url)}
                activeOpacity={0.8}
              >
                {article.featured && (
                  <LinearGradient
                    colors={['#4D0045', '#7B2D6B']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.featuredGradient}
                  >
                    <View style={styles.featuredBadge}>
                      <Ionicons name="star" size={10} color="#FFFFFF" />
                      <Text style={[styles.featuredText, { fontFamily: getFontFamily('medium', fontsLoaded) }]}>
                        Featured
                      </Text>
                    </View>
                  </LinearGradient>
                )}
                
                {/* Article Image */}
                <View style={styles.imageContainer}>
                  <Image 
                    source={{ uri: article.imageUrl }}
                    style={styles.articleImage}
                    resizeMode="cover"
                    onError={() => {
                      // Handle image load error silently
                      console.log('Image failed to load for article:', article.title);
                    }}
                    defaultSource={require('../../assets/png/palengke.png')}
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.6)']}
                    style={styles.imageOverlay}
                  />
                </View>
                
                <View style={styles.articleContent}>
                  <View style={styles.articleHeader}>
                    <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(article.category) }]}>
                      <Text style={[styles.categoryText, { fontFamily: getFontFamily('medium', fontsLoaded) }]}>
                        {article.category}
                      </Text>
                    </View>
                    <View style={styles.articleMeta}>
                      <Text style={[styles.metaText, { fontFamily: getFontFamily('regular', fontsLoaded) }]}>
                        {article.date}
                      </Text>
                      <View style={styles.metaDivider} />
                      <Text style={[styles.metaText, { fontFamily: getFontFamily('regular', fontsLoaded) }]}>
                        {article.readTime}
                      </Text>
                    </View>
                  </View>

                  <Text style={[
                    styles.articleTitle, 
                    { fontFamily: getFontFamily('bold', fontsLoaded) },
                    article.featured && styles.featuredTitle
                  ]}>
                    {article.title}
                  </Text>

                  <Text style={[
                    styles.articlePreview, 
                    { fontFamily: getFontFamily('regular', fontsLoaded) },
                    article.featured && styles.featuredPreview
                  ]}>
                    {article.preview}
                  </Text>

                  <View style={styles.readMoreContainer}>
                    <Text style={[
                      styles.readMoreText, 
                      { fontFamily: getFontFamily('medium', fontsLoaded) },
                      article.featured && styles.featuredReadMore
                    ]}>
                      Read full article
                    </Text>
                    <Ionicons 
                      name="arrow-forward" 
                      size={14} 
                      color={article.featured ? "#4D0045" : "#4D0045"} 
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {filteredArticles.length === 0 && (
            <View style={styles.noResultsContainer}>
              <Ionicons name="search" size={64} color="#E0E0E0" />
              <Text style={[styles.noResultsText, { fontFamily: getFontFamily('medium', fontsLoaded) }]}>
                No articles found
              </Text>
              <Text style={[styles.noResultsSubtext, { fontFamily: getFontFamily('regular', fontsLoaded) }]}>
                Try searching with different keywords
              </Text>
            </View>
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default Resources;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 15,
    marginTop: 5,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 32,
    color: '#4D0045',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  articlesContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  articlesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  articleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
    width: (width - 60) / 2, // Responsive width for 2 columns with proper margins
  },
  featuredCard: {
    shadowOpacity: 0.2,
    elevation: 8,
  },
  featuredGradient: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredText: {
    fontSize: 10,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  imageContainer: {
    position: 'relative',
    height: 120,
    width: '100%',
  },
  articleImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  articleContent: {
    padding: 15,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  categoryBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    flex: 1,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  articleMeta: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  metaText: {
    fontSize: 9,
    color: '#999',
  },
  metaDivider: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#DDD',
    marginVertical: 2,
  },
  articleTitle: {
    fontSize: 14,
    color: '#333',
    lineHeight: 18,
    marginBottom: 8,
  },
  featuredTitle: {
    color: '#4D0045',
    fontSize: 15,
  },
  articlePreview: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 12,
  },
  featuredPreview: {
    color: '#555',
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: 12,
    color: '#4D0045',
    marginRight: 4,
  },
  featuredReadMore: {
    color: '#4D0045',
    fontWeight: '600',
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: 18,
    color: '#999',
    marginTop: 20,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#BBB',
  },
}); 