import { Component, OnInit, inject } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  websocketService: WebsocketService = inject(WebsocketService);
  toastrService: ToastrService = inject(ToastrService);

  ngOnInit(): void {
    this.websocketService.onNotification((notification) => {
      this.showNotification(notification.data);
    });
  }

  showNotification(message: string) {
    this.toastrService.info(message);
  }
}
