import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Profile from './profile';
import gif from './assets/katarina.gif';

const API_KEY = "RGAPI-79c46a59-d42a-4a3f-8c17-d2a4e03f4075";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [summonerInfo, setSummonerInfo] = useState({});
  const [rankInfo, setRankInfo] = useState({});
  const [matchInfo, setMatchInfo] = useState([]);
  let puuid = "";



  function searchForPlayer(player) {
    const gameName = searchText;
    const tagLine = searchTag;
    
    const riotID = `/api/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}` + "?api_key=" + API_KEY;
    
    axios.get(riotID).then(function (response) {
      console.log(response.data.puuid);
      puuid = response.data.puuid;

      const summoner = `/lol/summoner/v4/summoners/by-puuid/${puuid}`+ "?api_key=" + API_KEY;
      
        axios.get(summoner).then(function(response) {
          setSummonerInfo(response.data);

          const rank = `/lol/league/v4/entries/by-summoner/${response.data.id}?api_key=${API_KEY}`;
          axios.get(rank).then(function(response) {
            setRankInfo(response.data[0]);
            console.log(response.data[0]);
          }).catch(function(error){
            console.log(error);
          });

        }).catch(function(error){
          console.log(error);
        });

        const matchIdListApi = `/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${API_KEY}`;

        axios.get(matchIdListApi).then(function(response){
          setMatchInfo(response.data);
          console.log(response.data);
        }).catch(function(error) {
          console.log(error);
        });

        matchInfo.forEach(match => {
          axios.get()
        })

    }).catch(function(error){
      console.log(error);
    });   
    
    
  }
  

  

  return (
    <div>
      <h1>League of Legends Stat</h1>
      <div className='form-container'>
        <input onChange = {e => setSearchText(e.target.value)}></input>
        <input onChange = {e => setSearchTag(e.target.value)}></input>
        <button onClick = {e => { searchForPlayer(e)}}> submit</button>
      </div>

      {(JSON.stringify(summonerInfo) === "{}" && JSON.stringify(rankInfo) === "{}")?
        <img src={gif} className='katarina'/>
        : <Profile playerData = {summonerInfo} rankData = {rankInfo} matchData = {matchInfo}/>
      }
    </div>
  )
}

export default App
