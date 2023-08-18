import { HealthModule } from './health.module';
import { HealthController } from './health.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe(HealthModule, () => {
  let uut: TestingModule;

  describe('dependencies', () => {
    describe(HealthController, () => {
      it('returns a new HealthController', async () => {
        uut = await Test.createTestingModule({
          imports: [HealthModule],
        }).compile();

        const healthController = await uut.get(HealthController);

        expect(healthController).toBeInstanceOf(HealthController);
      });
    });
  });
});
