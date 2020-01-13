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

export default function FriendsBoxActionable(props) {

    return (
        <ScrollView style={styles.friendsContainer}>
            <Text style={styles.commentsTitle}>
                {props.title}
            </Text>
            {props.isPastInitialRender.current ? props.user.friends.slice().reverse().map((element, i) => {
                return (
                    <View style={styles.friend} key={element._id}>
                        <View style={styles.friendHeader}>
                            <Image source={{ uri: element.photo }} style={styles.friendPhoto} />
                            <View style={{alignItems: 'flex-start'}}>
                                <TouchableOpacity onPress={() => props.navigation.push('ClickedProfile', { user: element })}>
                                    <Text style={styles.friendLink}>
                                        {element.name}
                                    </Text>
                                </TouchableOpacity>
                                <Button style={{fontSize: 10}} title={props.buttonTitle} onPress={() => props.action(element._id)} />
                            </View>
                        </View>
                    </View>
                )
            }) : <View />}
        </ScrollView>
    )
}