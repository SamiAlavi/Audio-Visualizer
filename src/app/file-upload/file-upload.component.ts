import { summaryFileName } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  constructor() { }

  filesToUpload = []
  audio = new Audio()

  ngOnInit(): void {
  }

  handleUpload(e){
    this.filesToUpload = []
    for (var i = 0; i < e.length; i++) {
      this.filesToUpload.push(e[i])
    }
  }

  playAudio(file, index){
    this.audio.pause();
    this.audio.src = "http://127.0.0.1:8887/"+file.name;
    this.audio.load();
    this.audio.play();
    console.log(this.audio)
  }

}
