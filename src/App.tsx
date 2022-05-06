import React from 'react';
import {ConnectSample} from './components/ConnectSample';
import {CW20TokensSample} from './components/CW20TokensSample';
import {NetworkSample} from './components/NetworkSample';
import {QuerySample} from './components/QuerySample';
import {SignBytesSample} from './components/SignBytesSample';
import {SignSample} from './components/SignSample';
import {TxSample} from './components/TxSample';
import './App.css';

function App() {
  return (
    <div className="App">
      <ConnectSample/>
      <QuerySample/>
      <TxSample/>
      <SignSample/>
      <SignBytesSample/>
      <CW20TokensSample/>
      <NetworkSample/>

      <header className="App-header">

      </header>

    </div>
  );
}

export default App;
