import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  health(): string {
    console.log('Health check');
    return 'Ok';
  }
}
