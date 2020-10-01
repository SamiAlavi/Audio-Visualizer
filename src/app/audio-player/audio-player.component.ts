import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {

  @Input() songToPlay

  constructor() { }  

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.songToPlay!=null) {
      this.playSong(this.songToPlay)
    }
  }

  duration    //Audio Duration
  totalTime   //Audio Duration (formatted as string)
  currentTime //Audio Current Time
  time        //Audio Current Time (formatted as string)
  audiourl    //Audio Link
  audio       //Audio Element
  title       //Audio Title
  
  playing: boolean = false
  state: string = 'stopped'
  
  playSong(song){
    this.audiourl = 'http://127.0.0.1:8887/'+song.name
    this.title = song.name
    this.updatePlayState('playing')
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
