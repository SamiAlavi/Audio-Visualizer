import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheet) {}

  effect: string = 'rainbow1'
  checked: boolean = true

  ngOnInit(): void {
  }

  closeBottomSheet(){
    this.bottomSheet.dismiss(
      {effect: this.effect});
  }

  onChange(checked){
    this.checked = checked
  }

}
