import { Component } from '@angular/core';

import { Ng2Cable } from 'ng2-cable/js/index';

import { Config } from './config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title: string = 'NyanNyan';

    constructor(
        private ng2cable: Ng2Cable,
        private config: Config
    ) {
        this.ng2cable.subscribe(config.get('actionCableUrl'), 'PostsChannel');
    }
}
