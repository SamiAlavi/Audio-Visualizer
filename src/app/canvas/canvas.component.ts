import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  
  @Input() songToPlay
  @Input() settings

  //elements
  audioElement
  canvas
  window
  
  //visualizer stuff
  source
  data
  ctx
  audioCtx
  analyser
  hue = 0

  constructor() { }

  ngOnInit(): void {
    this.audioElement = document.getElementById('audioPlayer') as HTMLMediaElement
    this.window = window    
    this.window.addEventListener('resize', this.resizeCanvas, false);
    this.resizeCanvas();

    this.audioCtx = new AudioContext()
    this.analyser = this.audioCtx.createAnalyser()
    this.analyser.fftSize = 4096;    

    this.source = this.audioCtx.createMediaElementSource(this.audioElement);
    this.source.connect(this.analyser);
    this.source.connect(this.audioCtx.destination);
  }

  ngOnChanges(): void {
    if (this.songToPlay!=null) {
      this.audioAnalyser()
    }
  }

  resizeCanvas(){
    this.canvas = document.getElementById('audio_visual') as HTMLCanvasElement
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight*0.71
    this.ctx = this.canvas.getContext("2d");    
  }  
  
  audioAnalyser(){
    this.data = new Uint8Array(this.analyser.frequencyBinCount);
    
    this.analyser.getByteFrequencyData(this.data);
    this.draw(this.data);
    
    let sample = () => { this.loopingFunction(this); }    
    requestAnimationFrame(sample);
  }

  loopingFunction(self){
    let sample = () => { self.loopingFunction(self); }
    requestAnimationFrame(sample);
    self.analyser.getByteFrequencyData(self.data);
    self.draw(self.data);
  }

  draw(data){    
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    if (this.settings.effect=='rainbow1'){this.rainbowEffect()}    
    let space = this.canvas.width / data.length;
    data.forEach((value,i)=>{
        this.ctx.beginPath();
        this.ctx.moveTo(space*i,this.canvas.height); //x,y
        this.ctx.lineTo(space*i,this.canvas.height-value); //x,y
        if (this.settings.effect=='rainbow2'){this.rainbowEffect();}        
        this.ctx.stroke();        
    })
  }

  rainbowEffect(){
    this.ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`
    this.hue++
    if (this.hue >= 360) { this.hue = 0 }
  }

}
