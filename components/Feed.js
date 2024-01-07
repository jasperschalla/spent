import { View, Text,StyleSheet, TouchableHighlight, ScrollView, Pressable } from 'react-native';
import { getDBConnection, getAllExpenses, deleteExpense } from '../database/db-service';
import { SwipeListView } from 'react-native-swipe-list-view';
import { AntDesign } from '@expo/vector-icons';
import { groupBy } from '../utils';
import { useRouter } from 'expo-router';
import { getMonthNumber } from '../utils';

const feedStyle = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingBottom: 90,
    },
    item: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#20211e",
        padding: 15,
        borderRadius: 10,
        minHeight: 70,
        marginBottom: 10,
    },
    itemHeaderContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flex: 1
    },
    itemHeader: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    itemAmountContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flex: 1
    },
    itemAmount: {
        color: "#d43d54",
        fontSize: 25,
    },
    itemTypeContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flex: 1,
    },
    itemType: {
        color: "white",
        fontSize: 15,
        padding: 5,
    },
    dateHeader: {
        color: "white",
        fontSize: 20,
        fontStyle: "italic",
        marginBottom: 20,
    },
    btnContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
        borderRadius: 10,
        minHeight: 70,
        marginBottom: 10,
    },
    editBtn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#57595e",
        paddingHorizontal: 10,
        borderRadius: 10,
        height: "100%",
        width: 65,
    },
    deleteBtn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d43d54",
        paddingHorizontal: 10,
        borderRadius: 10,
        height: "100%",
        width: 65,
    }
    
})
  

export const Feed = ({ expenses, setExpenses, typeItems, selectedMonth }) => {

    const todaysMonth = getMonthNumber(selectedMonth.split(" ")[0]) 
    const todaysYear = parseInt(selectedMonth.split(" ")[1])

    const router = useRouter()

    const cleanedExpenses = expenses.filter(entry => (new Date(entry.date)).getFullYear()===todaysYear && (new Date(new Date(entry.date))).getMonth()===todaysMonth).sort((a,b) => new Date(b.date) - new Date(a.date)).map((expense) => {
        return {
            ...expense,
            date: new Date(expense.date).toLocaleString().split(",")[0]
        }
    })
    const groupedExpenses = groupBy(cleanedExpenses, "date")

    const removeExpense = async (id,setExpenses) => {
        const db = await getDBConnection()
        deleteExpense(db,id,setExpenses)
    }

    return (
        <View style={feedStyle.container}>
            {
                Object.keys(groupedExpenses).length>0?
                Object.keys(groupedExpenses).map((key) => {
                    const dayExpenses = groupedExpenses[key]
                    return(
                        <View key={key}>
                        <Text style={feedStyle.dateHeader}>{key}</Text>
                        <SwipeListView 
                            data={dayExpenses}
                            renderItem={ (data, rowMap) => (
                                <TouchableHighlight key={data.item.id}>
                                    <View style={feedStyle.item}>
                                        <View style={feedStyle.itemHeaderContainer}>
                                            <Text style={feedStyle.itemHeader}>{data.item.title}</Text>
                                        </View>
                                        <View style={feedStyle.itemTypeContainer}>
                                            <View style={{
                                                backgroundColor: typeItems.find((item) => item.name === data.item.type)?.color ?? "gray",
                                                paddingHorizontal: 7,
                                                paddingVertical: 5,
                                                borderRadius: 20
                                            }}>
                                                <Text style={feedStyle.itemType}>{data.item.type}</Text>
                                            </View>
                                        </View>
                                        <View style={feedStyle.itemAmountContainer}>
                                            <Text style={feedStyle.itemAmount}>-{data.item.amount} €</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            )}
                            renderHiddenItem={ (data, rowMap) => {
                                const id = data.item.id
                                return (
                                <View style={feedStyle.btnContainer} key={id}>
                                    <Pressable style={feedStyle.editBtn} onPress={() => router.push(`/edit/${id}`)}><AntDesign name="edit" size={30} color="white" /></Pressable>
                                    <Pressable style={feedStyle.deleteBtn} onPress={() => removeExpense(id,setExpenses)}><AntDesign name="delete" size={30} color="white" /></Pressable>
                                </View>
                            )}}
                            leftOpenValue={75}
                            rightOpenValue={-75}
                        />
                        </View>
                    )
                }):<Text style={{color: "#7a7976", fontSize: 20, fontStyle: "italic",marginLeft:"25%",marginTop: "10%"}}>No expenses yet...</Text>

            }
                       
        </View>
    )
}