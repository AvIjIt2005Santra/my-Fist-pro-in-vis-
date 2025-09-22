function getResponse() {
    let input = document.getElementById("userInput").value.toLowerCase();
    let responseText = "I don't understand that.";

    if (input.includes("hello")) {
        responseText = "Hello! How can I assist you?";
    } else if (input.includes("your name")) {
        responseText = "I am your visual assistant.";
    } else if (input.includes("time")) {
        responseText = "The current time is " + new Date().toLocaleTimeString();
    } else if (input.includes("call")) {
        let name = input.split("call ")[1];
        if (name) {
            responseText = "Calling " + name;
            makeCall(name);
        } else {
            responseText = "Please specify a name.";
        }
    } else if (input.includes("weather")) {
        getWeather();
        return;
    } else if (input.includes("security alert")) {
        triggerSecurityAlert();
        return;
    }

    document.getElementById("response").innerText = responseText;
    speak(responseText);
}

function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
}

function startListening() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onresult = function(event) {
        let voiceInput = event.results[0][0].transcript.toLowerCase();
        document.getElementById("userInput").value = voiceInput;
        getResponse();
    };
    recognition.start();
}

function makeCall(name = "") {
    let number = "tel:";
    if (name.toLowerCase() === "john") {
        number += "1234567890"; // Example number
    } else {
        number += "9876543210"; // Default number
    }
    window.location.href = number;
}

function getWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=New York&units=metric&appid=YOUR_API_KEY')
    .then(response => response.json())
    .then(data => {
        let weatherText = `The weather in ${data.name} is ${data.weather[0].description} with a temperature of ${data.main.temp}°C.`;
        document.getElementById("response").innerText = weatherText;
        speak(weatherText);
    })
    .catch(error => {
        document.getElementById("response").innerText = "Unable to fetch weather data.";
        speak("Unable to fetch weather data.");
    });
}

function triggerSecurityAlert() {
    let alertMessage = "⚠️ Security Alert! Immediate action required!";
    document.getElementById("response").innerText = alertMessage;
    speak(alertMessage);
    alert(alertMessage);
    
    // You can add additional actions like sending an alert message to a contact
    console.log("Security alert triggered!");
}
