"use strict";

// const btn = document.querySelector('.talk');
// const content = document.querySelector('.content');
// const status = document.querySelector('.status'); // New reference for status message
// let isListening = false; // Flag to track if currently listening
// function speak(text) {
//     const text_speak = new SpeechSynthesisUtterance(text);
//     text_speak.rate = 1;
//     text_speak.volume = 1;
//     text_speak.pitch = 1;
//     window.speechSynthesis.speak(text_speak);
// }
// function startRecognition() {
//     isListening = true; // Set listening state
//     content.textContent = "Listening....";
//     status.textContent = "Tap to stop"; // Show tap to stop message
//     recognition.start();
// }
// function stopRecognition() {
//     isListening = false; // Reset listening state
//     recognition.stop(); // Stop the speech recognition
//     content.textContent = "Click here to speak"; // Reset content text
//     status.textContent = ""; // Clear the status message
// }
// function wishMe() {
//     var day = new Date();
//     var hour = day.getHours();
//     if (hour >= 0 && hour < 12) {
//         speak("Good Morning Boss...");
//     } else if (hour >= 12 && hour < 17) {
//         speak("Good Afternoon Master...");
//     } else {
//         speak("Good Evening Sir...");
//     }
// }
// window.addEventListener('load', () => {
//     speak("Initializing JARVIS..");
//     wishMe();
// });
// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();
// recognition.onresult = (event) => {
//     const currentIndex = event.resultIndex;
//     const transcript = event.results[currentIndex][0].transcript;
//     content.textContent = transcript;
//     takeCommand(transcript.toLowerCase());
// };
// recognition.onend = () => {
//     isListening = false; // Reset flag when recognition ends
//     content.textContent = "Click here to speak"; // Reset content
//     status.textContent = ""; // Clear status message
// };
// // Attach the click event to the entire input box
// document.querySelector('.input').addEventListener('click', () => {
//     if (isListening) {
//         stopRecognition(); // Stop recognition if already listening
//     } else {
//         startRecognition(); // Start recognition if not listening
//     }
// });
// function takeCommand(message) {
//     if (message.includes('hey') || message.includes('hello')) {
//         speak("Hello Sir, How May I Help You?");
//     } else if (message.includes("open google")) {
//         window.open("https://google.com", "_blank");
//         speak("Opening Google...");
//     } else if (message.includes("open youtube")) {
//         window.open("https://youtube.com", "_blank");
//         speak("Opening Youtube...");
//     } else if (message.includes("open facebook")) {
//         window.open("https://facebook.com", "_blank");
//         speak("Opening Facebook...");
//     } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
//         window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
//         const finalText = "This is what I found on the internet regarding " + message;
//         speak(finalText);
//     } else if (message.includes('wikipedia')) {
//         window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
//         const finalText = "This is what I found on Wikipedia regarding " + message;
//         speak(finalText);
//     } else if (message.includes('time')) {
//         const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
//         const finalText = time;
//         speak(finalText);
//     } else if (message.includes('date')) {
//         const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
//         const finalText = date;
//         speak(finalText);
//     } else if (message.includes('calculator')) {
//         window.open('Calculator:///');
//         const finalText = "Opening Calculator";
//         speak(finalText);
//     } else {
//         window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
//         const finalText = "I found some information for " + message + " on Google";
//         speak(finalText);
//     }
// }
// New 
var btn = document.querySelector('.talk');
var content = document.querySelector('.content');
var status = document.querySelector('.status'); // New reference for status message

var isListening = false; // Flag to track if currently listening

var voices = []; // To store available voices

function populateVoiceList() {
  voices = window.speechSynthesis.getVoices(); // Uncomment the following line to log available voices
  // voices.forEach(voice => console.log(voice.name + ' (' + voice.lang + ')'));
}

function speak(text) {
  var text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 2;
  text_speak.volume = 1;
  text_speak.pitch = 1; // Set the voice to Indian English if available

  var indianVoice = voices.find(function (voice) {
    return voice.name.includes('Indian');
  });

  if (indianVoice) {
    text_speak.voice = indianVoice;
  } else {
    // Fallback if Indian voice is not found
    text_speak.voice = voices[0]; // Use the first available voice
  }

  window.speechSynthesis.speak(text_speak);
}

function startRecognition() {
  isListening = true; // Set listening state

  content.textContent = "Listening....";
  status.textContent = "Tap to stop"; // Show tap to stop message

  recognition.start();
}

function stopRecognition() {
  isListening = false; // Reset listening state

  recognition.stop(); // Stop the speech recognition

  content.textContent = "Click here to speak"; // Reset content text

  status.textContent = ""; // Clear the status message
}

function wishMe() {
  var day = new Date();
  var hour = day.getHours();

  if (hour >= 0 && hour < 12) {
    speak("Good Morning Boss...");
  } else if (hour >= 12 && hour < 17) {
    speak("Good Afternoon Master...");
  } else {
    speak("Good Evening Sir...");
  }
}

window.addEventListener('load', function () {
  speak("Initializing Jarvis an Assistant crafted by Mustafa..");
  populateVoiceList(); // Populate voice list

  wishMe();
}); // Listen for voices to be loaded

window.speechSynthesis.onvoiceschanged = populateVoiceList;
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

recognition.onresult = function (event) {
  var currentIndex = event.resultIndex;
  var transcript = event.results[currentIndex][0].transcript;
  content.textContent = transcript;
  takeCommand(transcript.toLowerCase());
};

recognition.onend = function () {
  isListening = false; // Reset flag when recognition ends

  content.textContent = "Click here to speak"; // Reset content

  status.textContent = ""; // Clear status message
}; // Attach the click event to the entire input box


document.querySelector('.input').addEventListener('click', function () {
  if (isListening) {
    stopRecognition(); // Stop recognition if already listening
  } else {
    startRecognition(); // Start recognition if not listening
  }
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
  } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
    window.open("https://www.google.com/search?q=".concat(message.replace(" ", "+")), "_blank");
    var finalText = "This is what I found on the internet regarding " + message;
    speak(finalText);
  } else if (message.includes('wikipedia')) {
    window.open("https://en.wikipedia.org/wiki/".concat(message.replace("wikipedia", "")), "_blank");

    var _finalText = "This is what I found on Wikipedia regarding " + message;

    speak(_finalText);
  } else if (message.includes('time')) {
    var time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric"
    });
    var _finalText2 = time;
    speak(_finalText2);
  } else if (message.includes('date')) {
    var date = new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric"
    });
    var _finalText3 = date;
    speak(_finalText3);
  } else if (message.includes('calculator')) {
    window.open('Calculator://', "_self");
    var _finalText4 = "Opening Calculator";
    speak(_finalText4);
  } else {
    window.open("https://www.google.com/search?q=".concat(message.replace(" ", "+")), "_blank");

    var _finalText5 = "I found some information for " + message + " on Google";

    speak(_finalText5);
  }
}