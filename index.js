import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();
const port = process.env.PORT || 8080;

config();

app.use(cors());
app.use(express.json());

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.daanzm4.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(mongoURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const tasks = client.db('tasksDB').collection('tasks')

app.get("/", (req, res) => {
    try {
        res.send("Server is Running")
    } catch (error) {
        console.log(error);
    }
});
app.post("/add-task", (req, res)=>{
    
})
app.listen(port,()=>{
    console.log(`Listing... ${port}`);
})