import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'visualizer';

  duration
  currentTime
  time
  totalTime

  getDetails(event){
    this.duration = event.duration
    this.totalTime = this.setTime(this.duration)
  }

  setCurrentTime(event){
    this.currentTime = event
    this.time = this.setTime(this.currentTime)
  }

  setTime(seconds){
    let mins:any = Math.floor(seconds/60)
    let secs:any = Math.floor(seconds%60)
    if (mins<10){mins='0'+mins}
    if (secs<10){secs='0'+secs}
    return mins+':'+secs
  }
  
}
