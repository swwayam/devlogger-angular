import { Component, OnInit } from '@angular/core';
import { log } from 'src/app/models/log.models';
import { LogDataService } from 'src/app/services/log-data.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logsData ?: log[]
  selectedLog !: log
  isLog !: boolean

  constructor(private logService: LogDataService){}

  ngOnInit(): void {
    this.logService.stateClear.subscribe(clear => {
      if(clear){
        this.selectedLog = {id: "", date: "", log: ""}
      }
    })

    this.logService.getData().subscribe(logs => {
      this.logsData = logs
    })
  }

 

  removeLog(id : string){
    if(confirm("Are you sure")){
      this.logService.deleteLog(id)
    }  
    
      
  }

  onSelect(log : log){
    this.logService.setFormLog(log)
    this.selectedLog = log
  }


  
}
