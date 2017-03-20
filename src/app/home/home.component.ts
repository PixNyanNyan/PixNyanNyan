import { Component, OnInit } from '@angular/core';

import { AppService, Post } from '../appService';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    threads: Post[];

    constructor(private appService: AppService) {
    }

    ngOnInit() {
        this.appService
            .getThreads()
            .subscribe(res => {
                this.threads = res;
            });
    }
}
