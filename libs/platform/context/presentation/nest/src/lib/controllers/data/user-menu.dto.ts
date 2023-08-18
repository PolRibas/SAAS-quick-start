import { ApiProperty } from "@nestjs/swagger";
import { UserMenuPresenter } from "@saas-quick-start/platform/context/presenters";

export class MenuDto implements UserMenuPresenter {
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
