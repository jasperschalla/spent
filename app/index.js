import { StyleSheet, View, Modal, SafeAreaView } from 'react-native';
import { BottomNavigation } from '../components/BottomNavigation';
import React, { useState, useContext } from 'react';
import { ModalView } from '../components/ModalView';
import { Feed } from '../components/Feed';
import { Summary } from '../components/Summary';
import { AppContext } from '../context/context';
import { MonthPicker } from '../components/MonthPicker';
import { ScrollView } from 'react-native-virtualized-view'

const homeStyle = StyleSheet.create({
    container: {
      display: 'flex',
      color: "white",
      backgroundColor: "#111211",
      height: "100%",
      width: "100%",
      position: "relative"
    }
  });
  

const HomePage = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const { expenses, setExpenses, typeItems, setTypeItems} = useContext(AppContext)

  const availableMonths = expenses.map((expense) => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'long' })
    const year = new Date(expense.date).getFullYear()
    return {...expense, order: `${month} ${year}`}
  })

  const uniqueMonths = [...new Map(availableMonths.map(item =>
  [item["order"], item])).values()];
  const sortedMonths = uniqueMonths.sort((a,b) => new Date(a.date) - new Date(b.date)).map(month => month.order)

  const [selectedMonth, setSelectedMonth] = useState(`${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`)

  return (
    <View style={homeStyle.container}>
      <ScrollView>
        <MonthPicker months={sortedMonths} setSelectedMonth={setSelectedMonth} selectedMonth={selectedMonth}/>
        <Summary expenses={expenses} typeItems={typeItems} selectedMonth={selectedMonth} timeType="monthly"/>
        <Feed setExpenses={setExpenses} expenses={expenses} typeItems={typeItems} selectedMonth={selectedMonth}/>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
          <ModalView typeItems={typeItems} setExpenses={setExpenses} setModalVisible={setModalVisible}/>
      </Modal>
      <BottomNavigation setModalVisible={setModalVisible}/>
    </View>
  );
}

export default HomePage;