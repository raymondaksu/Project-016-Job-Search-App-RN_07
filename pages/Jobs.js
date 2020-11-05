import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {WebView} from 'react-native-webview';
import {JobItem} from '../components';
import {jobs} from '../styles';

const Jobs = (props) => {
  const {selectedLanguage} = props.route.params;
  const [data, setData] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [modalFlag, setModalFlag] = useState(false);
  const [forModalJobList, setForModalJobList] = useState([]);

  const fetchData = async () => {
    const response = await Axios.get(
      `https://jobs.github.com/positions.json?search=${selectedLanguage.toLowerCase()}`,
    );
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function onJobSelect(job) {
    setModalFlag(true);
    setSelectedJob(job);
  }

  const renderJobs = ({item}) => (
    <JobItem job={item} onSelect={() => onJobSelect(item)} trash={false} />
  );

  const onJobSave = async () => {
    let savedJobList = await AsyncStorage.getItem('@SAVED_JOBS');
    savedJobList = savedJobList == null ? [] : JSON.parse(savedJobList);

    savedJobList.findIndex((a) => a.id == selectedJob.id) !== -1
      ? null
      : (savedJobList = [...savedJobList, selectedJob]);
    setForModalJobList(savedJobList)

    AsyncStorage.setItem('@SAVED_JOBS', JSON.stringify(savedJobList));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          JOBS FOR {selectedLanguage.toUpperCase()}
        </Text>
        <FlatList data={data} renderItem={renderJobs} />

        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 10,
            position: 'absolute',
            bottom: 10,
            right: 10,
          }}
          onPress={() => props.navigation.navigate('SavedJobs')}>
          <Text style={{color: 'white'}}>Show Saved Jobs</Text>
        </TouchableOpacity>

        <Modal
          isVisible={modalFlag}
          onBackdropPress={() => setModalFlag(false)}>
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
            {forModalJobList.findIndex((a) => a.id == selectedJob.id) !== -1 ? (
              <Button title="Back" onPress={() => setModalFlag(false)} />
            ) : (
              <Button title="Save" onPress={onJobSave} />
            )}
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export {Jobs};
