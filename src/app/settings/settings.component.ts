import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) private data: any, private bottomSheet: MatBottomSheetRef<SettingsComponent>) {}

  effect: string
  autoplay: boolean

  ngOnInit(): void {
    console.log('Received to Settings Comp',this.data)
    this.effect = this.data.effect
    this.autoplay = this.data.autoplay
  }

  closeBottomSheet(){
    this.bottomSheet.dismiss(
      {effect: this.effect,
       autoplay: this.autoplay});
  }

  onChange(value){
    this.autoplay = value
  }

}
