# Receptenassistent Rosa

**Rosa** is een AI-gestuurde assistent ontworpen om voedselverspilling tegen te gaan. In plaats van nieuwe boodschappen te doen, helpt Rosa je om creatieve maaltijden te bereiden met de ingrediënten die je al in huis hebt.

## Use Case: "Wat ligt er nog in de kast?"
Veel mensen gooien eten weg omdat ze niet weten wat ze met een specifiek restje aan moeten. Rosa lost dit op door:
* **Inventaris-gebaseerd koken:** Je voert alleen in wat je hebt (bijv. "halve paprika en rijst").
* **Basisvoorraad-intelligentie:** Rosa gaat er standaard vanuit dat je peper, zout, olie, suiker en sojasaus hebt.
* **Adviserende rol:** Naast recepten geeft Rosa tips over smaak en techniek in een informele, verzorgende toon.

---

## Installatie & Gebruik

### 1. **Repository clonen & installeren:**
   ```bash
   git clone [jouw-repo-link]
   cd [project-map]
   npm install
```
### 2. Maak een .env file aan en zet je omgevingsvariabelen erin:
```
  AZURE_OPENAI_API_KEY=...
  AZURE_OPENAI_ENDPOINT=...
  AZURE_OPENAI_API_DEPLOYMENT_NAME=...
```

### 3. Start de applicatie:
```
node server.js
```
of
```
npm run dev

```

### Gefeliciteerd! Tijd om Rosa te ontmoeten!
