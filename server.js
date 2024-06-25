import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import { dirname } from "path";
import { fileURLToPath } from "url";

const db='mongodb+srv://nidhi:nidhi2202@cluster0.qllhyoe.mongodb.net/UserData?retryWrites=true&w=majority&appName=Cluster0';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

const __dirname = dirname(fileURLToPath(import.meta.url));

const app=express();
const port =3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(db).then(() => {
    console.log(`Connection successful`);
}).catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.send('User registered successfully');
        // res.redirect("/");
    } catch(err) {
        res.status(400).send('Error registering user');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});