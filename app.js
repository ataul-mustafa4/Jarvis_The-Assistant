const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function listVoices() {
    const voices = window.speechSynthesis.getVoices();
    voices.forEach(voice => {
        console.log(voice.name + ' (' + voice.lang + ')');
    });
}

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 2;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    // Set the voice to Indian English if available
    const voices = window.speechSynthesis.getVoices();
    const indianVoice = voices.find(voice => voice.name === 'Google Indian English'); // Adjust this name
    if (indianVoice) {
        text_speak.voice = indianVoice;
    } else {
        // Fallback if Indian voice is not found
        text_speak.voice = voices[0]; // Use the first available voice
    }

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();
    speak("Initializing JARVIS: An Assistant created by Mustafa"); // New message

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    listVoices(); // List available voices
    wishMe(); // Call wishMe when the window loads
});

window.speechSynthesis.onvoiceschanged = function() {
    listVoices(); // List voices when they change
};

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
}

btn.addEventListener('click', () => {
    content.textContent = "Listening....";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes("open instagram")) {
        window.open("https://www.instagram.com", "_blank");
        speak("Opening Instagram...");
    } else if (message.includes("open whatsapp")) {
        window.open("whatsapp://", "_self");
        speak("Opening WhatsApp...");
    } else if (message.includes("open telegram")) {
        window.open("tg://", "_self");
        speak("Opening Telegram...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator://', "_self");
        const finalText = "Opening Calculator";
        speak(finalText);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}