document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('symptomForm');
    const input = document.getElementById('symptoms');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const symptomsRaw = input.value.trim();
        if (!symptomsRaw) {
            resultDiv.textContent = "Please enter at least one symptom.";
            return;
        }

        resultDiv.textContent = "Checking...";

        try {
            const response = await fetch('/api/symptoms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ symptoms: symptomsRaw })
            });

            if (!response.ok) {
                throw new Error('Server error');
            }

            const data = await response.json();

            if (data && Array.isArray(data.predictions) && data.predictions.length > 0) {
                resultDiv.innerHTML = `<strong>Disease predictions:</strong><ul>${
                    data.predictions.map(d => `<li>${d}</li>`).join('')
                }</ul>`;
            } else {
                resultDiv.textContent = "No disease predictions found for these symptoms.";
            }
        } catch (error) {
            resultDiv.textContent = "An error occurred. Please try again.";
        }
    });
});