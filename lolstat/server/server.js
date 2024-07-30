import express from "express"
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5000;
const API_key = "RGAPI-8a3ce4b6-d7c4-45fc-a1b2-bb9c0a0fa7d0";
app.use(cors());
app.use(bodyParser.json());


app.listen(port, ()=> {
    console.log(`server is running on port ${port}`);
});

// app.get("/api", (req, res) => {
//     res.json({"users": ["userOne", "userTwo", "userThree"] })
// })

app.get("/api/message", (req, res) => {
    res.json({message: "Hello from the backend!"});
});

app.post("/api/riotid", (req, res) => {
    const data = req.body;
    res.send(data);
})