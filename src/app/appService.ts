import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map'

/**
 * 伺服器服務
 */
@Injectable()
export class AppService {

    constructor(private http: Http) {
    }
}

export class Post {
    no: number;
    title?: string;
    author?: string;
    created_at: Date | string;
    imageFileName?: string;
    imageFileSize?: number;
    id: string;
    message: string;
    replies?: Post[];
}
