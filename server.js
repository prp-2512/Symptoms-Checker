const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

const SYMPTOM_DISEASE_MAP = {
    fever: ['Flu', 'COVID-19', 'Malaria'],
    cough: ['Common Cold', 'Bronchitis', 'Asthma'],
    headache: ['Migraine', 'Tension Headache', 'Sinusitis'],
    fatigue: ['Anemia', 'Diabetes', 'Hypothyroidism'],
    rash: ['Allergy', 'Measles', 'Chickenpox'],
    nausea: ['Food Poisoning', 'Gastritis', 'Pregnancy'],
    sore_throat: ['Pharyngitis', 'Tonsillitis', 'Strep Throat'],
    // add more mappings as needed
};

function mockAIPredict(symptoms) {
    const normalized = symptoms.map(s => s.trim().toLowerCase().replace(/\s+/g, '_'));
    const diseaseSet = new Set();

    normalized.forEach(symptom => {
        if (SYMPTOM_DISEASE_MAP[symptom]) {
            SYMPTOM_DISEASE_MAP[symptom].forEach(disease => diseaseSet.add(disease));
        }
    });

    if (diseaseSet.size === 0) {
        return ['Unknown', 'Consult a doctor'];
    }

    return Array.from(diseaseSet).slice(0, 3);
}

// Accepts: { symptoms: "cough, fever, headache" }
app.post('/api/symptoms', (req, res) => {
    let symptoms = req.body.symptoms;

    // Accept array or comma separated string
    if (Array.isArray(symptoms)) {
        // OK
    } else if (typeof symptoms === 'string') {
        symptoms = symptoms.split(',').map(s => s.trim()).filter(Boolean);
    } else {
        return res.status(400).json({ error: "Please provide symptoms as a string or array." });
    }

    if (!symptoms || symptoms.length === 0) {
        return res.status(400).json({ error: "Please provide at least one symptom." });
    }

    const predictions = mockAIPredict(symptoms);
    res.json({ predictions });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});