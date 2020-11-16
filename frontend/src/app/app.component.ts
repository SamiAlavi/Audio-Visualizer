import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SettingsComponent } from './settings/settings.component';
import { Observable } from 'rxjs';

import { UploadFileService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  files
  length
  songToPlay
  index
  opened: boolean = false
  settings = {effect: 'rainbow1',
              autoplay: true}
  title = 'Audio Visualizer';

  myObserver = {
    next: x => {
      this.files = x;
      console.log(x)
    },
    error: err => console.error('Observer got an error: ' + err)
  };

  constructor(private bottomSheet: MatBottomSheet, private uploadService: UploadFileService) {}

  ngOnInit(): void {
    this.uploadService.getFiles().subscribe(this.myObserver)
  }

  getFiless(files){
    // console.log(files)
    // this.files = files
    // this.length = files.length
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
    const bottomSheetRef = this.bottomSheet.open(SettingsComponent, {data:this.settings})
    bottomSheetRef.afterDismissed().subscribe((data) => {
      if (data!=null){
        this.settings = data
        console.log('Received to Parent',data)
      }
    });
  }
}
