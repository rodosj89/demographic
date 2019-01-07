import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class DemographicService {
  private socket: SocketIOClient.Socket;

  constructor(
    private _http: Http
    ) {
    this.socket = io('http://138.197.222.233');
  }

  onNewDemographic() {
    return Observable.create(observer => {
      this.socket.on('newDemographic', demographic => {
        observer.next(demographic);
      });
    });
  }
}