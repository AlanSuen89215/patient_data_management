import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DrawerHeader({ screen }) {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={ () => navigation.toggleDrawer() }>
                <Image style={{height: 30, width:30 }} source={require('./assets/icon.png')} />
            </TouchableOpacity>

            <View>
                <Text>{screen}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        top:30,
        left:0,
        width:'100%',
        backgroundColor:'#fa7da7',
        elevation:5,
        height:50,
        display:'flex',
        flexDirection:'row',
        paddingHorizontal:20,
        alignItems:'center',
        justifyContent:'space-between'
    }
})