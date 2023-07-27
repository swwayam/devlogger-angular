import { Component, OnInit } from '@angular/core';
import { config } from 'rxjs';
import { log } from 'src/app/models/log.models';
import { LogDataService } from 'src/app/services/log-data.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logsData ?: log[] 
  constructor(private logService: LogDataService){}

  updateData(){
    this.logsData = this.logService.getData()
  }

  removeLog(id : string){
   
      this.logService.deleteLog(id)
      this.updateData()
   
  }

  ngOnInit(): void {
      this.updateData()
  }
}
