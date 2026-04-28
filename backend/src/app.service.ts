
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcome() {
    return {
      message: 'Welcome to DailyLock API',
      description: 'Time-locked money drip enforcement service.',
    };
  }

  getHealthCheck() {
    return {
      status: 'active',
      version: '1.0.0', // In a real app, read this from package.json
      timestamp: new Date().toISOString(),
      service: 'dailylock-backend',
    };
  }
}
