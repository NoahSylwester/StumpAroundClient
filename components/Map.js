import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default class Map extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView 
            // latitudeDelta={0.0922}
            // longitudeDelta={0.0421}
            region={
                {
                    latitude: this.props.latitude,
                    longitude: this.props.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02
                }
            }
            style={styles.mapStyle}>
            <MapView.Marker
                title={this.props.name}
                description={this.props.summary}
                anchor={{x:this.props.longitude,y:this.props.latitude}}
                coordinate={{
                    latitude: this.props.latitude,
                    longitude: this.props.longitude,
                }}
            />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: 200//Dimensions.get('window').height,
  },
});
