import React, { useState, useEffect, useRef } from 'react';
import {
    Image,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    Text,
    Button,
    TextInput,
    Modal,
} from 'react-native';
import styles from '../constants/MainStyles';

export default function FavoriteHikes(props) {

    return (
            <ScrollView style={styles.hikesContainer}>
                {props.userState.hikes !== 'denied' ?
                props.userState.hikes && props.userState.hikes.length !== 0 ? props.userState.hikes.slice().reverse().map((hike, i) => {
                    return (
                        <View style={styles.hikeContainer} key={hike._id || i}>
                            <Image source={{ uri: hike.photo }} style={{ width: '100%', height: 200 }} />
                            <View style={styles.hikeTag}>
                                <TouchableOpacity onPress={() => props.navigation.push('Hike', { hike: hike })}>
                                    <Text style={styles.title}>
                                        {hike.name}
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.section}>
                                    Length: {hike.length} mi
                                </Text>
                                <Text style={styles.section}>
                                    {hike.location}
                                </Text>
                            </View>
                        </View>
                    )
                }) : 
                <View style={ styles.hikelessContainer } key={1}>
                    <Text style={{ textAlign: 'center', marginTop: 18 }}>
                        No favorites yet.
                    </Text>
                </View>
            :
            <View style={ styles.hikelessContainer } key={1}>
                <Text style={{ textAlign: 'center', marginTop: 18 }}>
                    Favorite hikes can only be viewed by friends.
                </Text>
            </View>
            }

            </ScrollView>
    )
}