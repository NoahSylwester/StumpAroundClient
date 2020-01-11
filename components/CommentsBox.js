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
import CommentBox from './CommentBox';

export default function CommentsBox(props) {

    const commentGET = async (comment) => {
        const response = await fetch(`https://stump-around.herokuapp.com/comment/${comment._id}`, {
            method: 'GET',
          })
        return response.json();
    }
    // console.log(props.hike);
    return (
        <View style={styles.commentsContainer}>
            <Text style={styles.commentsTitle}>
                Comments
            </Text>
            {props.isPastInitialRender.current ? props.hike.comments.slice().reverse().map((element, i) => {
                return (
                    <CommentBox isPastInitialRender={props.isPastInitialRender} parent={element._id} item={element} key={i} commentGET={commentGET} navigation={props.navigation} screen={props.screen} replyData={props.replyData} setReplyData={props.setReplyData} setReplyModalVisibleState={props.setReplyModalVisibleState} replyModalVisibleState={props.replyModalVisibleState} />
                    // <View style={styles.comment} key={i}>
                    //     <View style={styles.commentHeader}>
                    //         <Image source={{ uri: element.user.photo }} style={styles.commentPhoto} />
                    //         <View>
                    //             <TouchableOpacity onPress={() => props.navigation.navigate('ClickedProfile', { user: element.user })}>
                    //                 <Text style={styles.userLink}>
                    //                     {element.user.name}
                    //                 </Text>
                    //             </TouchableOpacity>
                    //             <Text style={styles.commentDate}>
                    //                 {element.date_created}
                    //             </Text>
                    //         </View>
                    //     </View>
                    //     <TouchableOpacity onPress={commentGET} activeOpacity={1} style={styles.commentBody}>
                    //         <Text>
                    //             {element.content}
                    //         </Text>
                    //     </TouchableOpacity>
                    // </View>
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