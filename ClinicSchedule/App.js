import React from 'react';
import { NativeBaseProvider} from "native-base";
import { LoginContextProvider } from './src/context/loginContext';
import Routes from './src/routes';
import theme from './src/assets/theme';

const App = () => (
    <NativeBaseProvider theme={theme}>
      <LoginContextProvider>
        <Routes/>
      </LoginContextProvider>
    </NativeBaseProvider>
);

export default App;