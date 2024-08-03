import express from "express"
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

import { configDotenv } from "dotenv";
configDotenv();







console.log(process.env.API_KEY);


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
        const puuid = response.data.puuid;
        console.log("bruh1");
        const summoner = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.API_KEY}`;
        const summonerResponse = await axios.get(summoner);
        console.log("bruh2");
        const rank = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerResponse.data.id}?api_key=${process.env.API_KEY}`;
        const rankResponse = await axios.get(rank);
        console.log("bruh3");
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
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});