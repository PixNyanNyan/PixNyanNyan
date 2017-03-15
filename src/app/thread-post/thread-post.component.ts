import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'thread-post',
  templateUrl: './thread-post.component.html',
  styleUrls: ['./thread-post.component.css']
})
export class ThreadPostComponent implements OnInit {

  @Input()
  thread: any;

  constructor() { }

  ngOnInit() {
  }

}
