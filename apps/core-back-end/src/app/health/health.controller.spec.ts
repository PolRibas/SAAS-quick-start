import { HealthController } from './health.controller';

describe(HealthController, () => {
  let uut: HealthController;

  beforeEach(() => {
    uut = new HealthController();
  });

  describe('endpoints', () => {
    describe('default', () => {
      it('returns an ok response with no parameters', async () => {
        const response = await uut.defaultHealthCheck();

        expect(response).toEqual({
          ok: true,
        });
      });
    });
  });
});
