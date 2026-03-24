let step = 0;
let answers = [];
let moodType = "";

/* FIRST QUESTION */
const firstQuestion = "🌿 Hi! On a scale of 1–10, how are you feeling today?";

/* FOLLOW-UP FLOWS */
const flows = {
happy: [
"That’s really nice to hear ✨ What’s been going well for you today?",
"Love that energy 😄 What’s something you want to keep consistent?",
"What made you feel this way?"
],

sad: [
"I’m really sorry you're feeling this way 💙 What’s been weighing on you?",
"That sounds heavy… do you feel like talking about it?",
"Have you been feeling like this for a while?"
],

anxious: [
"That must feel overwhelming 🌿 What’s been causing this anxiety?",
"Is it something specific or just everything piling up?",
"Let’s slow it down… what’s one thing bothering you the most?"
],

angry: [
"I get that… anger can be intense 🔥 What triggered this feeling?",
"Did something specific happen today?",
"Would you say it's frustration or something deeper?"
],

default: [
"I hear you 💛 Tell me more about what’s been going on.",
"What’s been on your mind lately?",
"Can you describe it a little more?"
]
};

/* START CHAT */
function startChat(){
    document.querySelector(".hero").style.display = "none";
    document.getElementById("chatSection").classList.remove("hidden");

    const chat = document.getElementById("chat");
    chat.innerHTML += `<div class="msg ai">${firstQuestion}</div>`;
}

/* DETECT MOOD */
function detectMood(text){
    text = text.toLowerCase();

    if(text.includes("happy") || text.includes("good") || text.includes("great")){
        return "happy";
    }
    if(text.includes("sad") || text.includes("low") || text.includes("cry")){
        return "sad";
    }
    if(text.includes("anxious") || text.includes("stress") || text.includes("overthink")){
        return "anxious";
    }
    if(text.includes("angry") || text.includes("mad") || text.includes("frustrated")){
        return "angry";
    }

    return "default";
}

/* COMFORT RESPONSES */
function getComfort(type){
    const comfortMap = {
        happy: "I’m really glad you're feeling this way 💛 Hold onto it.",
        sad: "I’m here with you 💙 You don’t have to go through it alone.",
        anxious: "Take a breath… you’re safe right now 🌿",
        angry: "Your feelings are valid 🔥 Let’s understand them better.",
        default: "I hear you 🌿 Let’s talk this through."
    };

    return comfortMap[type];
}

/* SEND MESSAGE */
function send(){
    const input = document.getElementById("input");
    const chat = document.getElementById("chat");
    const typing = document.getElementById("typing");

    const text = input.value;
    if(!text) return;

    chat.innerHTML += `<div class="msg user">${text}</div>`;
    input.value = "";

    /* FIRST MESSAGE → DETECT MOOD */
    if(step === 0){
        moodType = detectMood(text);
    }

    typing.innerText = "typing...";

    setTimeout(()=>{
        typing.innerText = "";

        let comfort = getComfort(moodType);

        let currentFlow = flows[moodType] || flows.default;
        let question = currentFlow[step] || "Thank you for sharing 💙";

        chat.innerHTML += `<div class="msg ai">
        ${comfort}<br><br>${question}
        </div>`;

        chat.scrollTop = chat.scrollHeight;

        if(step >= 3){
            setTimeout(showResult, 1500);
        }

        step++;

    },800);
}

/* ENTER KEY */
document.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        send();
    }
});

/* RESULT */
function showResult(){
    document.body.innerHTML = `
    <div class="result">
        <h1>Your Wellness Score</h1>
        <h2 id="score">0%</h2>

        <div class="bar" id="bar"></div>

        <p style="margin-top:20px">
        You're growing, even if it doesn't feel like it 💙
        </p>
    </div>
    `;

    let score = Math.floor(Math.random() * 30) + 65;

    let i = 0;
    let interval = setInterval(()=>{
        document.getElementById("score").innerText = i + "%";
        i++;
        if(i >= score){
            clearInterval(interval);
        }
    },20);

    setTimeout(()=>{
        document.getElementById("bar").style.width = score + "%";
    },500);
}