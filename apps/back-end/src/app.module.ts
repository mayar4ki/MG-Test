import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validateEnv } from './config/env-validation.schema';



@Module({
  imports: [
 
    
    ConfigModule.forRoot({
      validate: validateEnv,
      isGlobal: true, // Make config available globally
    }),
  ],
})
export class AppModule {}
