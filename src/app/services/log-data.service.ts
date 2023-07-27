import { Injectable } from '@angular/core';
import { log } from '../models/log.models';
import { BehaviorSubject, Observable, bufferWhen, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogDataService {
  logs: log[] = [];

  private logSource = new BehaviorSubject<log>({ id: '', log: '', date: '' });

  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {}

  getDate(): string {
    return new Date().toString();
  }

  saveToLocal(){
    localStorage.setItem("logs", JSON.stringify(this.logs))
  }

  addLogs(log: log) {
    this.logs.push(log);
    this.saveToLocal()
  }

  getData(): Observable<log[]> {
    if(localStorage.getItem("logs") === null){
      this.logs = []
    }else{
      this.logs = JSON.parse(localStorage.getItem("logs") ?? "")
    }

    return of(this.logs.sort((a : any,b : any) => {
      return b.date = a.date
    }))
  }

  deleteLog(id: string) {
    this.logs.forEach((cur, index) => {
      if(id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.saveToLocal()
  }

  setFormLog(log: log) {
    this.logSource.next(log);
  }

  updateLog(id: string, log: string) {
    this.logs = this.logs.map((el) => {
      if (el.id === id) {
        el.log = log;
        el.date = this.getDate();
        el.isUpdated = true;
      }
      return el;
    });

    this.saveToLocal()
  }

  clearState() {
    this.stateSource.next(true);
  }
}
