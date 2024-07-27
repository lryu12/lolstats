import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_KEY = "RGAPI-8a3ce4b6-d7c4-45fc-a1b2-bb9c0a0fa7d0";

function App() {
  const [backendData, setBackendData] = useState('');
  
  useEffect(()=> {
    axios.get('/api')
    .then(response => response.json()
  ).then(
    data => {
      setBackendData(data)
    }
  ).catch(error=> {
      console.error('There was an error fetching the message!', error);

    });
  }, []);

  return (
    <div>
      <h1>League of Legends Stat</h1>
      <input></input>
      <button>submit</button>
    </div>
  )
}

export default App
