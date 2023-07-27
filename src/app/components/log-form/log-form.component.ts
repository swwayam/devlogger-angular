import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { LogDataService } from 'src/app/services/log-data.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent {
  logText = ""


  constructor(private logService: LogDataService){}

  onSubmit(){
    this.logService.addLogs(this.logText)
    this.logText = ""
  }

  clear(){
    this.logText = ""
  }
}
