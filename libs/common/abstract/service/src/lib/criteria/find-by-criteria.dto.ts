import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { FindByCriteriaJoinEnum, FindByCriteriaOperationEnum } from './find-by-criteria.interface';


export class FindByCriteriaFilterConditionDto {
  @ApiProperty({ description: 'The key for the condition' })
  @IsString()
  key: string;

  @ApiProperty({ description: 'The operation for the condition', enum: FindByCriteriaOperationEnum })
  @IsEnum(FindByCriteriaOperationEnum)
  operation: FindByCriteriaOperationEnum;

  @ApiProperty({ description: 'The value for the condition' })
  value: unknown;
}

export class FindByCriteriaRequestDto {
  @ApiPropertyOptional({ description: 'Array of filter conditions', type: [FindByCriteriaFilterConditionDto], required: false })
  @IsOptional()
  @Type(() => FindByCriteriaFilterConditionDto)
  conditions?: FindByCriteriaFilterConditionDto[];

  @ApiPropertyOptional({ description: 'Join operation for the conditions', enum: FindByCriteriaJoinEnum, required: false })
  @IsOptional()
  @IsEnum(FindByCriteriaJoinEnum)
  join?: FindByCriteriaJoinEnum;

  @ApiPropertyOptional({ description: 'Sort key', required: false })
  @IsOptional()
  @IsString()
  sortKey?: string;

  @ApiPropertyOptional({ description: 'Sort order', enum: ['asc', 'desc'], required: false })
  @IsOptional()
  sortOrder?: 'asc' | 'desc';

  @ApiPropertyOptional({ description: 'Limit for the results', required: false })
  @IsOptional()
  @IsInt()
  limit?: number;

  @ApiPropertyOptional({ description: 'Page for the results', required: false })
  @IsOptional()
  @IsInt()
  page?: number;
}

// implement in each module
export class FindByCriteriaResponseDto {
  // @ApiProperty({ description: 'Array of resulting items', isArray: true })
  // items: unknown[];

  @ApiProperty({ description: 'Total number of items' })
  total: number;

  @ApiPropertyOptional({ description: 'Current page of the results' })
  @IsOptional()
  @IsInt()
  page?: number;

  @ApiPropertyOptional({ description: 'Limit for the results' })
  @IsOptional()
  @IsInt()
  limit?: number;
}
