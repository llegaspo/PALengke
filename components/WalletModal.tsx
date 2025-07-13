import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

interface WalletModalProps {
  visible: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerText}>pay with palengke wallet</Text>
          </View>

          <View style={styles.qrContainer}>
            <QRCode
              value="storename" // Replace with actual store data
              size={200}
            />
            <Text style={styles.storeName}>storename</Text>
          </View>

          <View style={styles.separator} />

          <Text style={styles.specifyAmountText}>
            Specify an amount upon scanning qr code
          </Text>

          <Text style={styles.amountLabel}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Amount</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontFamily: 'BrittiSansTrial-Medium',
    fontSize: 18,
    marginLeft: 10,
    color: '#4D0045',
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  storeName: {
    fontFamily: 'BrittiSansTrial-Regular',
    fontSize: 16,
    marginTop: 10,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#E6E6E6',
    marginVertical: 15,
  },
  specifyAmountText: {
    fontFamily: 'BrittiSansTrial-Light',
    color: '#4D0045',
    marginBottom: 20,
    textAlign: 'center',
  },

  amountLabel: {
    alignSelf: 'flex-start',
    fontFamily: 'BrittiSansTrial-Regular',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#D8BFD8', // Thistle
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontFamily: 'BrittiSansTrial-Regular',
    fontSize: 16,
    backgroundColor: '#F5F5F5'
  },
  addButton: {
    backgroundColor: '#4D0045',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 50,
    elevation: 2,
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontFamily: 'BrittiSansTrial-Bold',
    fontSize: 16,
  },
});

export default WalletModal; 