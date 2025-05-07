import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WsServiceService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = new WebSocketSubject('https://ws.quikcashier.com/ws');
  }

  onMessage() {
    return this.socket$.asObservable();
  }

  sendMessage(msg: any): void {
    this.socket$.next(msg);
  }
}
