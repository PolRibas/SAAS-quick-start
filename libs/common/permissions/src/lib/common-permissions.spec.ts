import { commonPermissions } from './common-permissions';

describe('commonPermissions', () => {
  it('should work', () => {
    expect(commonPermissions()).toEqual('common-permissions');
  });
});
