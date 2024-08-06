import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  activeSection: string = 'profile';
  constructor() { }

  ngOnInit() {
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }

}
