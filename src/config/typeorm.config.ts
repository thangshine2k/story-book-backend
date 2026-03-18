import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getTypeOrmConfig = (
  config: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',

  // ✅ DÙNG DATABASE_URL
  url: config.get<string>('DATABASE_URL'),

  autoLoadEntities: true,
  synchronize: false,
  // 🔥 tránh crash khi DB chưa ready
  retryAttempts: 10,
  retryDelay: 3000,
});
