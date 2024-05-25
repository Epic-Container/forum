const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE
const dataBase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

app.get("/blog", async (req, res) => {
    const getBlog = await dataBase.from("Blog").select();
    console.log(getBlog)
    res.json(getBlog);
})
app.get("/login", async (req, res) => {
    const getUser = await dataBase.from("User").select();
    console.log(getUser)
    res.json(getUser);
})
app.post("/signup", async (req, res) => {
    const { email, password, token, username } = req.body;
    const insertUser = await dataBase.from("User").insert({ email, password, token, username });
    console.log(email, password, token)
    res.json({ insertUser })
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

