import { View, Text, StyleSheet, Pressable } from "react-native"
import { AntDesign } from '@expo/vector-icons';

const detailModalStyle = StyleSheet.create({
    blurBackground: {
        position: "relative",
        backgroundColor: "rgba(0,0,0,0.5)",
        height: "100%",
        width: "100%",
    },
    container: {
        position: "absolute",
        top: "10%",
        left: "10%",
        backgroundColor: "#20211e",
        borderRadius: 10,
        display: "flex",
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: "80%",
        marginBottom: 20
    },
    headerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        paddingTop: 5,
        alignSelf: "center",
        marginBottom: 20
    }, 
    rowContainer: {
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    contentContainer: {
        display: "flex",
        flexDirection: "row",
        position: "relative"
    },
    amountContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    amount: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        flex: 1,
        marginLeft: 10
    },
    name: {
        color: "white",
        fontSize: 15,
        marginBottom: 10,
    },
    exit: {
      position: "absolute",
        right: 10,
        top: 0,  
    },
    headContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    }
})

export const DetailModal = ({seriesAcc, setDetailModalVisible}) => {

    const max = seriesAcc.reduce((prev, current) => (prev.amount > current.amount) ? prev : current).amount
    const sortedSeries = seriesAcc.sort((a, b) => (a.amount > b.amount) ? -1 : 1)

    return (
        <View style={detailModalStyle.blurBackground}>
            <View style={detailModalStyle.container}>
                <View style={detailModalStyle.headContainer}>
                    <Text style={detailModalStyle.headerText}>Details</Text>
                    <Pressable style={detailModalStyle.exit} onPress={() => setDetailModalVisible(false)}>
                        <AntDesign name="closecircle" size={30} color="white" />
                    </Pressable>
                </View>
                {
                    sortedSeries? 
                    sortedSeries.map((item,index) => {
                        return(
                        <View style={detailModalStyle.rowContainer} key={item.id}>
                            <Text  key={item.id} style={detailModalStyle.name}>{index+1}. {item.name}</Text>
                            <View  key={item.id} style={detailModalStyle.contentContainer}>
                                <View  key={item.id} style={{width: `${(item.amount/max*100)-20}%`, backgroundColor: item.color, padding: 10, 
                                    borderTopRightRadius: 10, borderBottomRightRadius: 10
                                }}>
                                </View>
                                <View  key={item.id} style={detailModalStyle.amountContainer}>
                                    <Text  key={item.id} style={detailModalStyle.amount}>{item.amount} €</Text>
                                </View>
                            </View>
                        </View>
                        )
                    })
                    :
                   <Text style={{color: "#7a7976", fontSize: 20, fontStyle: "italic",marginLeft:"25%",marginTop: "10%"}}>No expenses yet...</Text>
                }
            </View>
        </View>
    )
}