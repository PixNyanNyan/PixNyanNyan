import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class Broadcaster {
    private _eventBus: Subject<any>;

    constructor() {
        this._eventBus = new Subject<any>();
    }

    broadcast(key: string, data: any) {
        this._eventBus.next({ key, data });
    }

    on<T>(key: string): Observable<T> {
        return this._eventBus.asObservable().pipe(
            filter(event => event.key === key),
            map(event => event.data)
        );
    }
}
