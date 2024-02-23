/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Home = () => {
    const navigation = useNavigation();
    const onLogout = () => {
        auth()
            .signOut()
            .then(() => Alert.alert('User signed out!')).catch(error => {
                Alert.alert('Error', error.message);
                navigation.navigate('Login');
            });
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ width: '70%', borderRadius: 20, backgroundColor: 'blue', padding: 16 }}
                onPress={() => {
                    navigation.navigate('Scanner');
                }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '700', textAlign: 'center' }}>Scan QR Code</Text>
            </TouchableOpacity>

            <View>
                <TouchableOpacity style={{ width: '70%', borderRadius: 20, backgroundColor: 'red', padding: 16, marginTop: 250 }}
                    onPress={() => {
                        onLogout();
                    }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '700', textAlign: 'center' }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Home;
