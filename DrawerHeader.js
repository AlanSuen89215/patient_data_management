import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DrawerHeader({ screen }) {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.menuIconContainer}
                onPress={ () => navigation.toggleDrawer() }>
                <Image style={styles.menuIconImage} source={require('./assets/menu-button-wide.png')} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        top:60,
        left:0,
        width: 30,
        height:30,
        backgroundColor:'#BDBDBD',
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'flex-start'
    },
    menuIconContainer: {
        flex: 1,
        width: 30
    },
    menuIconImage: {
        height: 30,
        width: 30
    },
    titleText: {
        flex: 2,
        justifyContent: 'center'
    }
})