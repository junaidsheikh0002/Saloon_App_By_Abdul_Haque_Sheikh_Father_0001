import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async() => {
            try {
                const response = await axios.get('http://localhost:3000/services');
                setServices(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchServices();
    }, []);

    const renderItem = ({ item }) => ( <
        View style = { styles.item } >
        <
        Text > { item.name } < /Text> <
        Text > Duration: { item.duration }
        mins < /Text> <
        Text > Price: $ { item.price } < /Text> <
        Button title = "Book Now"
        onPress = {
            () => alert('Booked')
        }
        /> < /
        View >
    );

    return ( <
        FlatList data = { services }
        renderItem = { renderItem }
        keyExtractor = {
            (item) => item._id
        }
        />
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default HomeScreen;