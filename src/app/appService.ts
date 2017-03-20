import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { Observable, Observer } from 'rxjs';

import { Config } from './config';

import 'rxjs/add/operator/map'

/**
 * 伺服器服務
 */
@Injectable()
export class AppService {
    apiUrl: string;

    constructor(
        private http: Http,
        private config: Config
    ) {
        this.apiUrl = this.config.get('apiUrl');
    }

    getThreads(): Observable<Post[]> {
        return this.http.get(this.apiUrl + 'threads', {
            responseType: ResponseContentType.Json
        }).map(res => <Post[]>res.json());
    }

    getThread(id: number): Observable<Post> {
        return this.http.get(this.apiUrl + 'threads/' + id, {
            responseType: ResponseContentType.Json
        }).map(res => <Post>res.json());
    }
}

export class Post {
    id: number;
    title: string;
    author: string;
    email: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    imageFileName?: string;
    imageFileSize?: number;
    imageContentType?: string;
    imageUpdatedAt?: Date | string;
    identityHash: string;
    message: string;
    locked?: boolean;
    admin?: boolean;
    replies?: Post[];
}
