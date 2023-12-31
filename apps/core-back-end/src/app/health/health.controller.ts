import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  @Get()
  @HealthCheck()
  public async defaultHealthCheck() {
    return {
      ok: true,
    };
  }
}
