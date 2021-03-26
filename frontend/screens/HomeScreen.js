// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']);

import React, {useState, useEffect} from 'react';
import { StyleSheet, ImageBackground, Text } from 'react-native';

import {Button, Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {connect} from 'react-redux';

function HomeScreen(props) {
    const [pseudo, setPseudo] = useState('');
    useEffect(() => {
        var data = AsyncStorage.getItem("pseudo", function(error, data) {
          setPseudo(data)
          console.log(data)
          })
    }, [])

      if (pseudo === '') {
        return(
        <ImageBackground source={require('../assets/home.jpg')} style={styles.container}>
          <Input
              containerStyle = {{marginBottom: 25, width: '70%'}}
              inputStyle={{marginLeft: 10}}
              placeholder='Marc'
              leftIcon={
                  <Icon
                  name='user'
                  size={24}
                  color="#eb4d4b"
                  />
              }
              onChangeText={(val) => setPseudo(val)}
          />
          <Button
              icon={
                  <Icon
                  name="arrow-right"
                  size={20}
                  color="#eb4d4b"
                  />
              }

              title="Go to Map"
              type="solid"
              onPress={() => {
                props.onSubmitPseudo(pseudo); 
                props.navigation.navigate('BottomNavigator', { screen: 'Map' })
                AsyncStorage.setItem("pseudo", pseudo)
              
              }}
          />
      </ImageBackground>)
      }
      else {
        var displayText = `Welcome back ${pseudo}`
        return(
          <ImageBackground source={require('../assets/home.jpg')} style={styles.container}>
            <Text>{displayText}</Text>
            <Button
              icon={
                  <Icon
                  name="arrow-right"
                  size={20}
                  color="#eb4d4b"
                  />
              }

              title="Go to Map"
              type="solid"
              onPress={() => {
                props.onSubmitPseudo(pseudo); 
                props.navigation.navigate('BottomNavigator', { screen: 'Map' })
                AsyncStorage.setItem("pseudo", pseudo)
              
              }}
          />
          </ImageBackground>)
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


function mapDispatchToProps(dispatch) {
    return {
      onSubmitPseudo: function(pseudo) { 
        dispatch( {type: 'savePseudo', pseudo: pseudo }) 
      }
    }
  }
  
  export default connect(
      null, 
      mapDispatchToProps
  )(HomeScreen);