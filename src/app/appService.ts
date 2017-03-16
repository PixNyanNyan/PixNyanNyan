import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { Observable, Observer } from 'rxjs';

import 'rxjs/add/operator/map'

/**
 * 伺服器服務
 */
@Injectable()
export class AppService {

    threads: Post[] = [
        {
            id: 1,
            title: '無標題',
            author: '無名氏',
            email: null,
            createdAt: 'yyyy-MM-ddTHH:mm:ssZ',
            updatedAt: null,
            imageFileName: '123.jpg',
            imageFileSize: 123,
            identityHash: '炫炮ID1',
            message: '無內文1',
            replies: [
                {
                    id: 2,
                    title: '無標題',
                    author: '無名氏',
                    email: null,
                    createdAt: 'yyyy-MM-ddTHH:mm:ssZ',
                    updatedAt: null,
                    imageFileName: '',
                    imageFileSize: 123,
                    identityHash: '炫炮ID2',
                    message: '無內文2'
                },
                {
                    id: 3,
                    title: '無標題',
                    author: '無名氏',
                    email: null,
                    createdAt: 'yyyy-MM-ddTHH:mm:ssZ',
                    updatedAt: null,
                    imageFileName: '',
                    imageFileSize: 123,
                    identityHash: '炫炮ID2',
                    message: '無內文3'
                }
            ]
        },
        {
            id: 4,
            title: '無標題',
            author: '無名氏',
            email: null,
            createdAt: 'yyyy-MM-ddTHH:mm:ssZ',
            updatedAt: null,
            imageFileName: '123.jpg',
            imageFileSize: 123,
            identityHash: '炫炮ID4',
            message: '無內文4',
            replies: [
                {
                    id: 5,
                    title: '無標題',
                    author: '無名氏',
                    email: null,
                    createdAt: 'yyyy-MM-ddTHH:mm:ssZ',
                    updatedAt: null,
                    imageFileName: '',
                    imageFileSize: 123,
                    identityHash: '炫炮ID5',
                    message: '無內文5'
                },
                {
                    id: 6,
                    title: '無標題',
                    author: '無名氏',
                    email: null,
                    createdAt: 'yyyy-MM-ddTHH:mm:ssZ',
                    updatedAt: null,
                    imageFileName: '',
                    imageFileSize: 123,
                    identityHash: '炫炮ID6',
                    message: '無內文6'
                }
            ]
        }
    ];

    constructor(private http: Http) {
    }

    getThreads(): Observable<Post[]> {
        return Observable.create((observer: Observer<Post[]>) =>{
            observer.next(this.threads);
            observer.complete();
        });
    }

    getThread(id: number): Observable<Post> {
        return Observable.create((observer: Observer<Post>) =>{
            observer.next(this.threads[id % this.threads.length]);
            observer.complete();
        });
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
