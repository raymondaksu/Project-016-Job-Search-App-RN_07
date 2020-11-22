import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

import {topicItem} from '../styles';

const TopicItem = (props) => {
  return (
    <View style={topicItem.container}>
      <TouchableOpacity
        style={[topicItem.button, {backgroundColor: `#${props.item.color}`}]}
        onPress={props.onSelect}>
        <Text style={topicItem.text}>{props.item.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export {TopicItem};
