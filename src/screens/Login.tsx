/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import OTPScreen from './OTPScreen';
import { useNavigation } from '@react-navigation/native';

function Login() {
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    // verification code
    const [code, setCode] = useState('');
    const [user, setUser] = React.useState();

    const onAuthStateSave = (userd: any) => setUser(userd);
  
    React.useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateSave);
      return subscriber;
    }, [user]);

    const navigation = useNavigation();
    async function signInWithPhoneNumber(phoneNumberd: string) {
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumberd);
            setConfirm(confirmation);
        } catch (error) {
            console.error(error);
        }
    }

    const handleGetOTP = () => {
        if (phoneNumber) {
            signInWithPhoneNumber(phoneNumber);
        } else {
            Alert.alert('Invalid phone number');
        }
    };

    async function confirmCode(confirmd:any) {
        try {
          await confirmd?.confirm(code);
          navigation.navigate('Home');
        } catch (error) {
          Alert.alert('Invalid code.');
        }
      }

      useEffect(()=>{
        if (code !== ''){
            confirmCode(confirm);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [code]);

    return (
        <>
            {confirm && !user ? <OTPScreen setCode={setCode} handleGetOTP={handleGetOTP} /> :
                <View style={styles.container}>
                    <Text style={styles.title}>Login using Phone Number</Text>
                    <View style={styles.inPutView}>
                        <TextInput
                            placeholder="Phone number"
                            value={phoneNumber}
                            onChangeText={(text) => setPhoneNumber(text)}
                            placeholderTextColor={'#FFF'}
                            style={{ color: '#fff' }}
                            inputMode="tel"
                        />
                    </View>
                    <TouchableOpacity
                        style={{ backgroundColor: 'blue', width: '80%', borderRadius: 20, padding: 16, marginTop: 20 }}
                        onPress={handleGetOTP}>
                        <Text style={styles.btnText}>Get OTP</Text>
                    </TouchableOpacity>
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 100,
        alignSelf: 'center',
        color: '#000',
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    inPutView: {
        backgroundColor: '#607274',
        padding: 8,
        borderRadius: 20,
        width: '80%',
        marginBottom: 12,
        marginTop: 50,
        color: 'white',
    },
});

export default Login;
