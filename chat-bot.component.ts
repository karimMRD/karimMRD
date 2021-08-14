import { Component, OnInit, AfterViewInit, ElementRef, QueryList, ViewChild, ViewChildren, AfterViewChecked, EventEmitter, Output } from '@angular/core';
import KTLayoutScrolltop from '../../../../../../assets/js/layout/extended/scrolltop';
import { KTUtil } from '../../../../../../assets/js/components/util';
import { Router } from '@angular/router';
import { Message, RestService } from './rest.service';
import { Observable } from 'rxjs/Observable';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
})
export class ChatBotComponent implements OnInit, AfterViewInit,AfterViewChecked  {
 user: any;
  public message: Message;
  public messages: Message[];


  // Code for Scrolling
  @ViewChild('chatlist', { read: ElementRef }) chatList: ElementRef;
  @ViewChildren(ChatBotComponent, { read: ElementRef }) chatItems: QueryList<ChatBotComponent>;

// public show = false;
// public show1 = false;


// clk()
// {
//   this.show  = true;
// }

// clkclose()
// {
//   this.show  = false;
// }

  //////////////////////////

  // messages : Observable<Message[]>;
  formValue : string = '';

  messageUser : string = '';

  visible = false;
  visible1 = false;

  @Output() open = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();

  toggle() {
    this.visible = !this.visible;
    if (this.visible) {
      this.open.emit(null);
    } else {
      this.close.emit(null);
    }
  }
  ///////////////////////// 

  constructor( private chatService : RestService, ) 
  {

    this.message = new Message('', 'assets/images/user.png', new Date());
  	this.messages = [
  	new Message('Welcome to chatbot universe', 'assets/images/bot.png', new Date()) ];

  }

  sendMessage()
  {
    this.messages.push(this.message);

    if (this.formValue === '') {
      console.log('not send');
    }
    else
    {
      this.chatService.getResponse(this.message["content"]).subscribe(res => {
        console.log(res);
        this.messages.push(
          new Message(res.result.fulfillment.speech, 'assets/images/bot.png' ,res.timestamp)
        );
        this.scrollToBottom();
      });
      this.message = new Message('', 'assets/images/user.png', new Date);

      /////////////////////////////////
      // this.scrollToBottom();
      // this.visible1 = true;
      // this.messageUser = 'msguser'
      // setTimeout(()=>{
      //   this.visible1 = false;
      // }, 5000);

    }

  }

  
  private scrollToBottom(): void 
  {
    try {
      this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.scrollHeight;
    } 
    catch(err) { }      
  }
  
  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  ngOnInit() 
  {

 

  }

  ngAfterViewInit() {
    KTUtil.ready(() => {
      // Init Scrolltop
      KTLayoutScrolltop.init('kt_scrolltop');
    });
  }

}
