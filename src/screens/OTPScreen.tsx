/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

interface OPTScreenProps {
    setCode: React.Dispatch<React.SetStateAction<string>>;
    handleGetOTP:()=>void;

}

const OTPScreen = ({ setCode, handleGetOTP}: OPTScreenProps) => {
    const et1 = useRef<TextInput>(null);
    const et2 = useRef<TextInput>(null);
    const et3 = useRef<TextInput>(null);
    const et4 = useRef<TextInput>(null);
    const et5 = useRef<TextInput>(null);
    const et6 = useRef<TextInput>(null);

    const [f1, setF1] = useState('');
    const [f2, setF2] = useState('');
    const [f3, setF3] = useState('');
    const [f4, setF4] = useState('');
    const [f5, setF5] = useState('');
    const [f6, setF6] = useState('');
    const [count, setCount] = useState(60);
    useEffect(() => {
        const interval = setInterval(() => {
            if (count === 0) {
                clearInterval(interval);
            }
            else {
                setCount(count - 1);
            }

        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [count]);

    const concatenatedCode = f1 + f2 + f3 + f4 + f5 + f6;
    const handleVerifyOTP = () => {
        setCode(concatenatedCode);
    };

    return (

        <View style={styles.container}>
            <Text style={styles.title}>OTP Verification</Text>
            <View style={styles.otpView}>
                <TextInput ref={et1} style={[styles.inputView, { borderColor: f1.length >= 1 ? 'blue' : '#000' }]}
                    keyboardType="number-pad" maxLength={1}
                    value={f1}
                    onChangeText={text => {
                        setF1(text);
                        if (text.length >= 1) {
                            et2.current?.focus();
                        }
                    }} />
                <TextInput ref={et2} style={[styles.inputView, { borderColor: f2.length >= 1 ? 'blue' : '#000' }]}
                    keyboardType="number-pad" maxLength={1}
                    value={f2}
                    onChangeText={text => {
                        setF2(text);
                        if (text.length >= 1) {
                            et3.current?.focus();
                        }
                        else if (text.length < 1) {
                            et1.current?.focus();
                        }
                    }} />
                <TextInput ref={et3} style={[styles.inputView, { borderColor: f3.length >= 1 ? 'blue' : '#000' }]}
                    keyboardType="number-pad" maxLength={1}
                    value={f3}
                    onChangeText={text => {
                        setF3(text);
                        if (text.length >= 1) {
                            et4.current?.focus();
                        }
                        else if (text.length < 1) {
                            et2.current?.focus();
                        }
                    }} />
                <TextInput ref={et4} style={[styles.inputView, { borderColor: f4.length >= 1 ? 'blue' : '#000' }]}
                    keyboardType="number-pad" maxLength={1}
                    value={f4}
                    onChangeText={text => {
                        setF4(text);
                        if (text.length >= 1) {
                            et5.current?.focus();
                        }
                        else if (text.length < 1) {
                            et3.current?.focus();
                        }
                    }} />
                <TextInput ref={et5} style={[styles.inputView, { borderColor: f5.length >= 1 ? 'blue' : '#000' }]}
                    keyboardType="number-pad" maxLength={1}
                    value={f5}
                    onChangeText={text => {
                        setF5(text);
                        if (text.length >= 1) {
                            et6.current?.focus();
                        }
                        else if (text.length < 1) {
                            et4.current?.focus();
                        }
                    }} />
                <TextInput ref={et6} style={[styles.inputView, { borderColor: f6.length >= 1 ? 'blue' : '#000' }]}
                    keyboardType="number-pad" maxLength={1}
                    value={f6}
                    onChangeText={text => {
                        setF6(text);
                        if (text.length >= 1) {
                            et6.current?.focus();
                        }
                        else if (text.length < 1) {
                            et5.current?.focus();
                        }
                    }} />
            </View>
            <View style={styles.resendView}>
                <Text disabled={count >= 1} style={{ fontSize: 20, fontWeight: '700', color: count === 0 ? 'blue' : 'grey' }}
                    onPress={() => {
                        setCount(60);
                        handleGetOTP();
                    }}>Resend</Text>
                {count !== 0 &&
                    <Text style={{ marginLeft: 20, fontSize: 20 }}>{count + ' seconds'}</Text>
                }
            </View>
            <TouchableOpacity disabled={f1 !== ''
                && f2 !== '' && f3 !== '' && f4 !== '' && f5 !== '' && f6 !== '' ? false : true}
                style={[styles.verifyOTPButton, {
                    backgroundColor: f1 !== ''
                        && f2 !== '' && f3 !== '' && f4 !== '' && f5 !== '' && f6 !== '' ? 'blue' : '#949494',
                }]} onPress={() => {
                    handleVerifyOTP();
                }}>
                <Text style={styles.btnText}>Verify OTP</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OTPScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 100,
        alignSelf: 'center',
        color: '#000',
    },
    otpView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 100,
    },
    inputView: {
        width: 50,
        height: 50,
        borderWidth: 0.5,
        borderRadius: 10,
        marginLeft: 10,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
    },
    verifyOTPButton: {
        width: '90%',
        height: 55,
        backgroundColor: 'blue',
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 20,
    },
    resendView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 30,
        marginTop: 30,
    },
});
