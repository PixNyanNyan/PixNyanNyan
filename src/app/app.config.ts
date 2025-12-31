import { ApplicationConfig, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { RecaptchaModule } from 'ng-recaptcha';
import { ActionCableService } from 'angular2-actioncable';

import { ROUTES } from './app.routes';
import { AppService } from './appService';
import { ConfigService } from './configService';
import { Broadcaster } from './broadcaster.service';

export function InitialConfigLoad(config: ConfigService) {
    return () => config.load();
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(ROUTES),
    provideHttpClient(),
    importProvidersFrom(RecaptchaModule),
    ActionCableService,
    Broadcaster,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: InitialConfigLoad,
      deps: [ConfigService],
      multi: true
    },
    AppService
  ]
};
