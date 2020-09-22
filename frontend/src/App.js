import React from 'react';
import { Container} from "react-bootstrap"

import './App.css';

import UploadForm from './UploadForm'
import Header from './Header'

function App() {
  return (
    <div className="App">

      <Header />
      <Container className='mt-4 pt-5' >
        <UploadForm />
      </Container>
      

    </div>
  );
}

export default App;
