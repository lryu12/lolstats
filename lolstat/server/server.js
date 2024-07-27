import express from "express"
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());


app.listen(port, ()=> {
    console.log(`server is running on port ${port}`);
});

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"] })
})

app.get("/api/message", (req, res) => {
    res.json({message: "Hello from the backend!"});
});