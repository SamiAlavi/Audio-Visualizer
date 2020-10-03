import { analyzeAndValidateNgModules, analyzeFileForInjectables } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {

  @Input() songToPlay  
  
  duration    //Audio Duration
  totalTime   //Audio Duration (formatted as string)
  currentTime //Audio Current Time
  time        //Audio Current Time (formatted as string)
  audiourl    //Audio Link
  audio       //Audio Element
  title       //Audio Title
  
  playing: boolean = false
  state: string = 'stopped'
  
  //elements
  audioElement
  canvas
  window
  
  //visualizer stuff
  data
  ctx
  audioCtx = new AudioContext();
  analyser = this.audioCtx.createAnalyser();
  hue = -1

  constructor() {}  

  ngOnInit(): void {
    this.audioElement = document.getElementById('audioPlayer') as HTMLMediaElement
    this.window = window
    this.analyser.fftSize = 4096;    
    
    window.addEventListener('resize', this.resizeCanvas, false);
    this.resizeCanvas();
  }

  ngOnChanges(): void {
    if (this.songToPlay!=null) {
      this.playSong(this.songToPlay)
    }
  }

  resizeCanvas(){
    this.canvas = document.getElementById('audio_visual') as HTMLCanvasElement
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight*0.71
    this.ctx = this.canvas.getContext("2d");    
  }  

  loopingFunction(self){
    self.analyser.getByteFrequencyData(self.data);
    self.draw(self.data);
    let sample = () => { self.loopingFunction(self); }
    requestAnimationFrame(sample);
  }
  
  audioAnalyser(){
    let source = this.audioCtx.createMediaElementSource(this.audioElement);
    source.connect(this.analyser);
    source.connect(this.audioCtx.destination);
    this.data = new Uint8Array(this.analyser.frequencyBinCount);
    
    this.analyser.getByteFrequencyData(this.data);
    this.draw(this.data);
    
    let sample = () => { this.loopingFunction(this); }    
    requestAnimationFrame(sample);
  }

  draw(data){    
    data = [...data];
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    if (true){this.rainbowEffect()}    
    let space = this.canvas.width / data.length;
    data.forEach((value,i)=>{
        this.ctx.beginPath();
        this.ctx.moveTo(space*i,this.canvas.height); //x,y
        this.ctx.lineTo(space*i,this.canvas.height-value); //x,y
        if (false){this.rainbowEffect();}        
        this.ctx.stroke();        
    })
  }

  rainbowEffect(){
    this.ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`
    this.hue++
    if (this.hue >= 360) { this.hue = 0 }
  }

  playSong(song){
    this.audiourl = 'http://127.0.0.1:8887/'+song.name
    this.title = song.name
    this.updatePlayState('playing')
    this.audioAnalyser()
  }

  getDuration(target){
    this.duration = target.duration
    this.totalTime = this.setTime(this.duration)
  }

  getCurrentTime(target){
    this.currentTime = target.currentTime
    this.time = this.setTime(this.currentTime)
  }

  setTime(seconds){
    let mins:any = Math.floor(seconds/60)
    let secs:any = Math.floor(seconds%60)
    if (mins<10) {mins='0'+mins}
    if (secs<10) {secs='0'+secs}
    if (this.currentTime==this.duration) {
      this.updatePlayState('ended')
    }
    return mins+':'+secs
  }

  onSeek(value){
    this.audio.currentTime = value
  }

  setAudio(audioElement){
    this.audio = audioElement    
  }

  updatePlayState(state){
    if (this.audiourl!=null){
      this.state = state
      if (state=='playing'){
        this.playing = true
        if (this.audio!=null) this.audio.play()
      }
      else if (state=='paused'){
        this.playing = false
        if (this.audio!=null) this.audio.pause()      
      }
      else if (state=='stopped'){
        this.onSeek(0)
        this.updatePlayState('paused')
      }
      else if (state=='ended'){
        this.playing = false
      }
    }    
  }
}
