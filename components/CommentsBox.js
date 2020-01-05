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

export default function CommentsBox(props) {

    // console.log(props.hike);
    return (
        <View style={styles.commentsContainer}>
            <Text style={styles.commentsTitle}>
                Comments
                  </Text>
            {props.isPastInitialRender.current ? props.hike.comments.slice().reverse().map((element, i) => {
                return (
                    <View style={styles.comment} key={i}>
                        <View style={styles.commentHeader}>
                            <Image source={{ uri: element.user.photo }} style={styles.commentPhoto} />
                            <View>
                                <TouchableOpacity onPress={() => props.navigation.navigate('ClickedProfile', { user: element.user })}>
                                    <Text style={styles.userLink}>
                                        {element.user.name}
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.commentDate}>
                                    {element.date_created}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.commentBody}>
                            <Text>
                                {element.content}
                            </Text>
                        </View>
                    </View>
                )
            }) : <View />}
            <Button
                color='#00B100'
                title="New Comment"
                onPress={() => props.setModalVisibleState(true)}
                style={styles.commentButton}
            ></Button>
        </View>
    )
}