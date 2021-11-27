const user_input = document.querySelector(".user_input");
const btn = document.querySelector(".user_btn");

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;

const apps = ["youtube","facebook","instagram","twitter"];

btn.addEventListener("click",()=>{
    recognition.start()
})

recognition.addEventListener("result",e => {
    const text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
    console.log(text)
    if(text.toLowerCase().includes("open")){
        for(var i = 0;i < apps.length;i++){
            if(text.toLowerCase().includes(apps[i])){
                window.open(`https://www.${apps[i]}.com`);
            }
        }
    };

})

recognition.start()
