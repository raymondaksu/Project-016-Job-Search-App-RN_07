import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {WebView} from 'react-native-webview';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';

import {JobItem} from '../components';
import {jobs} from '../styles';

const SavedJobs = (props) => {
  const [jobList, setJobList] = useState([]);
  const [modalFlag, setModalFlag] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');

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

  function onJobSelect(job) {
    setModalFlag(true);
    setSelectedJob(job);
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#64bdd1'}}>
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
              onSelect={() => onJobSelect(item)}
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
          left: 10,
        }}
        onPress={() => props.navigation.goBack()}>
        <Text style={{color: 'white'}}>Back</Text>
      </TouchableOpacity>

      <Modal isVisible={modalFlag} onBackdropPress={() => setModalFlag(false)}>
        <View style={jobs.modalBackground}>
          <View style={{borderBottomWidth: 2, borderColor: '#bdbdbd'}}>
            <Text style={jobs.jobtitle}>{selectedJob.title}</Text>
            <Text>
              {selectedJob.location} / {selectedJob.title}
            </Text>
            <Text>{selectedJob.company}</Text>
          </View>
          <View style={jobs.jobDesc}>
            <WebView source={{html: selectedJob.description}} />
          </View>
          {jobList.findIndex((a) => a.id == selectedJob.id) !== -1 ? (
            <Button title="Back" onPress={() => setModalFlag(false)} />
          ) : null}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export {SavedJobs};
