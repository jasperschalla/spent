import { View, Text, StyleSheet, TextInput, Pressable, ScrollView} from "react-native"
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useContext,useState } from "react";
import { AppContext } from "../../context/context";
import Dropdown from 'react-native-input-select'
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient'
import { updateExpense, getDBConnection } from "../../database/db-service";

const editStyle = StyleSheet.create({
    container: {
        display: 'flex',
        color: "white",
        backgroundColor: "#111211",
        height: "100%",
        width: "100%",
        position: "relative",
        alignItems: "center",
        padding: 10,
      },
    headerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        paddingTop: 5,
        alignSelf: "center",
        marginVertical: 20
    },
    inputContainer: {
        display: "flex",
        paddingHorizontal: 10,
        marginBottom: 20
    },
    inputLabel: {
        color: "white",
        marginVertical: 10,
    },
    input: {
        backgroundColor: "white",
        height: 40,
        width: 300,
        borderRadius: 5,
        padding: 10
    },
    dropdown: {
        width: 300,
        minHeight: 40,
        margin: 0,
        padding: 0
    },
    dateContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 300,
    },
    btnContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40
    },
    addBtn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
})

const EditPage = () => {

    const router = useRouter()

    const { expenseId } = useLocalSearchParams()
    const { expenses, typeItems, setExpenses } = useContext(AppContext)

    const expense = expenses.find(expense => expense.id === expenseId)

    const [title,setTitle] = useState(expense.title)
    const [amount,setAmount] = useState(String(expense.amount).replace(".",","))
    const [date,setDate] = useState(new Date(expense.date))
    const [type,setType] = useState(expense.type)

    const types = typeItems.map((item) => {
        return {label: item.name, value: item.name}
    })

    const changeExpense = async (setExpenses) => {
        const db = await getDBConnection()
        const expense = {
            id: expenseId,
            title: title,
            type: type,
            amount: amount.replace(",",".") * 1,
            date: date.toISOString()
        }
        console.log(expense)
        updateExpense(db,expense,setExpenses)
        router.push("/")
    }

    return (
        <View style={editStyle.container}>
            <Text style={editStyle.headerText}>
                Expense: <Text style={{fontStyle: "italic"}}>{expense.title}</Text>
            </Text>
            <ScrollView>
                <View style={editStyle.inputContainer}>
                    <Text style={editStyle.inputLabel}>Title</Text>
                    <TextInput style={editStyle.input} value={title} onChangeText={setTitle}/>
                </View>
                <View style={editStyle.inputContainer}>
                    <Text style={editStyle.inputLabel}>Amount (€)</Text>
                    <TextInput style={editStyle.input} keyboardType='numeric' value={amount} onChangeText={setAmount}/>
                </View>
                <View style={editStyle.inputContainer}>
                        <Text style={editStyle.inputLabel}>Type</Text>
                        <Dropdown
                            label=""
                            placeholder="Select an option..."
                            options={types}
                            selectedValue={type}
                            onValueChange={(value) => setType(value)}
                            primaryColor={'#20211e'}
                            isSearchable
                            dropdownStyle={editStyle.dropdown}
                        />
                </View>
                <View style={editStyle.dateContainer}>
                        <DateTimePicker value={date} onChange={(event, selectedDate) => setDate(selectedDate)} themeVariant="dark" accentColor="#38b9af"/>
                </View>
                <View style={editStyle.btnContainer}>
                    <Pressable style={editStyle.addBtn} onPress={() => changeExpense(setExpenses)}>
                        <LinearGradient colors={['#22b5c3', '#d8d61d']} style={editStyle.addBtn}>
                            <Text style={{color: "white", fontSize: 15}}>Update</Text>
                        </LinearGradient>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

export default EditPage