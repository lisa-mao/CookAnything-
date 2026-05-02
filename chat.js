import {AzureChatOpenAI} from "@langchain/openai"
const baseModel = new AzureChatOpenAI({temperature: 0.2})

const recipeSchema = {
    type: "object",
    properties: {
        recipeName: { type: "string" },
        ingredients: { type: "array", items: { type: "string" } },
        instructions: { type: "string" },
        difficulty: { type: "number", description: "1 to 5 stars" }
    },
    required: ["recipeName", "ingredients", "instructions"]
}
//error dat hij jsonSchema niet accepteerde, omdat dit toendertijd nog niet kon en het alleen kan bij nieuwere modellen, daarom gebruik ik jsonMode
const model = baseModel.withStructuredOutput(
    recipeSchema, {method: "jsonMode"}
)
const messages = [
    { role: "system",
        content: `You are a recipe generator that can think of any recipe with the ingrediënts that the user provides. 
    You always respond in this exact JSON format: {
            "recipeName": "here the recipe name", 
            "ingredients": ["item 1", "item 2"], 
            "instructions": "Here you give the instructions of this recipe and format it neat with bulletpoints", 
            "difficulty": 3
        }`}
];

export async function callAssistant(prompt) {
    messages.push({
        role: "user", content: prompt
    })

    const result = await model.invoke(messages);

    messages.push({
        role: "assistant", content: JSON.stringify(result)
    })

    return result
}
