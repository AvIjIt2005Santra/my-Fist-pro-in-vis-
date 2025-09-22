let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")


function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="hi-GB"
    window.speechSynthesis.speak(text_speak)
}
function wishMe(){
    let day=new Date()
    let hours=day.getHours()
    if (hours>=0 && hours<12){
speak("Good Morning Ma'am")
    }
    else if(hours>=12 &&hours<16){
        speak("Good afternoon Ma'am")
    }
    else{
        speak("Good Evening Ma'am")
    }
}
window.addEventListener('load',()=>{
    wishMe()
})
let SpeechRecognition =window.SpeechRecognition ||window.webkitSpeechRecognition
let recognition= new SpeechRecognition()
recognition.onresult=(event)=>{
   let currentIndex= event.resultIndex
   let transcript= event.results[currentIndex][0].transcript
content.innerText=transcript
takeCommand(transcript.toLowerCase())
}
btn.addEventListener("click",()=>{
recognition.start()
btn.style.display="none"
voice.style.display="block"

})
function takeCommand(message){
    btn.style.display="flex"
    voice.style.display="none"
    if (message.includes("hello") ||message.includes("hi")){
        speak(" Hallo dolon  Ma'am what can i help you")
    }
    else if(message.includes("introduce yourself")){   
        speak("my name is robot i can help you in your work and i was created by mister avijit sir")
    }
    else if(message.includes("who are you")){   
        speak("i am your  personal assistant and i was created by mister avijit sir")
    }
    else if(message.includes("introduce myself")){   
        speak(" yes Ma'am Your name is Dolon Ghanta. You were born on 23 January 2007. Your father's name is Mithu Ghanta, and your mother's name is Pratima Ghanta. You live in the village of Dehati, under the post office of Duria and the police station of Sabang, in the district of Paschim Medinipur, West Bengal. Currently, you are studying Nutrition Honours at Midnapore Day College.")
    }
    else if(message.includes("introduce my family?")){   
        speak("yes Ma'am i know your family your name is dolon ghanta your father name is mithu ghanta and your mather name is Pratima ghanta your village name is dehati post office name is duria police station name is sabang district name is pachim madinipur state name is west bengal ")
    }
    else if(message.includes("give me avijit home address")){   
        speak("avijit sir lives in kapasda village of police station name is sabang and district name pachim madinipur of west bengal")
    }
    else if(message.includes("open whatsapp")){   
        speak("opening whatsapp chating message")
        window.open("https://web.whatsapp.com/","_blank")
    }
    else if(message.includes("open youtube")){
        speak("i opened the youtube")
        window.open("https://www.youtube.com")
    }
    else if(message.includes("open google")){
        speak("i opened the google ")
        window.open("https://google.com/","_blank")
    }
    else if(message.includes("open facebook")){
        speak("i opened the Facebook ")
        window.open("https://facebook.com/","_blank")
    }
    else{
        speak(`this is what i found on internet regarding${message.replace("avijit","") || message.replace("abhijit","")}`)
        window.open(`https://www.google.com/search?q=${message.replace("avijit","") || message.replace("abhijit","")}`)
    }
}
