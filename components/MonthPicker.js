import { View, Text, StyleSheet, Modal, Pressable } from "react-native"
import {Picker} from '@react-native-picker/picker';
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';

const pickerStyle = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginTop: 10,
    },
    pickerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    picker: {
        color: "white",
        width: 250,
    },
    pickerContainer: {
        position: "absolute",
        top: "20%",
        left: "10%",
        backgroundColor: "#20211e",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: "80%"
    },
    pickerBackground: {
        position: "relative",
        backgroundColor: "rgba(0,0,0,0.5)",
        height: "100%",
        width: "100%",
    },
    pickerHeader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: "100%",
        position: "relative"
    },
    pickerHeaderText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    exit: {
        position: "absolute",
          right: 10,
          top: 0,  
      },
})

export const MonthPicker = ({ selectedMonth, setSelectedMonth, months }) => {

    const [pickerVisible, setPickerVisible] = useState(false)

    return(
        <View style={pickerStyle.container}>
            <Pressable onPress={() => setPickerVisible(true)}>
                <Text style={pickerStyle.pickerText}>{selectedMonth}</Text>
            </Pressable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={pickerVisible}
                onRequestClose={() => setPickerVisible(!pickerVisible)}
            >
                <View style={pickerStyle.pickerBackground}>
                    <View style={pickerStyle.pickerContainer}>
                        <View style={pickerStyle.pickerHeader}>
                            <Text style={pickerStyle.pickerHeaderText}>Select Month</Text>
                            <Pressable style={pickerStyle.exit} onPress={() => setPickerVisible(false)}>
                                <AntDesign name="closecircle" size={30} color="white" />
                            </Pressable>
                        </View>
                        <Picker
                            itemStyle={pickerStyle.picker}
                            selectedValue={selectedMonth}
                            numberOfLines={1}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedMonth(itemValue)
                            }>
                            {months.map((month,index) => {
                                return (<Picker.Item key={index} label={month} value={month} />)
                            })}
                        </Picker>
                    </View>
                </View>
            </Modal>
        </View>
    )
}