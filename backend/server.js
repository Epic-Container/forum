const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3211;

app.use(express.json());
app.use(cors());

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
const dataBase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

// Fungsi untuk memeriksa kredensial
async function checkCredentials(email, password) {
    try {
        const { data, error } = await dataBase.from("Users").select().eq("email", email).eq("password", password);
        if (error) throw error;
        return data.length > 0; // True jika ada kredensial yang cocok, false jika tidak
    } catch (error) {
        console.error("Error checking credentials:", error.message);
        return false;
    }
}

// Endpoint untuk login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const isValidCredentials = await checkCredentials(email, password);
        if (isValidCredentials) {
            return res.status(200).json({ message: "Login successful" });
        } else {
            return res.status(401).json({ error: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error during login:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

