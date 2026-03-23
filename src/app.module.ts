import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { getTypeOrmConfig } from './config/typeorm.config';
import { StoryModule } from './modules/story/story.module';
import { ChapterModule } from './modules/chapter/chapter.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => getTypeOrmConfig(config),
      inject: [ConfigService],
    }),

    StoryModule,
    ChapterModule,
    AuthModule,
  ],
})
export class AppModule {}
