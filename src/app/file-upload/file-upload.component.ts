import { summaryFileName } from '@angular/compiler/src/aot/util';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  constructor() { }
  
  @Output() sendDetails: EventEmitter<any> = new EventEmitter<any>();
  @Output() currentTime: EventEmitter<any> = new EventEmitter<any>();

  audiourl
  filesToUpload = []
  currentPlaying:any = {}

  ngOnInit(): void {
  }

  handleUpload(e){
    this.filesToUpload = []
    for (var i = 0; i < e.length; i++) {
      this.filesToUpload.push(e[i])
    }
  }

  playAudio(file){
    this.audiourl = "http://127.0.0.1:8887/"+file.name;
    this.currentPlaying.url = this.audiourl
  }

  getDuration(event){
    this.currentPlaying.duration = event.target.duration
    this.sendDetails.emit(this.currentPlaying)
    console.log(this.currentPlaying)
  }

  getCurrentTime(event){
    this.currentTime.emit(event.target.currentTime)
  }

}
