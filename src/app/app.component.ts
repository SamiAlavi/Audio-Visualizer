import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Audio Visualizer';
  
  files
  length
  songToPlay
  opened: boolean = false
  
  getFiles(files){
    this.files = files
    this.length = files.length
    this.toggle()
  }

  playAudio(file){
    this.songToPlay = file
    this.toggle()
  }

  toggle(){
    if (this.files!=null){
      if (this.opened) { this.opened = false }
      else { this.opened = true }
    }
  }
}
