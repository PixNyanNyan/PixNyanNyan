import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, filter } from 'rxjs/operators';
import { Broadcaster } from '../broadcaster.service';

import { AppService, IPost } from '../appService';
import { ThreadPostComponent } from '../thread-post/thread-post.component';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, ThreadPostComponent, PostFormComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    threads: IPost[] = [];

    constructor(
        private broadcaster: Broadcaster,
        private appService: AppService
    ) {
        this.broadcaster
            .on<any>('create')
            .pipe(
                map<any, IPost>(message => JSON.parse(message.obj)),
                filter(post => !post.parentPostId)
            )
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
