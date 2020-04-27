import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  AsyncStorage,
  Modal,
  TextInput,
} from 'react-native';
import styles from '../constants/MainStyles';

export default function HikesSearchModal(props) {
  
  // handle search submit
    const sendSearch = async () => {
      const noSearchTermGiven = async () => {
        alert('Please enter a search term.');
      }
      props.searchTermState.length > 0 
      ?
      props.hikesGET()
      :
      noSearchTermGiven()
    }

    return (

        // setModalVisibleState
        // modalVisibleState
        // setSearchTermState
        // searchTermState
        // setFieldState
        // fieldState
        // setSortState
        // sortState
        // hikesGET
        // _updateHikes
        // setDataState
        // dataState

        // when passed to profile think of hike as profile

        <Modal
            animationType="fade"
            transparent={true}
            visible={props.modalVisibleState}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <TouchableOpacity activeOpacity={1} style={{ height: "100%", backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={() => {
                    props.setModalVisibleState(false);
            }}>
              <View style={{backgroundColor: 'white', borderRadius: 5, padding: 20, width: '90%', margin: 20}}>
                <Text style={{textAlign: 'center'}}>Search Field:</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Button title="name" color={props.fieldState === 'name' ? '#24d36fff' : 'grey'} onPress={() => props.setFieldState('name')} />
                    <Button title="location" color={props.fieldState === 'location' ? '#24d36fff' : 'grey'} onPress={() => props.setFieldState('location')} />
                </View>
                <Text style={{textAlign: 'center'}}>Sort by:</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Button title="name" color={props.sortState.field === 'name' ? '#24d36fff' : 'grey'} onPress={() => props.setSortState({ ...props.sortState, field: 'name' })} />
                    <Button title="location" color={props.sortState.field === 'location' ? '#24d36fff' : 'grey'} onPress={() => props.setSortState({ ...props.sortState, field: 'location' })} />
                    <Button title="length" color={props.sortState.field === 'length' ? '#24d36fff' : 'grey'} onPress={() => props.setSortState({ ...props.sortState, field: 'length' })} />
                </View>
                <Text style={{textAlign: 'center'}}>Sort by:</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Button title="ascending" color={props.sortState.order === 'ascending' ? '#24d36fff' : 'grey'} onPress={() => props.setSortState({ ...props.sortState, order: 'ascending' })} />
                    <Button title="descending" color={props.sortState.order === 'descending' ? '#24d36fff' : 'grey'} onPress={() => props.setSortState({ ...props.sortState, order: 'descending' })} />
                </View>
                <Text style={{textAlign: 'center'}}>Search Term:</Text>
                <TextInput
                  style={{
                    padding: 10,
                    marginTop: 0,
                    textAlign: 'center',
                  }}
                  onChangeText={search => props.setSearchTermState(search)}
                  value={props.searchTermState}
                />
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <Button
                    title="Search"
                    onPress={sendSearch} />
                  <Button
                    title="Cancel"
                    onPress={() => {
                      props.setModalVisibleState(!props.modalVisibleState);
                    }} />
                </View>
                <Button
                    title="Random"
                    onPress={() => {
                      props.randomGET();
                      props.setModalVisibleState(!props.modalVisibleState);
                    }} />
              </View>
            </TouchableOpacity>
          </Modal>
    )
}