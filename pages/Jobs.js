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
import {JobItem, SearchBar} from '../components';
import {jobs} from '../styles';

const Jobs = (props) => {
  const {selectedLanguage} = props.route.params;
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [modalFlag, setModalFlag] = useState(false);
  const [forModalJobList, setForModalJobList] = useState([]);
  const [text, setText] = useState('');

  const fetchData = async () => {
    const response = await Axios.get(
      `https://jobs.github.com/positions.json?search=${selectedLanguage.toLowerCase()}`,
    );
    setData(response.data);
    setDisplayData(response.data);
  };

  const filterJobs = () => {
    const filteredJobList = data.filter((item) => {
      const searchValue = text.toUpperCase();
      const jobTitle = item.title.toUpperCase();

      return jobTitle.indexOf(searchValue) > -1;
    });
    setDisplayData(filteredJobList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [text]);

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
    setForModalJobList(savedJobList);

    AsyncStorage.setItem('@SAVED_JOBS', JSON.stringify(savedJobList));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#64bdd1'}}>
      <View style={{flex: 1}}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          JOBS FOR {selectedLanguage.toUpperCase()}
        </Text>
        <SearchBar place="Search a job..." changeText={(x) => setText(x)} />
        <FlatList data={displayData} renderItem={renderJobs} />

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
