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

export default function CommentBox(props) {

    const [item, setItem] = useState(props.item);
    const [expanded, setExpanded] = useState(false);

    const expandGET = async () => {
        const response = await props.commentGET(props.item);
        // console.log(response);
        setItem(response);
        setExpanded(!expanded);
    }

    const _updateComment  = async () => {
        const response = await props.commentGET(props.item);
        setItem(response);
    }

    const setDataAndOpenModal = async (data) => {
        props.setReplyData(data)
        // console.log(data);
        props.setReplyModalVisibleState(true);
    }

    useEffect(() => {
        if (expanded === true) {
            _updateComment();
        }
    }, [props.replyModalVisibleState])

    return (
        <View style={styles.commentContainer}>
            <View style={styles.comment}>
                <View style={styles.commentHeader}>
                    <Image source={{ uri: item.user.photo }} style={styles.commentPhoto} />
                    <View>
                        <TouchableOpacity onPress={() => props.navigation.navigate('ClickedProfile', { user: item.user })}>
                            <Text style={styles.userLink}>
                                {item.user.name}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.commentDate}>
                            {item.date_created}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={expandGET} activeOpacity={1} style={styles.commentBody}>
                    <Text>
                        {item.content}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.commentReplies}>
                {expanded ? <Button title="Reply" color="#00B100" onPress={() => setDataAndOpenModal({ repliedTo: props.parent, [props.screen.type]: props.screen._id })} /> : <View />}
                {expanded ? ( item.replies.length !== 0 ?
                    item.replies.slice().reverse().map((element, i) => {
                        return(
                            <View key={i}>
                                <CommentBox isPastInitialRender={props.isPastInitialRender} parent={element._id} item={element} commentGET={props.commentGET} navigation={props.navigation} screen={props.screen} replyData={props.replyData} setReplyData={props.setReplyData} setReplyModalVisibleState={props.setReplyModalVisibleState} />
                            </View>
                        )
                    })
                    :
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text>
                            No replies yet.
                        </Text>
                    </View>
                )
                :
                <View />
            }
            </View>
        </View>   
    )
}