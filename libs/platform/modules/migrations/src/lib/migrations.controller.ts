import {
  Get,
  UseGuards,
  Controller,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MigrationFunctionsService } from '@saas-quick-start/infrastructure/migrations';


@ApiTags('migration')
@Controller('migration')
export class MigrationController {
  constructor(
    private readonly migrationsService: MigrationFunctionsService
  ) { }

  @Get('execute')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin'))
  @ApiOperation({ summary: 'Execute all migrations' })
  async execute(
  ): Promise<void> {
    await this.migrationsService.runMigrations()
  }

  @Get('execute/:name')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin'))
  @ApiOperation({ summary: 'Execute migration by name/id' })
  async executeByName(
    @Param('name') name: string
  ): Promise<void> {
    await this.migrationsService.runMigrationByName(name)
  }

  @Delete('delete/:name')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin'))
  @ApiOperation({ summary: 'Delete migration by name/id' })
  async deleteByName(
    @Param('name') name: string
  ): Promise<void> {
    await this.migrationsService.deleteMigrationByName(name)
  }
}
