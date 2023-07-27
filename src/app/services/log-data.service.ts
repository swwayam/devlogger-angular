import { Injectable } from '@angular/core';
import { log } from '../models/log.models';
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class LogDataService {
  logs : log[] = []
  constructor() { }
  

  addLogs(log : string){
    const date = new Date().toString()
    
    
    this.logs.push({id: uuidv4(), log, date})
    console.log(this.logs);
  }

  getData(){
    return this.logs
  }

  deleteLog(id : string){
    this.logs = this.logs.filter(el => el.id != id )
  }
}
