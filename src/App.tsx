import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { Example } from './components/Example';
import OrientationHOC from './OrientationHOC';

const styles = StyleSheet.create({
  container: { backgroundColor: '#E6E6E6', height: '100%', width: '100%' },
});

const App = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={styles.container}>
      {OrientationHOC(Example)}
    </SafeAreaView>
  </>
);

export default App;
