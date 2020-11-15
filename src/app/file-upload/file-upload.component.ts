import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UploadFileService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  audiourl
  filesToUpload: FileList;
  currentPlaying:any = {}

  fileInfos: Observable<any>;
  progress = 0
  message =''
  currentFile;

  constructor(private uploadService: UploadFileService) { }

  @Output() sendFiles: EventEmitter<any> = new EventEmitter<any>();


  ngOnInit(): void {
  }

  triggerClick(fileInput:HTMLInputElement){
    fileInput.click()
  }

  handleUpload(e){
    if (e.length!=0){
      this.progress = 0
      this.filesToUpload = e;
      for (var i = 0; i < e.length; i++) {
        this.currentFile = this.filesToUpload.item(i)
        this.uploadService.upload(this.currentFile).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          err => {
            this.progress = 0;
            this.message = 'Could not upload the file!';
            this.currentFile = undefined;
          });
      }
      this.sendFiles.emit(this.fileInfos)
    }
  }

}
