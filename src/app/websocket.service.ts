import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket(`${environment.websocket}/ws/notifications/`);
  }

  public send(data: any) {
    this.socket.send(JSON.stringify(data));
  }

  public onNotification(callback: (notification: any) => void) {
    this.socket.addEventListener('open', () => {
      this.socket.send(JSON.stringify({ type: 'subscribe' }));
    });

    this.socket.addEventListener('message', (event) => {
      callback(event);
    });
  }
}
