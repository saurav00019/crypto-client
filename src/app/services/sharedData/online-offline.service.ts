import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OnlineOfflineService {
  onlineStatusChanged: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.initializeOnlineOfflineEvents();
  }

  private initializeOnlineOfflineEvents() {
    window.addEventListener('online', () => this.handleNetworkChange());
    window.addEventListener('offline', () => this.handleNetworkChange());
  }

  private handleNetworkChange() {
    this.onlineStatusChanged.next(navigator.onLine);
  }

  isOnline(): boolean {
    return navigator.onLine;
  }
}