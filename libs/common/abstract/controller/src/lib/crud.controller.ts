import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import {
  AbstractCrudService,
  FindByCriteriaRequest,
  FindByCriteriaRequestDto,
  FindByCriteriaResponse
} from '@saas-quick-start/common/abstract/service';

import { FrontOfficeRolesGuard, BackOfficeRolesGuard } from '@saas-quick-start/platform/modules/security';

export abstract class AbstractCrudController<T> {
  constructor(
    readonly service: AbstractCrudService<T, unknown>,
  ) { }
}

export function CrudControllerMixin<T>(
  DtoClass: new () => T,
  criteriaDtoClass: new () => FindByCriteriaResponse<T>,
  strategy: 'back-office' | 'front-office' | 'portal' = 'back-office',
  name: string
) {
  abstract class MixinAbstractCrudController extends AbstractCrudController<T> {
    constructor(service: AbstractCrudService<T, unknown>) {
      super(service);
    }
    @Get()
    @ApiOperation({ summary: 'Retrieve all entities' })
    @ApiResponse({
      status: 200, description: 'Entities retrieved successfully', type: [DtoClass]
    })
    @UseGuards(
      strategy === 'back-office' ?
        new BackOfficeRolesGuard(`read-${name}`) :
        strategy === 'front-office' ?
          new FrontOfficeRolesGuard(`read-${name}`) : AuthGuard('jwt')
    )
    @ApiBearerAuth()
    async findAll(): Promise<T[]> {
      return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve an entity by its ID' })
    @ApiResponse({ status: 200, description: 'Entity retrieved successfully', type: DtoClass })
    @UseGuards(
      strategy === 'back-office' ?
        new BackOfficeRolesGuard(`read-${name}`) :
        strategy === 'front-office' ?
          new FrontOfficeRolesGuard(`read-${name}`) : AuthGuard('jwt')
    )
    @ApiBearerAuth()
    async findOne(@Param('id') id: string): Promise<T> {
      return this.service.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new entity' })
    @ApiBody({ type: DtoClass })
    @ApiResponse({ status: 201, description: 'Entity created successfully', type: DtoClass })
    @UseGuards(
      strategy === 'back-office' ?
        new BackOfficeRolesGuard(`create-${name}`) :
        strategy === 'front-office' ?
          new FrontOfficeRolesGuard(`create-${name}`) : AuthGuard('jwt')
    )
    @ApiBearerAuth()
    async create(@Body() entity: T): Promise<T> {
      return this.service.create(entity);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an existing entity' })
    @ApiBody({ type: DtoClass })
    @ApiResponse({ status: 200, description: 'Entity updated successfully', type: DtoClass })
    @UseGuards(
      strategy === 'back-office' ?
        new BackOfficeRolesGuard(`update-${name}`) :
        strategy === 'front-office' ?
          new FrontOfficeRolesGuard(`update-${name}`) : AuthGuard('jwt')
    )
    @ApiBearerAuth()
    async update(@Param('id') id: string, @Body() entity: T): Promise<T> {
      return this.service.update(id, entity);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an entity' })
    @ApiResponse({ status: 200, description: 'Entity deleted successfully' })
    @UseGuards(
      strategy === 'back-office' ?
        new BackOfficeRolesGuard(`delete-${name}`) :
        strategy === 'front-office' ?
          new FrontOfficeRolesGuard(`delete-${name}`) : AuthGuard('jwt')
    )
    @ApiBearerAuth()
    async delete(@Param('id') id: string): Promise<void> {
      return this.service.delete(id);
    }

    @Post('find-by-criteria')
    @ApiOperation({ summary: 'Search entities by criteria' })
    @ApiResponse({ status: 200, description: 'Search completed successfully', type: criteriaDtoClass })
    @UseGuards(
      strategy === 'back-office' ?
        new BackOfficeRolesGuard(`read-${name}`) :
        strategy === 'front-office' ?
          new FrontOfficeRolesGuard(`read-${name}`) : AuthGuard('jwt')
    )
    @ApiBody({ type: FindByCriteriaRequestDto })
    @ApiBearerAuth()
    async findByCriteria(@Body() request: FindByCriteriaRequest): Promise<FindByCriteriaResponse<T>> {
      return this.service.findByCriteria(request);
    }
  }

  return MixinAbstractCrudController;
}
