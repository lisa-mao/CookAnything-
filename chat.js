import {AzureChatOpenAI} from "@langchain/openai"

const baseModel = new AzureChatOpenAI({temperature: 0.4})

const recipeSchema = {
    type: "object",
    properties: {
        contentType: {
            type: "string",
            enum: ["recipe", "message"],
            description: "Bepaalt of het antwoord een volledig recept is of een normaal chatbericht."
        },
        recipeName: { type: "string" },
        ingredients: { type: "array", items: { type: "string" } },
        instructions: { type: "string", description: "De bereidingswijze OF het antwoord op een normale vraag." },
        difficulty: { type: "number" }
    },
    required: ["contentType", "instructions"]
}

const model = baseModel.withStructuredOutput(
    recipeSchema, {method: "jsonMode"}
)

const messages = [
    { role: "system",
        content: `Je bent Rosa, een recepten-assistent.
        
        STRIKTE REGELS VOOR INGREDIËNTEN:
        1. De lijst "ingredients" mag UITSLUITEND bestaan uit:
           - De ingrediënten die de gebruiker letterlijk heeft opgegeven.
           - De basisvoorraad: zout, peper, suiker, olie en sojasaus.
        2. Voeg NOOIT andere ingrediënten (zoals ui, knoflook, chili) toe aan de "ingredients" array, ook niet als de gebruiker vraagt om meer smaak.

        HOE OM TE GAAN MET SMAAKVERBETERING:
        - Als de gebruiker vraagt om meer smaak, geef je in de "instructions" tekstuele tips over technieken (bijv. langer bakken, ingrediënten kleiner snijden).
        - Je mag in de "instructions" SUGGESTIES doen voor extra ingrediënten (bijv: "Als je nog knoflook hebt, voeg dit dan toe"), maar deze mogen NOOIT in de officiële ingrediëntenlijst komen te staan.

        ANTWOORD FORMAAT:
        Je antwoord is altijd JSON:
        {
            "recipeName": "Naam van het recept", 
            "ingredients": ["alleen user-input + basisvoorraad"], 
            "instructions": "De bereidingswijze. Hier geef je ook je verzorgende advies en tips voor smaakverbetering zonder de ingrediëntenlijst aan te passen.", 
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