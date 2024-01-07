import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from "react-native"
import Dropdown from 'react-native-input-select'
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient'
import uuid from 'react-native-uuid'
import { getDBConnection, insertExpense } from '../database/db-service';

const modalStyle = StyleSheet.create({
    container: {
        position: "absolute",
        top: "20%",
        left: "10%",
        backgroundColor: "#20211e",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    headerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        paddingTop: 5,
    }, 
    inputContainer: {
        display: "flex",
        paddingHorizontal: 10,
    },
    inputLabel: {
        color: "white",
        marginVertical: 10,
    },
    input: {
        backgroundColor: "white",
        height: 40,
        width: 250,
        borderRadius: 5,
        padding: 10
    },
    dropdown: {
        width: 250,
        minHeight: 40,
        margin: 0,
        padding: 0
    },
    btnContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
        width: 250,
    },
    cancelBtn: {
        backgroundColor: "#8e948e",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    addBtn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    blurBackground: {
        position: "relative",
        backgroundColor: "rgba(0,0,0,0.5)",
        height: "100%",
        width: "100%",
    },
    dateContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 250,
    }
})

export const ModalView = ({ setExpenses, typeItems, setModalVisible}) => {

    var id = uuid.v4()

    const [title, setTitle] = useState("")
    const [type,setType] = useState("")
    const [amount, setAmount] = useState()
    const [date,setDate] = useState(new Date())

    const types = typeItems.map((item) => {
        return {label: item.name, value: item.name}
    })

    const addExpense = async () => {
        const db = await getDBConnection()
        const expense = {
            id: id,
            title: title,
            type: type,
            amount: amount.replace(",",".") * 1,
            date: date.toISOString(),
        }
        insertExpense(db,expense,setExpenses)
        setModalVisible(false)
    }

    return (
        <ScrollView contentContainerStyle={modalStyle.blurBackground} keyboardShouldPersistTaps="handled">
            <View style={modalStyle.container}>
                <Text style={modalStyle.headerText}>Add Expense</Text>
                <View style={modalStyle.inputContainer}>
                    <Text style={modalStyle.inputLabel}>Expense</Text>
                    <TextInput style={modalStyle.input} value={title} onChangeText={setTitle}/>
                </View>
                <View style={modalStyle.inputContainer}>
                    <Text style={modalStyle.inputLabel}>Amount (€)</Text>
                    <TextInput style={modalStyle.input} keyboardType='numeric' value={amount} onChangeText={setAmount}/>
                </View>
                <View style={modalStyle.inputContainer}>
                    <Text style={modalStyle.inputLabel}>Type</Text>
                    <Dropdown
                        label=""
                        placeholder="Select an option..."
                        options={types}
                        selectedValue={type}
                        onValueChange={(value) => setType(value)}
                        primaryColor={'#20211e'}
                        isSearchable
                        dropdownStyle={modalStyle.dropdown}
                    />
                </View>
                <View style={modalStyle.dateContainer}>
                    <DateTimePicker value={date} onChange={(event, selectedDate) => setDate(selectedDate)} themeVariant="dark" accentColor="#38b9af"/>
                </View>
                <View style={modalStyle.btnContainer}>
                        <Pressable style={modalStyle.cancelBtn} onPress={() => setModalVisible(false)}>
                            <Text style={{color: "white"}}>Cancel</Text>
                        </Pressable>
                        <Pressable style={modalStyle.addBtn} onPress={addExpense}>
                            <LinearGradient colors={['#22b5c3', '#d8d61d']} style={modalStyle.addBtn}>
                                <Text style={{color: "white"}}>Add</Text>
                            </LinearGradient>
                        </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}