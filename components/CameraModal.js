import React from 'react';
import CameraUpload from './CameraUpload';

import {
  Text,
  TouchableOpacity,
  View,
  Button,
  Modal,
  TextInput,
} from 'react-native';

export default function CameraModal(props) {
    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalVisibleState}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <TouchableOpacity activeOpacity={1} style={{height: "100%", backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={() => {
                props.setModalVisibleState(false);
              }}>
          <View style={{backgroundColor: 'white', borderRadius: 5, padding: 20, width: '90%', }}>
            <CameraUpload setModalVisibleState={props.setModalVisibleState} setUserState={props.setUserState} />
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Button
                title="Cancel"
                onPress={() => {
                  props.setModalVisibleState(!props.modalVisibleState);
                }}>
              </Button>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
}