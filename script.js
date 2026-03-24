let step = 0;

const flow = [
"🌿 Hi! On a scale of 1-10, how are you feeling today?",
"I hear you. What made today feel that way?",
"How many hours of sleep did you get last night?",
"What’s been stressing you the most lately?",
"Do you feel supported by someone in your life?",
"What’s one thing you want to improve right now?"
];

function send(){
    const input = document.getElementById("input");
    const chat = document.getElementById("chat");
    const typing = document.getElementById("typing");

    const text = input.value;
    if(!text) return;

    chat.innerHTML += `<div class="msg user">${text}</div>`;
    input.value = "";

    typing.innerText = "AI is thinking...";

    setTimeout(()=>{
        let reply = flow[step] || "Thank you for sharing 💙";
        step++;

        chat.innerHTML += `<div class="msg ai">${reply}</div>`;
        chat.scrollTop = chat.scrollHeight;
    },800);
}

// QUIZ (basic starter)
function startQuiz(){
    alert("Quiz feature coming next 😏🔥");
}

// LOAD SAVED CHAT
window.onload = ()=>{
    const saved = localStorage.getItem("chat");
    if(saved){
        document.getElementById("chat").innerHTML = saved;
    }
};