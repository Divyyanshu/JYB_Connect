import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Navigation} from './navigation';
import Toast from 'react-native-toast-message';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const App = () => {
  useEffect(() => {
    changeNavigationBarColor('black', false);
  }, []);

  return (
    <PaperProvider>
      <StatusBar backgroundColor="#A6192E" barStyle="light-content" />
      <View style={{flex: 1}}>
        <Navigation />
        <Toast />
      </View>
    </PaperProvider>
  );
};

export default App;
