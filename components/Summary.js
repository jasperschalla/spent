import { groupBy } from "../utils";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native"
import PieChart from 'react-native-pie-chart';
import { useState } from "react";
import { DetailModal } from "./DetailModal";
import { getMonthNumber } from "../utils";

const monthSummaryStyle = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingHorizontal: 20,
        paddingVertical: 17,
    },
    statsContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent:"space-evenly",
        position: "relative",
        flex: 1
    },
    pieContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent:"space-evenly",
        position: "relative",
        flex: 1
    },
    total: {
        color: "white",
        fontSize: 35,
    },
    colItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    wrapper: {
        display: "flex",
    },
    legend: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: "center",
        justifyContent: "start"
    }
})

export const Summary = ({ expenses, typeItems, timeType, selectedMonth }) => {

    const [detailModalVisible, setDetailModalVisible] = useState(false)

    const monthlyExpense = expenses.map((expense) => {
        return {...expense, month: new Date(expense.date).getMonth(), year: new Date(expense.date).getFullYear()}
    });

    const currentMonth = selectedMonth? getMonthNumber(selectedMonth.split(" ")[0]) : (new Date()).getMonth()
    const currentYear = selectedMonth? parseInt(selectedMonth.split(" ")[1]): (new Date()).getFullYear()

    var monthlyExpenseCurrent
    var monthlyExpenseLast

    if (timeType === "monthly"){
        monthlyExpenseCurrent = monthlyExpense.filter((expense) => expense.month === currentMonth && expense.year === currentYear)
        monthlyExpenseLast = monthlyExpense.filter((expense) => expense.month === (currentMonth === 0 ? 11 : currentMonth - 1) && expense.year === (currentMonth === 0 ? currentYear - 1 : currentYear))
    } else {
        monthlyExpenseCurrent = monthlyExpense
        monthlyExpenseLast = monthlyExpense
    }

    const total = monthlyExpenseCurrent.reduce((acc, expense) => acc + expense.amount, 0)
    const totalLast = monthlyExpenseLast.reduce((acc, expense) => acc + expense.amount, 0)

    const widthAndHeight = 120

    var series
    var sliceColor
    var percentage
    var seriesAcc

    if (total !== 0){
        const seriesGrouped = groupBy(monthlyExpenseCurrent, "type")
        seriesAcc = Object.keys(seriesGrouped).map((key) => {
            return {
                name: key,
                amount: seriesGrouped[key].reduce((acc, expense) => acc + expense.amount, 0),
                color: typeItems.find(type => type.name === key)?.color ?? "grey"
            }
        })
    
        series = seriesAcc.map(item => item.amount)
        sliceColor = seriesAcc.map(item => item.color) 
    
        percentage = totalLast !== 0 ? Math.round(((total - totalLast) / totalLast) * 100) : 0
    } else {
        series = [1]
        sliceColor = ["grey"]
        percentage = 0
        seriesAcc = null
    }

    return (
        <View style={monthSummaryStyle.wrapper}>
            <View style={monthSummaryStyle.container}>
                <View style={monthSummaryStyle.pieContainer}>
                    <Pressable onPress={() => setDetailModalVisible(true)}>
                        <PieChart
                            widthAndHeight={widthAndHeight}
                            series={series}
                            sliceColor={sliceColor}
                            doughnut={false}
                            coverFill={'#111211'}
                        />
                    </Pressable>
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={detailModalVisible}
                    onRequestClose={() => setDetailModalVisible(!detailModalVisible)}>
                        <DetailModal seriesAcc={seriesAcc} setDetailModalVisible={setDetailModalVisible}/>
                    </Modal>
                </View>
                <View style={monthSummaryStyle.statsContainer}>
                    <View style={monthSummaryStyle.colItem}>
                        <Text style={monthSummaryStyle.total}>{total} €</Text>
                        {timeType==="monthly"?<Text style={{
                            color: (percentage>0?"red":(percentage==0? "grey": "green"))
                            }}>{percentage>0?"+":""}{percentage}%</Text>:null}
                        <Text style={{color: "white", fontStyle: "italic", marginTop: 10}}>Total Amount Spent</Text>
                    </View>
                </View>
            </View>
            <View style={monthSummaryStyle.legend}>
                {
                    seriesAcc?
                    seriesAcc.map((item) => {
                        return(
                            <View key={item.name} style={{display: "flex", flexDirection: "row", alignItems: "center", padding: 5, backgroundColor: item.color??"grey", borderRadius: 20, margin: 5}}>
                                <Text key={item.name} style={{color: "white"}}>{item.name}</Text>
                            </View>
                        )
                    }):null
                }
            </View>
        </View>
    )
}