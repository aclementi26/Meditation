//functions 
let app = ()=>{
let song = document.querySelector(".song");
let play = document.querySelector(".play");
let outline= document.querySelector(".moving-outline circle");
let video= document.querySelector(".vid-container video");
let backgrounds = document.querySelectorAll(".background-picker button")

//Time Display
let timeDisplay= document.querySelector(".time-display");
let timeSelect= document.querySelectorAll(".time-select button");

//Outline 
let outlineLength= outline.getTotalLength();

//Duration
let duration = 600;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

// Pick Different Backgrounds
backgrounds.forEach(background => {
  background.addEventListener("click", function() {
    video.src = this.getAttribute("data-video")
    video.src = this.getAttribute("data-video");
    checkPlaying(background);
  });
});

//play clock 
play.addEventListener("click",()=>{
checkPlaying(song);
})

// Select time 
timeSelect.forEach(option =>{
    option.addEventListener("click", function(){
        duration = this.getAttribute("data-time")
        timeDisplay.textContent = `${Math.floor(duration/ 60)} : ${Math.floor(duration % 60)}`;
    })
})



// create button to stop and play 
 const checkPlaying = song => {
  if (song.paused) {
    song.play();
    video.play();
    play.src = "./img/pause.svg";
  } else {
    song.pause();
    video.pause();
    play.src = "./img/play.svg";
  }
 }
 //animate circle
 song.ontimeupdate = () =>{
 let currentTime = song.currentTime;
 let elasped = duration - currentTime;
 let seconds = Math.floor(elasped % 60);
 let minutes = Math.floor(elasped / 60);

 let progress = outlineLength - (currentTime / duration) * outlineLength;

 outline.style.strokeDashoffset = progress;

//animate text
timeDisplay.textContent = `${minutes}: ${seconds}`

if(currentTime >=duration){
    song.pause();
    song.currentTime = 0;
    play.src="./img/play.svg"
    video.pause();
}

 }


}
app();