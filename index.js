import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

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

const tasks = client.db("tasksDB").collection("tasks");

app.get("/", (req, res) => {
    try {
        res.send("Server is Running");
    } catch (error) {
        console.log(error);
    }
});
app.get("/all-task", async (req, res) => {
    const email = req.query.email;
    let filter = {};
    if (email) {
        filter.createdBy = email;
    }
    const result = await tasks.find(filter).toArray();
    res.send(result);
});
app.post("/add-task", async (req, res) => {
    const task = req.body;
    const result = await tasks.insertOne(task);
    res.send(result);
});
app.delete("/delete-task/:id", async (req, res) => {
    const id = req.params.id;
    const filter = {
        _id: new ObjectId(id),
    };
    const result = await tasks.deleteOne(filter);
    res.send(result);
});
app.put("/update-task/:id", async (req, res) => {
    const id = req.params.id;
    const status = req.body;
    const filter = {
        _id: new ObjectId(id),
    };
    const updateDoc = {
        $set: status,
    };
    const result = await tasks.updateOne(filter, updateDoc);
    res.send(result);
});
app.listen(port, () => {
    console.log(`Listing... ${port}`);
});
