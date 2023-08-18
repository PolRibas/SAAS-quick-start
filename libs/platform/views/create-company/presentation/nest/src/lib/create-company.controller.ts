import {
  Post,
  Body,
  Controller,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  FrontOfficeCompanyCreateRequestDto, FrontOfficeCompanyCreateResponseDto,
} from './data';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { FrontOfficeCreateCompanyServices } from './create-company.service';


@ApiTags('create company')
@Controller('create-company')
export class FrontOfficeCreateCompanyController {
  constructor(
    private readonly frontOfficeCompanyService: FrontOfficeCreateCompanyServices,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create a company' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    type: FrontOfficeCompanyCreateResponseDto,
    description: 'The company has been successfully created.',
  })
  async create(
    @Req() req: Request & { user: { _id: string } },
    @Body() createCompanyDto: FrontOfficeCompanyCreateRequestDto,
  ): Promise<FrontOfficeCompanyCreateResponseDto> {
    return this.frontOfficeCompanyService.createCompany(createCompanyDto, req.user._id);
  }
}
