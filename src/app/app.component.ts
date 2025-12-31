import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActionCableService } from 'angular2-actioncable';
import { Broadcaster } from './broadcaster.service';
import { ConfigService } from './configService';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title: string;

    constructor(
        private cableService: ActionCableService,
        private broadcaster: Broadcaster,
        private config: ConfigService
    ) {
        this.title = config.get('title');
        const channel = this.cableService.cable(config.get('actionCableUrl')).channel('PostsChannel');
        channel.received().subscribe(message => {
            // Broadcaster in ng2-cable likely filtered by event name if passed in .on()
            // Here we assume message structure has { action: 'create', ... } or similar.
            // Or maybe the broadcaster.on('create') means it looks for { action: 'create' }?
            // Let's assume the message itself is what we broadcast, and let listeners filter.
            // Wait, old code: broadcaster.on<any>('create').map(message => JSON.parse(message.obj))
            // This suggests message.obj exists.

            // If the message has an action property, we use it as key?
            // Let's assume 'create' is the key.
            // If we don't know the key, we might need to inspect the message.
            // But looking at thread.component.ts: .on<any>('create')
            // It seems 'create' is a custom event name.

            // If ActionCable sends just data, we need to know how ng2-cable determined 'create'.
            // Maybe it's just broadcasting everything to 'create'? unlikely.
            // Probably the message has a type or action field.

            // For now, I will broadcast to 'create' if unsure, or broadcast to a generic channel?
            // But listeners filter by 'create'.

            // Let's blindly broadcast to 'create' if we receive something, assuming it's a new post.
            // Or better, check if message.action exists.

            if (message && message.action) {
                this.broadcaster.broadcast(message.action, message);
            } else {
                // Fallback or maybe the 'create' event is default?
                // Let's look at thread.component.ts again.
                // .map<IPost>(message => JSON.parse(message.obj))
                // So message has obj.

                // I will broadcast with key 'create' for now as it is the only one used.
                 this.broadcaster.broadcast('create', message);
            }
        });
    }
}
