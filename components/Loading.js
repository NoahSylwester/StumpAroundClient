import React from 'react';
import {
  View,
  Modal,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';

export default Loader = (props) => {

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={props.loading}
      onRequestClose={() => {console.log('Modal closed')}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Image
            style={{ height: 200, width: 200 }}
            source={require('../assets/images/loading.gif')}
            // animating={props.loading}
            />
        </View>
      </View>
    </Modal>
  )

}

const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    activityIndicatorWrapper: {
      height: 100,
      width: 100,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    }
  });