# Symptoms-Checker
Project 2

# Symptom Checker App

A simple, modern, and responsive web app for checking likely diseases based on entered symptoms.  
Features voice input, dark mode, and a mock AI backend using Node.js and Express.

---

## Features

- Responsive, centered layout
- Dark mode support (automatic via OS)
- Symptom input via text or voice (Web Speech API)
- Shows disease predictions based on symptoms
- Node.js + Express backend with mock AI logic

---

## File Structure

```
your-project/
├── server.js              # Node.js/Express backend
├── symptom-form.html      # Main frontend HTML
├── symptom-form.css       # Modern responsive + dark mode CSS
├── symptom-form.js        # Form input and disease prediction logic
└── voice-input.js         # Adds voice input to symptom field
```

---

## Getting Started

### 1. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed.

Open a terminal in your project folder and run:

```bash
npm init -y
npm install express
```

### 2. Run the Server

Start the Node.js server:

```bash
node server.js
```

You should see:

```
Express server running on port 3000
```

### 3. Open the App

Go to [http://localhost:3000/symptom-form.html](http://localhost:3000/symptom-form.html) in your browser.

---

## Usage

- **Enter symptoms** separated by commas in the input field.  
  Example: `fever, headache, cough`
- Or click the **mic button** and speak your symptoms.
- Click **Submit** to see likely disease predictions below the form.

---

## Voice Input

- Uses the Web Speech API (supported in Chrome and some browsers).
- If your browser doesn't support voice recognition, the mic button will be disabled.

---

## Customization

- You can add more symptom-to-disease mappings in `server.js` within `SYMPTOM_DISEASE_MAP`.
- Adjust styles in `symptom-form.css` for look & feel.
- Extend frontend logic in `symptom-form.js` or `voice-input.js`.

---

## Troubleshooting

- **express not found**: Run `npm install express`
- **Cannot GET /symptom-form.html**:  
  Ensure all files are in project root and `server.js` uses:
  ```js
  app.use(express.static(path.join(__dirname)));
  ```
- **Voice input not working**:  
  Make sure you use a browser that supports the Web Speech API (e.g., Chrome).

---

## License

MIT License

---

## Credits

Created by Pratham Panchal.
