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

export default function FriendsBox(props) {

    return (
        <ScrollView style={styles.friendsContainer}>
            <Text style={styles.commentsTitle}>
                Friends
            </Text>
            {props.isPastInitialRender.current ? props.user.friends.slice().reverse().map((element, i) => {
                return (
                    <View style={styles.friend} key={i}>
                        <View style={styles.friendHeader}>
                            <Image source={{ uri: element.photo }} style={styles.friendPhoto} />
                            <View>
                                <TouchableOpacity onPress={() => props.navigation.navigate('ClickedProfile', { user: element })}>
                                    <Text style={styles.friendLink}>
                                        {element.name}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            }) : <View />}
        </ScrollView>
    )
}