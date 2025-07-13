import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { businessReportPDF } from '../lib/pdfConvert';
import * as Sharing from 'expo-sharing';

const PDFTestPage = () => {
  const handleGeneratePDF = async () => {
    try {
      const filePath = await businessReportPDF({
        date: new Date(),
        totalSales: 15000,
        COGS: 5000,
        platformFee: 1000,
        adsNPromotion: 800,
        netProfit: 6200,
        netMargin: 12,
      });

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  return (
   <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Button title="Generate Business Report PDF" onPress={handleGeneratePDF} />
    </View>
  );
};

export default PDFTestPage;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
});

