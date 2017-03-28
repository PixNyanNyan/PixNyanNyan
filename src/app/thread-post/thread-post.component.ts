import { Component, Input, OnInit } from '@angular/core';

import { IPost } from '../appService';
import { ConfigService } from '../configService';

@Component({
  selector: 'thread-post',
  templateUrl: './thread-post.component.html',
  styleUrls: ['./thread-post.component.css']
})
export class ThreadPostComponent implements OnInit {

    @Input()
    thread = <IPost>null;

    @Input()
    replyMode: boolean = false;

    defaultMessage: {
        title: string,
        author: string,
        message: string
    };

    constructor(
        private config: ConfigService
    ) {
        this.defaultMessage = config.get('defaultMessage');
    }

    ngOnInit() {
    }

}
