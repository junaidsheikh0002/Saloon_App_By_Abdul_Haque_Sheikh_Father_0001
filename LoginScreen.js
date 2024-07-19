import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async() => {
        try {
            const response = await axios.post('http://localhost:3000/login', { email, password });
            if (response.data.success) {
                navigation.navigate('Home');
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error(error);
            alert('Login failed');
        }
    };

    return ( <
        View style = { styles.container } >
        <
        Text > Email < /Text> <
        TextInput style = { styles.input }
        value = { email }
        onChangeText = { setEmail }
        /> <
        Text > Password < /Text> <
        TextInput style = { styles.input }
        value = { password }
        onChangeText = { setPassword }
        secureTextEntry / >
        <
        Button title = "Login"
        onPress = { login }
        /> <
        /View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
});

export default LoginScreen;