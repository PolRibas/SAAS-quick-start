export interface UserMenuEntityInterface {
  code?: string;
  name?: string;
  icon?: string;
  link?: string;
  order?: number;
  parentId?: string;
}

export class UserMenuEntity implements UserMenuEntityInterface {
  public code?: string;
  public name?: string;
  public icon?: string;
  public link?: string;
  public order?: number;
  public parentId?: string;

  constructor(params: UserMenuEntityInterface) {
    this.code = params.code;
    this.name = params.name;
    this.icon = params.icon;
    this.link = params.link;
    this.order = params.order;
    this.parentId = params.parentId;
  }
}
