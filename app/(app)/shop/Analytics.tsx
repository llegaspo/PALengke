import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EarningsCard from './EarningsCard';
import StatCardsRow from './StatCardsRow';
import TotalProfitCard from './TotalProfitCard';
import { useRouter } from 'expo-router';
import { getFontFamily } from '../../../components/FontConfig';

interface AnalyticsProps {
  onBack?: () => void;
}

const BAR_DATA = [
  { value: 80, color: '#6B026F' },
  { value: 60, color: '#9920A6' },
  { value: 40, color: '#BF5DC8' },
  { value: 110, color: '#CA9ECF' },
  { value: 70, color: '#BF6AC5' },
  { value: 50, color: '#E397EA' },
  { value: 35, color: '#77117B' },
];

const TOTAL_SPENT = '-₱150.00';
const PROFIT_TODAY = '+₱50.00';
const PROFIT_WEEKLY = '+₱350.00';
const TOTAL_PROFIT = '+₱200.00';
const PROFIT_LABEL = '📈 Total Profit';
const PROFIT_DATE = 'As of July 25, 2025';

const Analytics: React.FC<AnalyticsProps> = ({ onBack }) => {
  const [profitTab, setProfitTab] = useState<'today' | 'weekly'>('today');
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.innerWrapper}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack || (() => router.push('/shop'))}>
          <Ionicons name="arrow-back" size={28} color="#720877" />
        </TouchableOpacity>
        <Text style={styles.analyticsTitle}>Analytics</Text>
        <View style={styles.earningsCardWrapper}>
          <EarningsCard bars={BAR_DATA} />
        </View>
        <StatCardsRow
          totalSpent={TOTAL_SPENT}
          profitToday={PROFIT_TODAY}
          profitWeekly={PROFIT_WEEKLY}
          profitTab={profitTab}
          onTabChange={setProfitTab}
        />
        <TotalProfitCard
          label={PROFIT_LABEL}
          date={PROFIT_DATE}
          value={TOTAL_PROFIT}
        />
        <TouchableOpacity style={styles.downloadTab} onPress={() => {/* TODO: implement download/report */}}>
          <Ionicons name="download-outline" size={18} color="#720877" style={{ marginRight: 6 }} />
          <Text style={styles.downloadTabText}>Download Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 32,
  },
  innerWrapper: {
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 22,
  },
  backBtn: {
    marginTop: 40,
    marginBottom: 10,
    alignSelf: 'flex-start',
    padding: 2,
  },
  analyticsTitle: {
    fontSize: 28,
    color: '#720877',
    fontWeight: 'bold',
    fontFamily: getFontFamily('bold', true),
    marginBottom: 10,
    marginLeft: 2,
    letterSpacing: 0.2,
  },
  earningsCardWrapper: {
    marginBottom: 8,
  },
  downloadTab: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1.2,
    borderColor: '#720877',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 14,
    marginLeft: 2,
    backgroundColor: '#fff',
  },
  downloadTabText: {
    color: '#720877',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: getFontFamily('bold', true),
    letterSpacing: 0.1,
  },
});

export default Analytics;
