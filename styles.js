import {StyleSheet, Dimensions} from 'react-native';

export const topicItem = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  button: {
    flex: 1,
    padding: 10,
    margin: 7,
    marginVertical: 20,
    borderRadius: 6,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
    alignSelf: 'stretch'
  },
});

export const jobItem = StyleSheet.create({
  container: {
    padding: 12,
    margin: 7,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#bdbdbd',
    backgroundColor: '#e0e0e0',
  },
  jobname: {
    fontWeight: 'bold',
  },
});

export const introduction = StyleSheet.create({
  banner: {
    height: Dimensions.get('window').height / 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a1d9f7',
    margin: 20,
    borderRadius: 20,
  },
  bannerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    height: Dimensions.get('window').height / 3,
  }
});

export const jobs = StyleSheet.create({
  modalBackground: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  jobtitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  jobDesc: {
    height: Dimensions.get('window').height / 3,
  },
});

export const searchBar = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: '#eceff1',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
});
