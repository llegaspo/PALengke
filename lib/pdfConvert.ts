import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export interface BusinessReport{
  date: Date,
  totalSales: number,
  COGS: number,
  platformFee: number,
  adsNPromotion: number,
  netProfit: number,
  netMargin: number,
}

export const businessReportPDF = async () => {

 const htmlContent = `
<html>
      <head>
        <style>
          body { font-family: Arial; padding: 20px; }
          h1 { color: #333; padding: 0px; line-height: 1px }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          td, th {
            border: 1px solid #ddd;
            padding: 8px;
          }
          th{
            background-color: red;
          }
        </style>
      </head>
      <body>
        <h1>Weekly Financial Report</h1>
        <span><b>Date Covered:</b> April - June 2025</span>
        <br>
        <h2>Key Metrics Summary</h2>
        <table>
          <tr><th>Description</th><th>This Week</th><th>Last Week</th><th>%change</th></tr>
          <tr><td>Cost of Goods Sold(COGS)</td><td>₱ 5000</td><td>₱ 4300</td><td>+16.2%</td></tr>
          <tr><td>Gross Profit</td><td>₱ 5000</td><td>₱ 4300</td><td>+16.2%</td></tr>
          <tr><td>Operating Expenses</td><td>₱ 5000</td><td>₱ 4300</td><td>+16.2%</td></tr>
          <tr><td>Net Profit</td><td>₱ 5000</td><td>₱ 4300</td><td>+16.2%</td></tr>
          <tr><td>Cash on Hand</td><td>₱ 5000</td><td>₱ 4300</td><td>+16.2%</td></tr>
        </table>
      </body>
    </html>`;

  const { uri } = await Print.printToFileAsync({ html: htmlContent });

  const fileName = `Business_Report_${Date.now()}.pdf`;
  const newPath = FileSystem.documentDirectory + fileName;

  await FileSystem.moveAsync({
    from: uri,
    to: newPath,
  });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(newPath);
  } else {
    alert('Sharing not available on this device');
  }

  return newPath;
  };

