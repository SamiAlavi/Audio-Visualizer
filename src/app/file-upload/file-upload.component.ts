import { summaryFileName } from '@angular/compiler/src/aot/util';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  constructor() { }
  
  @Output() sendFiles: EventEmitter<any> = new EventEmitter<any>();

  audiourl
  filesToUpload = []
  currentPlaying:any = {}

  ngOnInit(): void {
  }

  triggerClick(fileInput:HTMLInputElement){
    fileInput.click()
  }

  handleUpload(e){
    if (e.length!=0){
      this.filesToUpload = []
      for (var i = 0; i < e.length; i++) {
        this.filesToUpload.push(e[i])
      }
      this.sendFiles.emit(this.filesToUpload)
    }
  }

}
