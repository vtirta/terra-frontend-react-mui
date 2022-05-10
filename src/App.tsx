import React from 'react';
import {Card, CardContent, Container} from "@mui/material";
import {ThemeProvider, createTheme} from '@mui/material/styles';
// import {ConnectSample} from './components/ConnectSample';
// import {CW20TokensSample} from './components/CW20TokensSample';
// import {NetworkSample} from './components/NetworkSample';
// import {QuerySample} from './components/QuerySample';
// import {SignBytesSample} from './components/SignBytesSample';
// import {SignSample} from './components/SignSample';
// import {TxSample} from './components/TxSample';
import NavBar from './components/NavBar';
import WalletHoldingsWidget from "./components/WalletHoldingsWidget";

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
            <Container sx={{paddingTop: 10}}>
                <Card sx={{minWidth: 200, maxWidth: 400}}>
                    <CardContent>
                        <WalletHoldingsWidget/>
                    </CardContent>
                </Card>
                {/*<ConnectSample/>*/}
                {/*<QuerySample/>*/}
                {/*<TxSample/>*/}
                {/*<SignSample/>*/}
                {/*<SignBytesSample/>*/}
                {/*<CW20TokensSample/>*/}
                {/*<NetworkSample/>*/}
            </Container>
        </ThemeProvider>
    );
}

export default App;
