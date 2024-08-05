import express from "express"
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

import { configDotenv } from "dotenv";
configDotenv();









const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());


app.listen(port, ()=> {
    console.log(`server is running on port ${port}`);
});

app.get("/api", (req, res) => {
    res.send("asdklfaasdf");
})


app.get('/api/searchPlayer', async (req, res) => {
    const { gameName, tagLine } = req.query;
    const riotID = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${process.env.API_KEY}`;
    try {
        
        const response = await axios.get(riotID);

        try{
            const puuid = response.data.puuid;
            const summoner = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.API_KEY}`;
            const summonerResponse = await axios.get(summoner);
            const rank = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerResponse.data.id}?api_key=${process.env.API_KEY}`;
            const rankResponse = await axios.get(rank);
            // const matchIdListApi = `https://na1.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${process.env.API_KEY}`;
            // const matchIdListResponse = await axios.get(matchIdListApi);
            // console.log("bruh4");
            // console.log({
            //     summoner: summonerResponse.data,
            //     rank: rankResponse.data[0],
            //     matches: matchIdListResponse.data,
            // });
        

            res.json({
                summoner: summonerResponse.data,
                rank: rankResponse.data[0],
                // matches: matchIdListResponse.data,
        });
        } catch(dataError) {
            res.status(500).json({error: "error fetching data"})
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});