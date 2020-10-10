import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private bottomSheet: MatBottomSheet) {}

  title = 'Audio Visualizer';
  
  files
  length
  songToPlay
  index
  opened: boolean = false
  settings = {effect: 'rainbow1'}
  
  getFiles(files){
    this.files = files
    this.length = files.length
    this.toggle()
  }

  playAudio(file, i){
    this.songToPlay = file
    this.index = i
    this.toggle()
  }

  toggle(){
    if (this.files!=null){
      if (this.opened) { this.opened = false }
      else { this.opened = true }
    }
  }

  openBottomSheet(){
    const bottomSheetRef = this.bottomSheet.open(SettingsComponent)
    bottomSheetRef.afterDismissed().subscribe((data) => {
      if (data!=null){
        this.settings = data
        console.log(data)
      }
    });
  }
}
