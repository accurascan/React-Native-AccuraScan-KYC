import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Button, Dimensions } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AccurascanKyc from 'accurascan_kyc';

const CustomPopup = ({ isVisible, onClose, PassportNo,DOB, DOE, onNFCResult}) => {
  const [dob, setDob] = useState(null);
  const [doe, setDoe] = useState(null);
  const [isDobPickerVisible, setDobPickerVisibility] = useState(false);
  const [isDoePickerVisible, setDoePickerVisibility] = useState(false);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); 
    return `${day}-${month}-${year}`;
  };

  const formatDateForFunction = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}${month}${year}`;
  };

  const handleDobConfirm = (date) => {
    const formattedDate = formatDate(date);
    setDob(formattedDate);
    setDobPickerVisibility(false);
  };

  const handleDoeConfirm = (date) => {
    const formattedDate = formatDate(date);
    setDoe(formattedDate);
    setDoePickerVisibility(false);
  };

  const handleNFC = () => {

    const dobToPass = dob ? formatDateForFunction(new Date(dob)) : DOB.replace(/-/g, '');
    const doeToPass = doe ? formatDateForFunction(new Date(doe)) : DOE.replace(/-/g, '');
    console.log(`handleNFC dob:- ${dobToPass} doe:- ${doeToPass} passportNo:- ${PassportNo}`)
    let passArgs = [
      PassportNo,
      dobToPass,
      doeToPass
    ]; 
    // Hide the popup before starting NFC
    onClose();

    //Method for start OCR scaning from native OS.
    AccurascanKyc.startNFC(passArgs, (error, response) => {
      if (error != null) {
        console.log('Failure!', error);
        // this.showAlert('Failure!', error);
        onNFCResult({ error });
      } else {
        const res = this.getResultJSON(response);
       console.log("NFC_response: ", res)
       onNFCResult({ response: res });
      }
    });
  }
 

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.popupContainer}>
          <View style={styles.header}>
            <Text style={styles.userId}>User Id: {PassportNo}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>

            <View style={styles.header}>
              <Text style={styles.label}>Date of Birth:</Text>
              <TouchableOpacity onPress={() => setDobPickerVisibility(true)}>
                <Text style={styles.dateText}>{dob || DOB}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.header}>
              <Text style={styles.label}>Date of Expiry:</Text>
              <TouchableOpacity onPress={() => setDoePickerVisibility(true)}>
                <Text style={styles.dateText}>{doe || DOE}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.startButtonContainer}>
              <Button title="Start NFC" onPress={handleNFC} />
            </View>
          </View>

          <DateTimePickerModal
            isVisible={isDobPickerVisible}
            mode="date"
            onConfirm={handleDobConfirm}
            onCancel={() => setDobPickerVisibility(false)}
          />

          <DateTimePickerModal
            isVisible={isDoePickerVisible}
            mode="date"
            onConfirm={handleDoeConfirm}
            onCancel={() => setDoePickerVisibility(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background
  },
  popupContainer: {
    width: Dimensions.get('window').width - 40, // Full screen minus 20 from left and right
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 24,
    color: 'black',
  },
  content: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
  dateText: {
    fontSize: 16,
    color: 'blue',
    marginTop: 5,
  },
  startButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default CustomPopup;
