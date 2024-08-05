import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Profile from './profile';
import gif from './assets/katarina.gif';


function App() {
  const [searchText, setSearchText] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [summonerInfo, setSummonerInfo] = useState({});
  const [rankInfo, setRankInfo] = useState({});
  const [errorMessage, setErrorMessage] =  useState("");
  const [matchInfo, setMatchInfo] = useState([]);




  function searchForPlayer(player) {
    const gameName = searchText;
    const tagLine = searchTag;

    setSummonerInfo({});
    setRankInfo({});
    setErrorMessage("");

    axios.get(`/api/searchPlayer`, {
        params: { gameName, tagLine }
    }).then(function (response) {
        setSummonerInfo(response.data.summoner);
        setRankInfo(response.data.rank);
        // setMatchInfo(response.data.matches);
        console.log(response.data);
    }).catch(error => {
      if (error.response && error.response.status === 500) {
      setErrorMessage("Invalid Riot ID or Tag Line :(");
      }
    })
}
  

  

  return (
    <div>
      <h1>League of Legends Stat</h1>
      <div className='form-container'>
        <div></div>
        <label for="riotIdInout">Riot ID:</label>
        <input name="riotIdInout" onChange = {e => setSearchText(e.target.value)}></input>
        <label for="tagLineInput">Tag Line:</label>
        <input name="tagLineInput" onChange = {e => setSearchTag(e.target.value)}></input>
        <button onClick = {e => { searchForPlayer(e)}}> submit</button>
      </div>

      {
        (errorMessage === "" && Object.keys(summonerInfo).length === 0)?
         <img src={gif} className='katarina'/> 
         : ((errorMessage !== "")? (
          <p>{errorMessage}</p>
        )
        : ( <Profile playerData = {summonerInfo} rankData = {rankInfo} /> ))
      }
    </div>
  )
}

export default App
