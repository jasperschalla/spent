import { View, Text, StyleSheet, ScrollView } from "react-native"
import { Summary } from "../../components/Summary"
import { AppContext } from "../../context/context"
import { useContext } from "react"
import { groupBy } from "../../utils"
import { BarChart } from 'react-native-chart-kit';

const statStyle = StyleSheet.create({
    background: {
        display: 'flex',
        backgroundColor: "#111211",
    },
    container: {
        display: 'flex',
        color: "white",
        backgroundColor: "#111211",
        height: "100%",
        width: "100%",
        position: "relative",
        padding: 10,
    },
    headerContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottm: 20,
        marginTop: 10
    },
    headerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    plotHeader: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 115,
        marginBottom: 10
    },
    plotContainer : {
        display: "flex",
        justifyContent: "center",
        marginBottom: 40
    },
    plot: {
        paddingHorizontal: 20,
        paddingVertical: 5,
/*         display: "flex",
        justifyContent: "center",
        alignItems: "start",
        marginBottom: 20,
        paddingTop: 15,
        backgroundColor: "#20211e",
        marginVertical: 15,
        borderRadius: 20, */
    },
    scrollContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        marginBottom: 20,
        paddingTop: 15,
        backgroundColor: "#20211e",
        marginVertical: 15,
        borderRadius: 20,
    }
})

const StatPage = () => {

    const { expenses, typeItems } = useContext(AppContext)

    const detailedExpenses = expenses.map((expense) => {
        return {...expense, group: expense.date.slice(0,7)}
    });


    //`${new Date(expense.date).getFullYear()}-${new Date(expense.date).getMonth()+1}`

    const groupedExpenses = groupBy(detailedExpenses.sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
    }), "type")


    return (
        <View style={statStyle.background}>
        <View></View>
        <ScrollView style={statStyle.container}>
            <View style={statStyle.headerContainer}>
                <Text style={statStyle.headerText}>Overall Balance</Text>
            </View>
            <Summary expenses={expenses} typeItems={typeItems} timeType="overall"/>
            <View style={statStyle.headerContainer}>
                <Text style={statStyle.headerText}>Monthly Type Expenses</Text>
            </View>
            <View style={statStyle.plotContainer}>
            {
                Object.keys(groupedExpenses).map((key) => {

                    const color = typeItems.filter((item) => item.name === key)[0]?.color ?? "grey"

                    const monthlyGroupExpenses = groupBy(groupedExpenses[key], "group")
                    const monthlyGroupExpensesArray = Object.keys(monthlyGroupExpenses).map((key) => {
                        return {name: key, amount: monthlyGroupExpenses[key].reduce((acc, cur) => acc + cur.amount, 0), color: color}
                    })

                    return (
                        <ScrollView contentContainerStyle={statStyle.scrollContainer} horizontal={true} key={key}>
                        <View style={statStyle.plot} key={key}>
                            <Text style={statStyle.plotHeader}>{key}</Text>
                            <BarChart
                                data={{
                                labels: monthlyGroupExpensesArray.length<=4? monthlyGroupExpensesArray.map(item => item.name): monthlyGroupExpensesArray.map(item => `${item.name.slice(2,4)}-${item.name.slice(5,7)}`),
                                datasets: [
                                    {
                                        data: monthlyGroupExpensesArray.map(item => item.amount),
                                        colors: monthlyGroupExpensesArray.map(item => {
                                            return ((opacity = 1) => (item.color))
                                            
                                        }),
                                    },
                                ],
                                }}
                                width={monthlyGroupExpensesArray.length*50 <= 310? 310 : monthlyGroupExpensesArray.length*50}
                                height={180}
                                yAxisLabel={'€'}
                                chartConfig={{
                                    width: 300,
                                    height: 150,
                                    backgroundColor: '#20211e',
                                    backgroundGradientFrom: '#20211e',
                                    backgroundGradientTo: '#20211e',
                                    decimalPlaces: 0,
                                    barPercentage: 0.7,
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16,
                                    },
                                }}
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16,
                                }}
                                flatColor={true}
                                withCustomBarColorFromData={true}
                                fromZero={true}
                                showValuesOnTopOfBars={true}
                            />
                        </View>
                        </ScrollView>
                    )
                })
            }
            </View>
        </ScrollView>
        </View>
    )
}

export default StatPage