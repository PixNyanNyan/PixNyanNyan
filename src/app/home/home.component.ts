import { Component, OnInit } from '@angular/core';
import { Broadcaster } from 'ng2-cable/js/index';

import { AppService, IPost } from '../appService';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    threads: IPost[];

    constructor(
        private broadcaster: Broadcaster,
        private appService: AppService
    ) {
        this.broadcaster
            .on<any>('create')
            .map<IPost>(message => JSON.parse(message.obj))
            .filter(post => !post.parentPostId)
            .subscribe(post => {
                if (this.threads) {
                    this.threads.unshift(post);
                }
            });
    }

    ngOnInit() {
        this.appService
            .getThreads()
            .subscribe(res => {
                this.threads = res;
            });
    }
}
