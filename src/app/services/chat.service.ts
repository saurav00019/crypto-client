import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private socket: any = Socket;

    constructor() {
        // Explicitly set WebSocket transport
        this.socket = io('http://192.168.1.14:3000', { transports: ['websocket'], withCredentials: true });
    }

    sendMessage(message: string): void {
        this.socket.emit('message', message);
    }

    getMessage(): Observable<string> {
        return new Observable<string>((observer) => {
            this.socket.on('message', (data: string) => {
                observer.next(data);
            });
        });
    }
    }