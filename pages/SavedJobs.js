import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {JobItem} from '../components';

const SavedJobs = (props) => {
  const [jobList, setJobList] = useState([]);

  const fetchData = async () => {
    let newJobList = await AsyncStorage.getItem('@SAVED_JOBS');
    newJobList = newJobList == null ? [] : JSON.parse(newJobList);
    setJobList(newJobList);
  };

  const onJobDelete = async (x) => {
    let newJobList = await AsyncStorage.getItem('@SAVED_JOBS');
    newJobList = newJobList == null ? [] : JSON.parse(newJobList);
    newJobList = newJobList.filter((d) => {
      return d.id !== x.id;
    });
    // let index = newJobList.findIndex((a) => a.id == x.id);
    // newJobList.splice(index, 1);

    setJobList(newJobList);
    AsyncStorage.setItem('@SAVED_JOBS', JSON.stringify(newJobList));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
          SAVED JOBS
        </Text>
        <FlatList
          data={jobList}
          renderItem={({item}) => (
            <JobItem
              job={item}
              trash={true}
              onDelete={() => onJobDelete(item)}
            />
          )}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 10,
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}
        onPress={() => props.navigation.goBack()}>
        <Text style={{color: 'white'}}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export {SavedJobs};
