import { View, Text, StyleSheet, TextInput, Pressable, Modal, ScrollView } from "react-native";
import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient'
import uuid from 'react-native-uuid'
import { insertType, getDBConnection, deleteType, updateType } from "../database/db-service";
import { AntDesign } from '@expo/vector-icons';
import ColorPicker from 'react-native-wheel-color-picker'

const typeStyle = StyleSheet.create({
    container: {
        backgroundColor: "#111211",
        display: "flex",
        justifyContent: "center",
        marginVertical: 10,
    },
    addContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        minHeight: 40,
        marginBottom: 20,
        marginTop: 20
    },
    addInput: {
        backgroundColor: "white",
        flex: 4,
        borderRadius: 5,
        height: "100%",
        marginRight: 20,
        padding: 10
    },
    addBtn: {
        flex: 1,
        backgroundColor: "#5166ad",
        borderRadius: 5,
        height: "100%",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    itemContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#20211e",
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
    },
    itemTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    itemTitleContainer: {
        flex: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },  
    btnContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
    },
    deleteBtn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d43d54",
        borderRadius: 10,
        padding: 7
    },
    blurBackground: {
        position: "relative",
        backgroundColor: "rgba(0,0,0,0.5)",
        height: "100%",
        width: "100%",
    },
    colorPickerContainer: {
        backgroundColor: "#20211e",
        position: "absolute",
        top: 150,
        left: 35,
        width: "80%",
        height: "60%",
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        padding: 15
    },
    colorPickerTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalBtnContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        padding: 10,
        marginTop: 20,
    },
    cancelBtn: {
        backgroundColor: "#8e948e",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10
    },
    applyBtn: {
        backgroundColor: "#8e948e",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10
    }
})

const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
};

export const TypeList = ({setTypeItems, typeItems, setExpenses}) => {

    const id = uuid.v4()

    const [name,setName] = useState("")
    const [colorModalOpen, setColorModalOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})

    const addType = async () => {
        const db = await getDBConnection()
        const type = {
            id: id,
            name: name,
            color: generateColor()
        }
        insertType(db,type,setTypeItems)
        setName("")
    }

    const removeType = async (id,name,setTypeItems,setExpenses) => {
        const db = await getDBConnection()
        deleteType(db,id,name,setTypeItems,setExpenses)
    }

    const changingColor = async (typeItem) => {
        const db = await getDBConnection()
        const updatedTypeItem = typeItems.filter((item) => item.id === typeItem.id)[0]
        updatedTypeItem.color = typeItem.color
        const otherTypeItems = typeItems.filter((item) => item.id !== typeItem.id)
        updateType(db,updatedTypeItem,setTypeItems)
        setTypeItems([...otherTypeItems,updatedTypeItem])
        setColorModalOpen(false)
    }

    return (
        <View style={typeStyle.container}>
            <View style={typeStyle.addContainer}>
                <TextInput value={name} style={typeStyle.addInput} onChangeText={setName} placeholder="add type..."/>
                <Pressable onPress={addType}>
                    <LinearGradient colors={['#22b5c3', '#d8d61d']} style={typeStyle.addBtn}>
                        <Text style={{color: "white"}}>Add</Text>
                    </LinearGradient>
                </Pressable>
            </View>
            <ScrollView style={{ height: "100%"}}>
            {
            typeItems.length>0?
            typeItems.map((item) => {
                return(
                <View key={item.id} style={typeStyle.itemContainer}>
                    <Pressable onPress={() => {
                        setColorModalOpen(true)
                        setSelectedItem(item)
                    }} style={{backgroundColor: item.color, height: 60, width: 60, borderRadius: 20}}>
                    </Pressable>
                    <View style={typeStyle.itemTitleContainer}>
                        <Text style={typeStyle.itemTitle}>{item.name}</Text>
                    </View>
                    <View style={typeStyle.btnContainer}>
                        <Pressable style={typeStyle.deleteBtn} onPress={() => removeType(item.id,item.name,setTypeItems,setExpenses)}><AntDesign name="delete" size={30} color="white" /></Pressable>
                    </View>
                </View>
                )
            }):<Text style={{color: "#7a7976", fontSize: 20, fontStyle: "italic",marginLeft:"25%",marginTop: "10%"}}>No types added yet...</Text>
            }
            <Modal
            animationType="slide"
            transparent={true}
            visible={colorModalOpen}
            onRequestClose={() => setColorModalOpen(!colorModalOpen)}
            >
                <View style={typeStyle.blurBackground}>
                    <View style={typeStyle.colorPickerContainer}>
                        <Text style={typeStyle.colorPickerTitle}>Color Picker</Text>
                        <ColorPicker 
                        color={selectedItem.color} 
                        onColorChangeComplete={color => {
                            setSelectedItem({...selectedItem,color: color})
                        }}
                        thumbSize={30}
                        sliderSize={30}
                        noSnap={true}
                        row={false}
                        /> 
                        <View style={typeStyle.modalBtnContainer}>
                            <Pressable style={typeStyle.cancelBtn} onPress={() => setColorModalOpen(false)}>
                                <Text style={{color: "white"}}>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={() => changingColor(selectedItem)}>
                                <LinearGradient colors={['#22b5c3', '#d8d61d']} style={typeStyle.applyBtn}>
                                    <Text style={{color: "white"}}>Apply</Text>
                                </LinearGradient>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            </ScrollView>
        </View>
    );
}