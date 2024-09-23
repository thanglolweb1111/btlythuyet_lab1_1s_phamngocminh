import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './screens/HomeScreen';
import LinearGradient from 'react-native-linear-gradient';

const App = () => {
  return (
    <PaperProvider>
      <HomeScreen />
    </PaperProvider>
  );
};

export default App;
