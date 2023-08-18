import { ApiProperty } from "@nestjs/swagger";

export class MenuDto {
  @ApiProperty({ required: false })
  code?: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  icon?: string;

  @ApiProperty({ required: false })
  link?: string;

  @ApiProperty({ required: false })
  order?: number;

  @ApiProperty({ required: false })
  parentId?: string;
}
