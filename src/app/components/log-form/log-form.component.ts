import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { LogDataService } from 'src/app/services/log-data.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css'],
})
export class LogFormComponent implements OnInit {
  logText: string = '';
  id!: string;
  date!: string;
  isNew: boolean = true;

  constructor(private logService: LogDataService) {}

  onSubmit() {
    if (this.isNew === true) {
      this.logService.addLogs({
        id: uuidv4(),
        log: this.logText,
        date: this.logService.getDate(),
      });
    } else {
      this.logService.updateLog(this.id, this.logText);
      this.isNew = true;
    }
    this.clear();
  }

  clear() {
    this.logText = '';
    this.id = '';
    this.date = '';
    this.isNew = true;
    this.logService.clearState();
  }

  ngOnInit(): void {
    this.logService.selectedLog.subscribe((log) => {
      if (log.id != '') {
        this.id = log.id;
        this.logText = log.log;
        this.date = log.date;
        this.isNew = false;
      }
    });
  }
}
