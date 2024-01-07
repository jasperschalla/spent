import { View, Pressable, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';

const bottomNavigationStyle = StyleSheet.create({
    "container": {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 20,
        paddingBottom: 30,
        position: "absolute",
        bottom: 0,
        backgroundColor: "#20211e",
        width: "100%",
        shadowColor: '#111211',
        shadowOffset: {width: 0, height: -6},
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    "homeBtn": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "20%",

    },  
    "settingBtn": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "20%",
    },  
    "addBtn": {
        position: "absolute",
        bottom: 20,
        shadowColor: '#111211',
        shadowOffset: {width: 0, height: -6},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        left: "45%",
    },
    "addBtnGradient" : {
        display: "flex",   
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        width: 80,
        height: 80,
        color: "white",
        borderWidth: 7,
        borderColor: "#20211e",
    },
})

export const BottomNavigation = ({ setModalVisible }) => {

    const router = useRouter();

    return (
        <View style={bottomNavigationStyle.container}>
            <Pressable style={bottomNavigationStyle.homeBtn} onPress={() => router.push("/stats")}>
                <Ionicons name="stats-chart" size={30} color="white" />
            </Pressable>
            <Pressable style={bottomNavigationStyle.addBtn} onPress={() => setModalVisible(true)}>
                <LinearGradient colors={['#22b5c3', '#d8d61d']} style={bottomNavigationStyle.addBtnGradient}>
                    <MaterialCommunityIcons name="cash-plus" size={30} color="white" />
                </LinearGradient>
            </Pressable>
            <Pressable style={bottomNavigationStyle.settingBtn} onPress={() => router.push("/types")}>
                <Entypo name="list" size={30} color="white" />
            </Pressable>
        </View>
    )
}