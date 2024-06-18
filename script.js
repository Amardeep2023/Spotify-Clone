console.log("Amardeep")
let Currentsong = new Audio();
let songs;
let currfolder;

async function getSongs(folder)
{
    currfolder=folder;
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`)
    let response= await a.text()
    console.log(response)
    let div=document.createElement("div")
    div.innerHTML=response;
    let as=div.getElementsByTagName("a")
     songs=[]
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split(`/${folder}/`)[1])
        }
        
    }

    let songul=document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songul.innerHTML=""
    for (const song of songs) {
        songul.innerHTML=songul.innerHTML + `<li> 
        <img class="invert" src="music.svg" alt="">
       <div class="info">
        <div>${song.replaceAll("%20" , " ")}</div>
        </div 
        <div class="musicbut"><img class="invert" src="playmusic.svg" alt=""></div>
        
        
       
        
        
        </li>`;
    }

   let audio=new Audio(songs[0])
   //audio.play()

   Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click",element=>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

    })

   })
    return songs

}
function convertSecondsToTimeFormat(seconds) {
    // Calculate the minutes
    const minutes = Math.floor(seconds / 60);
    // Calculate the remaining seconds
    const remainingSeconds = Math.floor(seconds % 60);
    // Format the seconds to ensure two digits
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    // Return the formatted string
    return `${minutes}:${formattedSeconds}`;
}

// Example usage:
const timeInSeconds = 72;
const formattedTime = convertSecondsToTimeFormat(timeInSeconds);
console.log(formattedTime); // Output: "1:12"



const playMusic=(track,pause=false)=>{
    //let audio=new Audio("/Songs/" + track)
   // audio.play()
   Currentsong.src = `/${currfolder}/` + track;
   if(!pause){
    Currentsong.play();
    play.src="pause.svg"

   }
  
   document.querySelector(".songinfo").innerHTML=decodeURI(track)
   document.querySelector(".songtime").innerHTML="00/00"

}



 //load songs when card clicked
 Array.from(document.getElementsByClassName("cardcontainer")).forEach(e=>{
    e.addEventListener("click",async item=>{
        songs = await getSongs(`Songs/${item.currentTarget.dataset.folder}`)
        
    
    })
   })



async function main(){

    

    let songs =await getSongs("Songs/ncs")
    console.log(songs)
    playMusic(songs[0],true)

    



   

   //attach play pause button

   play.addEventListener("click",()=>{
    if(Currentsong.paused)
        {
            Currentsong.play()
            play.src="pause.svg"
        }
    else
    {
        Currentsong.pause()
        play.src="playbut.svg"
    }
   })

   //time updation
   Currentsong.addEventListener("timeupdate",()=>{

    console.log(Currentsong.currentTime,Currentsong.duration)
    document.querySelector(".songtime").innerHTML=`${convertSecondsToTimeFormat(Currentsong.
    currentTime)}/${convertSecondsToTimeFormat(Currentsong.duration)}`
    document.querySelector(".seekcircle").style.left=(Currentsong.currentTime/Currentsong.
    duration)*100 + "%";

    
   })
   // seekbar eventlistener

   document.querySelector(".seekbar").addEventListener("click",e=>{
    let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
    document.querySelector(".seekcircle").style.left=percent + "%";
    Currentsong.currentTime=((Currentsong.duration)*percent)/100
    
   })

   //hamburger
   document.querySelector(".hamburger").addEventListener("click",()=>{

    document.querySelector(".left").style.left="0"
   })

   document.querySelector(".cross").addEventListener("click",()=>{
    document.querySelector(".left").style.left="-100%"
   })
   document.querySelector(".Spotifycards").addEventListener("click",()=>{
    document.querySelector(".left").style.left="0"
   })

   //prev button
   prev.addEventListener("click",()=>{
    console.log("clicked")
    let index=songs.indexOf(Currentsong.src.split("/").slice(-1)[0])
    if((index-1)>=0)
        {
            playMusic(songs[index-1])
        }
   })


   //next button
   forw.addEventListener("click",()=>{

    console.log("forw click")
    console.log("song")
    
    let index=songs.indexOf(Currentsong.src.split("/").slice(-1)[0])
    if((index+1)<songs.length){
        playMusic(songs[index+1])
    }
   })

   //vol button
   document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
    console.log(e.target,e.target.value,"/100")
    Currentsong.volume= (e.target.value)/100
   })

  
  
}
main()