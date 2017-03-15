import { Component, Input, OnInit } from '@angular/core';

import { Post } from '../appService';

@Component({
  selector: 'thread-post',
  templateUrl: './thread-post.component.html',
  styleUrls: ['./thread-post.component.css']
})
export class ThreadPostComponent implements OnInit {

  @Input()
  thread: Post;

  @Input()
  replyMode: boolean;

  constructor() { }

  ngOnInit() {
  }

}
