// Voice Input for Symptoms using Web Speech API
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('symptoms');
    let micBtn = document.getElementById('micBtn');
    
    // If button doesn't exist, create it
    if (!micBtn) {
        micBtn = document.createElement('button');
        micBtn.type = "button";
        micBtn.id = "micBtn";
        micBtn.title = "Speak your symptoms";
        micBtn.style.marginLeft = "8px";
        micBtn.style.padding = "0.5em 1em";
        micBtn.style.borderRadius = "50%";
        micBtn.style.border = "none";
        micBtn.style.background = "#3182ce";
        micBtn.style.color = "#fff";
        micBtn.style.fontSize = "1.1em";
        micBtn.style.cursor = "pointer";
        micBtn.style.verticalAlign = "middle";
        micBtn.innerHTML = "🎤";
        input.parentNode.insertBefore(micBtn, input.nextSibling);
    }

    // Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        micBtn.addEventListener('click', function() {
            micBtn.disabled = true;
            micBtn.textContent = "🛑";
            recognition.start();
        });

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            input.value = transcript;
        };

        recognition.onend = function() {
            micBtn.disabled = false;
            micBtn.textContent = "🎤";
        };

        recognition.onerror = function(event) {
            micBtn.disabled = false;
            micBtn.textContent = "🎤";
            alert('Voice input error: ' + event.error);
        };
    } else {
        micBtn.disabled = true;
        micBtn.title = "Voice input not supported";
        micBtn.style.opacity = "0.5";
    }
});