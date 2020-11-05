import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import {jobItem} from '../styles';

const JobItem = (props) => {
  return (
    <TouchableOpacity style={jobItem.container} onPress={props.trash ? null : props.onSelect}>
      <Text style={jobItem.jobname}>{props.job.title}</Text>
      <Text>
        {props.job.type} / {props.job.location}
      </Text>
      {props.trash ? (
        <TouchableOpacity style={{right: 10, top: 18, position: 'absolute'}} onPress={props.onDelete}>
          <Icon name={'trash'} size={25} color={'red'} />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

export {JobItem};
