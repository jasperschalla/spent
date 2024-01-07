import { Stack } from "expo-router"
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet, View, Text } from "react-native";
import { AppProvider } from "../context/context";

const layoutStyle = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        paddingBottom: 10,
    },
    logo: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        borderRadius: 10,
    },
    headerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
})

const Logo = ({ ...props }) => {
    const title = props.children;
    return (
        <View style={layoutStyle.container}>
            <LinearGradient colors={['#22b5c3', '#d8d61d']} style={layoutStyle.logo}>
                <FontAwesome5 name="euro-sign" size={24} color="white" />
            </LinearGradient>
            <Text style={layoutStyle.headerText}>{title}</Text>
        </View>
    )
}

const RootLayout = () => {
    return (
        <AppProvider>
        <Stack>
            <Stack.Screen name="index"
            options={{title: "Balance", 
            headerStyle:{
                backgroundColor: "#20211e",
            },
            headerTintColor: "white",
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerTitle: props => <Logo {...props} 
            />,
            }}
            />
            <Stack.Screen name="types/index"
            options={{title: "Types", 
            headerStyle:{
                backgroundColor: "#20211e",
            },
            headerTintColor: "white",
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerTitle: props => <Logo {...props} 
            />
            }}
            />
            <Stack.Screen name="edit/[expenseId]"
            options={{title: "Edit", 
            headerStyle:{
                backgroundColor: "#20211e",
            },
            headerTintColor: "white",
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerTitle: props => <Logo {...props} 
            />
            }}
            />
            <Stack.Screen name="stats/index"
            options={{title: "Stats", 
            headerStyle:{
                backgroundColor: "#20211e",
            },
            headerTintColor: "white",
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerTitle: props => <Logo {...props} 
            />
            }}
            />
        </Stack>
        </AppProvider>
    )
}

export default RootLayout;