import { StyleSheet, View, Modal, Text } from 'react-native';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import React, { useState, useCallback, useEffect } from 'react';
import { ModalView } from './components/ModalView';
import { Feed } from './components/Feed';
import { Summary } from './components/Summary';
import { getDBConnection, getAllExpenses, createTable } from './database/db-service';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    color: "white",
    backgroundColor: "#111211",
    height: "100%",
    width: "100%",
    position: "relative"
  }
});


export default function App() {

  const [modalVisible, setModalVisible] = useState(true);
  const [expenses, setExpenses] = useState([]);

  const loadData = useCallback(async () => {
    try {
        const db = await getDBConnection()
        await createTable(db)
        await getAllExpenses(db, setExpenses)

    } catch (error) {
      console.error(error);
    }
  },[])

  useEffect(() => {
    loadData();
  }, [loadData,modalVisible]);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
          <ModalView setModalVisible={setModalVisible}/>
      </Modal>
      <Header/>
      <Summary expenses={expenses}/>
      <Feed setExpenses={setExpenses} expenses={expenses}/>
      <BottomNavigation setModalVisible={setModalVisible}/>
    </View>
  );
}