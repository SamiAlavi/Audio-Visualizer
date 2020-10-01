import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadComponent } from './file-upload/file-upload.component'

import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from '@angular/material/list'
import { MatSliderModule } from '@angular/material/slider'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AudioPlayerComponent } from './audio-player/audio-player.component'

const matmodules = [
  MatButtonModule,
  MatListModule,
  MatSliderModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatSidenavModule
]
@NgModule({
  declarations: [	
    AppComponent,
    FileUploadComponent,
    AudioPlayerComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    matmodules
//    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
