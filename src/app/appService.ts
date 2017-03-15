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
            no: 1,
            title: '無標題',
            author: '無名氏',
            created_at: 'yyyy-MM-ddTHH:mm:ssZ',
            imageFileName: '123.jpg',
            imageFileSize: 123,
            id: '炫炮ID1',
            message: '無內文1',
            replies: [
                {
                    no: 2,
                    title: '無標題',
                    author: '無名氏',
                    created_at: 'yyyy-MM-ddTHH:mm:ssZ',
                    imageFileName: '',
                    imageFileSize: 123,
                    id: '炫炮ID2',
                    message: '無內文2'
                },
                {
                    no: 3,
                    title: '無標題',
                    author: '無名氏',
                    created_at: 'yyyy-MM-ddTHH:mm:ssZ',
                    imageFileName: '',
                    imageFileSize: 123,
                    id: '炫炮ID2',
                    message: '無內文3'
                }
            ]
        },
        {
            no: 4,
            title: '無標題',
            author: '無名氏',
            created_at: 'yyyy-MM-ddTHH:mm:ssZ',
            imageFileName: '123.jpg',
            imageFileSize: 123,
            id: '炫炮ID4',
            message: '無內文4',
            replies: [
                {
                    no: 5,
                    title: '無標題',
                    author: '無名氏',
                    created_at: 'yyyy-MM-ddTHH:mm:ssZ',
                    imageFileName: '',
                    imageFileSize: 123,
                    id: '炫炮ID5',
                    message: '無內文5'
                },
                {
                    no: 6,
                    title: '無標題',
                    author: '無名氏',
                    created_at: 'yyyy-MM-ddTHH:mm:ssZ',
                    imageFileName: '',
                    imageFileSize: 123,
                    id: '炫炮ID6',
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

    getThread(no: number): Observable<Post> {
        return Observable.create((observer: Observer<Post>) =>{
            observer.next(this.threads[no % this.threads.length]);
            observer.complete();
        });
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
