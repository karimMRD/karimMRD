import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient'
import { map } from 'rxjs/operators';
import { Http , Headers } from '@angular/http';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

////////////////////////
export class Message
{
  
  content: string;
  timestamp: Date;
  avatar: string;

  constructor(content: string, avatar: string, timestamp: Date){
    this.content = content;
    this.timestamp = timestamp;
    this.avatar = avatar;
  }

}

// const entityTypesClient = new dialogflow.EntityTypesClient({'keyFilename' : 'C:\Users\KM\Desktop\PortailDemoNew\PortailDemoNew 11-07-2021\src\serviceDialogFlowJSON\mourdi-c7a6d-96ae17d0c965.json'})
// const intentsClient = new dialogflow.IntentsClient({'keyFilename' : 'C:\Users\KM\Desktop\PortailDemoNew\PortailDemoNew 11-07-2021\src\serviceDialogFlowJSON\mourdi-c7a6d-96ae17d0c965.json'})

@Injectable({
  providedIn: 'root'
})
export class RestService {


  private baseURL = 'https://api.api.ai/api/query?v=20150910';
  private token = '9daf42d0075640e99bbed15c446e845d';



  constructor( private http: Http ) { }


  playAudio()
  {
    let sound = new Audio();
    sound.src = './assets/media/to-the-point-568.ogg';
    sound.load();
    sound.play();
  }

 


  public getResponse(query: string){
    let data = {
      query:query,
      lang: 'en',
      sessionId: '1234567'
    };
    
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);

    return this.http
      .post(`${this.baseURL}`, data, {headers: headers})
      .pipe(
        map(res => {
          return res.json()
        })
      )

  }




}
