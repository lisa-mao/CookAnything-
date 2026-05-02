
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const submitButton = chatForm.querySelector('button');

window.addEventListener('DOMContentLoaded', () => {
    const welcomeMessage = `
# Welkom!
Ik help je graag bij het bedenken van een lekker recept. 

**Kleine tip:** Ik ga er vanuit dat je standaardzaken zoals **zout, peper, suiker, olie en sojasaus** al in huis hebt. 

Wat ligt er nog in jouw koelkast/kasten?`;

    addMessage(welcomeMessage, 'server');
});

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userInput = chatInput.value.trim();
    if (!userInput) return;

    addMessage(userInput, 'user');
    chatInput.value = '';

    //zorgt ervoor dat de button disabled wordt tijdens de prompt
    submitButton.disabled = true;
    submitButton.innerHTML = "Pending..."

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: userInput }),
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

const markdownText =
    `# ${data.recipeName}, 
### Ingredients: ${data.ingredients.join(', ')}, 
### Instructions: ${data.instructions}, 
### Difficulty: ${data.difficulty}`

        addMessage(markdownText,  'server');

    } catch (error) {
        console.error('Error fetching from server:', error);
        addMessage('Sorry, something went wrong.', 'server');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = "Submit"
        chatInput.focus();
    }
});

chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.requestSubmit();
    }
});

function addMessage(text, sender) {


    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.innerHTML = marked.parse(text);

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}