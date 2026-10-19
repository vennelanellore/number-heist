
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

const FLAG = process.env.CTF_FLAG || "IEEECTF{whiskers_caught}";

app.get("/", (req, res) => {
    res.send("🐱 Number Heist backend is running!");
});

// Intentionally vulnerable endpoint for this CTF lab.
// It trusts a role supplied by the client.
app.post("/api/investigate", (req, res) => {
    if (req.body.role === "admin") {
        return res.json({
            success: true,
            message: "Admin clue unlocked! Your final code is CAT30."
        });
    }

    return res.status(403).json({
        success: false,
        message: "Access denied! Whiskers says: Nice try, human! 😹"
    });
});

app.post("/api/claim", (req, res) => {
    if (req.body.code === "CAT30") {
        return res.json({
            success: true,
            flag: FLAG
        });
    }

    return res.status(403).json({
        success: false,
        message: "Wrong code! The cat is guarding the flag! 🐱"
    });
});

app.listen(PORT, () => {
    console.log(`Number Heist backend running on port ${PORT}`);
});
