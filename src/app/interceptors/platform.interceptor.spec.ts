import { TestBed } from '@angular/core/testing';

import { PlatformInterceptor } from './platform.interceptor';

describe('PlatformInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PlatformInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PlatformInterceptor = TestBed.inject(PlatformInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
