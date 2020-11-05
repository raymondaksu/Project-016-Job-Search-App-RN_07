import React from 'react';
import {View, TextInput} from 'react-native';
import {searchBar} from '../styles';

const SearchBar = (props) => {
  return (
    <View style={searchBar.container}>
      <TextInput
        placeholder={props.place}
        style={searchBar.text}
        onChangeText={(val) => props.changeText(val)}
      />
    </View>
  );
};

export {SearchBar};
