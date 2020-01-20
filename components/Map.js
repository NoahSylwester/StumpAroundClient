import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Map(props) {
    const [display, setDisplay] = useState(false);
    console.log(display);
    return (
      <View style={styles.container}>
        {display ?
        <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => setDisplay(false)}>
          <Text 
            style={styles.wrapperText}
            color='#00B100'
          >
            Hide Maps
          </Text>
        </TouchableOpacity> 
        <MapView 
            // latitudeDelta={0.0922}
            // longitudeDelta={0.0421}
            region={
                {
                    latitude: props.latitude,
                    longitude: props.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02
                }
            }
            style={styles.mapStyle}>
            <MapView.Marker
                title={props.name}
                description={props.summary}
                anchor={{x:props.longitude,y:props.latitude}}
                coordinate={{
                    latitude: props.latitude,
                    longitude: props.longitude,
                }}
            />
        </MapView>
        </View>
        :
        <TouchableOpacity onPress={() => setDisplay(true)}>
          <Text 
            style={styles.clickText}
            color='#24d36fff'
          >
            See in Maps
          </Text>
        </TouchableOpacity>  
      }
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: 200//Dimensions.get('window').height,
  },
  clickText: {
    fontSize: 20,
    color: '#24d36fff'
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperText: {
    fontSize: 20,
    color: '#24d36fff',
    marginBottom: 5,
  }
});
