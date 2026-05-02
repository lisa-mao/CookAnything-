import express from 'express'
import {callAssistant} from "./chat.js";
import cors from 'cors'

const app = express()
app.use(express.json())

app.use(cors());
app.use(express.static("public"));


app.get('/api/test', async (req, res) => {
    try {
        const response = await callAssistant("Can you think of a recipe that i can make with tomatoes, eggs and rice?")
        res.json({response})
    } catch (error) {
        res.status(500).json({error: error.message})
    }

})

app.post('/api/chat', async (req, res) => {
    try {
        const userInput = req.body.prompt;
        const recipeObject = await callAssistant(userInput)

        res.json({
            recipeName: recipeObject.recipeName,
            ingredients: recipeObject.ingredients,
            instructions: recipeObject.instructions,
            difficulty: recipeObject.difficulty
        });

    } catch (error) {
        res.status(500).json({error: "failed to generate recipe"});
    }
});

app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile("public/index.html", {root: "."});
});

app.listen(8000, () => console.log(`Server on http://localhost:8000`))