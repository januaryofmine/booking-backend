import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import {TypeOrmModule} from "@nestjs/typeorm"

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './modules/room/room.module';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
import { ConfigModule } from '@nestjs/config';
import { RoomserviceModule } from './roomservice/roomservice.module';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [ConfigModule.forRoot(),TypeOrmModule.forRoot(),RoomsModule, UserModule, OrderModule, RoomserviceModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: HttpErrorFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
