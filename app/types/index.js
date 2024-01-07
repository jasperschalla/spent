import { View, StyleSheet, ScrollView } from "react-native";
import { BottomNavigation } from "../../components/BottomNavigation";
import { TypeList } from "../../components/TypeList";
import { useContext} from "react";
import { AppContext } from "../../context/context";

const typeStyle = StyleSheet.create({
    container: {
      display: 'flex',
      color: "white",
      backgroundColor: "#111211",
      height: "100%",
      width: "100%",
      position: "relative"
    },
    contentContainer: {
        display: "flex",
        justifyContent: "center",
        padding: 20
    },
    settingContainer: {
        display: "flex",
        justifyContent: "center",
        paddingVertical: 10
    },
    settingHeader: {
        color: "white",
        fontSize: 20,
        fontStyle: "italic",
        marginBottom: 10,
    },
  });

const TypePage = () => {

    const { expenses, setExpenses, typeItems, setTypeItems} = useContext(AppContext)

    return (
        <View style={typeStyle.container}>
            <View style={typeStyle.contentContainer}>
                {/* <Text style={typeStyle.settingHeader}>Available Types</Text> */}
                <TypeList setTypeItems={setTypeItems} typeItems={typeItems} setExpenses={setExpenses}/>
            </View>
            {/* <BottomNavigation/> */}
        </View>
    );
}

export default TypePage;