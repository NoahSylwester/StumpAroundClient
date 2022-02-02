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

export default function FavoriteStumps(props) {

    return (
            <ScrollView style={styles.hikesContainer}>
                {props.userState.stumps !== 'denied' ?
                (props.userState.stumps && props.userState.stumps.length !== 0 ? props.userState.stumps.slice().reverse().map((stump, i) => {
                    return ( !stump ? <View key={'stump'+i}/> :
                        <View style={styles.hikeContainer} key={stump._id || i}>
                            <Image source={{ uri: stump.photo }} style={{ width: '100%', height: 200 }} />
                            <View style={styles.hikeTag}>
                                <TouchableOpacity onPress={() => props.navigation.push('Stump', { stump: stump })}>
                                    <Text style={styles.title}>
                                        {stump.name}
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.section}>
                                    {stump.location}
                                </Text>
                            </View>
                        </View>
                    )
                }) : 
                <View style={ styles.hikelessContainer } key={'123aasdd'}>
                    <Text style={{ textAlign: 'center', marginTop: 18 }}>
                        No favorites yet.
                    </Text>
                </View>)
            :
            <View style={ styles.hikelessContainer } key={'123asdd'}>
                <Text style={{ textAlign: 'center', marginTop: 18 }}>
                    Favorite stumps can only be viewed by friends.
                </Text>
            </View>
            }

            </ScrollView>
    )
}