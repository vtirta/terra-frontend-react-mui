import React from 'react';
import {ConnectSample} from './components/ConnectSample';
import {CW20TokensSample} from './components/CW20TokensSample';
import {NetworkSample} from './components/NetworkSample';
import {QuerySample} from './components/QuerySample';
import {SignBytesSample} from './components/SignBytesSample';
import {SignSample} from './components/SignSample';
import {TxSample} from './components/TxSample';

import Container from '@mui/material/Container';
import NavBar from './components/NavBar';

import {ThemeProvider, createTheme} from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#2845AD',
        },
        background: {
            default: "#303030"
        }
    },
    typography: {
        // In Chinese and Japanese the characters are usually larger,
        // so a smaller fontsize may be appropriate.
        fontSize: 14,
        button: {
            textTransform: 'none'
        }
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <NavBar/>
            <Container>
                <ConnectSample/>
                <QuerySample/>
                <TxSample/>
                <SignSample/>
                <SignBytesSample/>
                <CW20TokensSample/>
                <NetworkSample/>
            </Container>
        </ThemeProvider>
    );
}

export default App;
