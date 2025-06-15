import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './routes/user/user.module';
import { BoothsModule } from './routes/booths/booths.module';
import { TokenMiddleware } from './middlewares/token/token.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, BoothsModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('booths');
  }
}
