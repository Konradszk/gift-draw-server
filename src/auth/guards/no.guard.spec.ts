import { NoGuard } from './no.guard';

describe('LocalGuard', () => {
  it('should be defined', () => {
    expect(new NoGuard()).toBeDefined();
  });
});
