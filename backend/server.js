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

app.post('/post/:token', async (req, res) => {
    const { token } = req.params;
    const { title, content, rating } = req.body;
    const getUser = await dataBase.from("User").select();
    let username = ''
    for (let i in getUser.data) {
        if (getUser.data[i].token === token) {
            username = getUser.data[i].username
        }
    }
    console.log( title, token, content, username)
    const insertBlog = await dataBase.from("Blog").insert({ title, content, username, rating });
    res.json({ insertBlog })
})
app.post('/like/:token', async (req, res) => {
    const { token } = req.params;
    const getUser = await dataBase.from("User").select();
    const getBlog = await dataBase.from("Blog").select();
    let username = ''
    for (let i in getUser.data) {
        if (getUser.data[i].token === token) {
            username = getUser.data[i].username
        }
    }
    const { id, likeButton, dislikeButton } = req.body;
    let rating;
    for (let i in getBlog.data) {
        if (getBlog.data[i].id == id) {
            rating = getBlog.data[i].rating
        }
    }
    console.log(rating)
    if (likeButton) {
        // Hapus username dari array dislike jika ada
        if (rating.dislike.includes(username)) {
            rating.dislike = rating.dislike.filter(item => item !== username);
        }
        // Tambahkan username ke array like jika belum ada
        if (!rating.like.includes(username)) {
            rating.like.push(username);
        }
    } else {
        // Hapus username dari array like jika ada
        rating.like = rating.like.filter(item => item !== username);
    }
    
    if (dislikeButton) {
        // Hapus username dari array like jika ada
        if (rating.like.includes(username)) {
            rating.like = rating.like.filter(item => item !== username);
        }
        // Tambahkan username ke array dislike jika belum ada
        if (!rating.dislike.includes(username)) {
            rating.dislike.push(username);
        }
    } else {
        // Hapus username dari array dislike jika ada
        rating.dislike = rating.dislike.filter(item => item !== username);
    }
    

    const rewrite = await dataBase.from("Blog").update({rating}).eq("id", parseInt(id));
    res.json({ rewrite })
})
app.post("/signup", async (req, res) => {
    const { email, password, token, username } = req.body;
    const insertUser = await dataBase.from("User").insert({ email, password, token, username });
    console.log(email, password, token)
    res.json({ insertUser })
});
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

