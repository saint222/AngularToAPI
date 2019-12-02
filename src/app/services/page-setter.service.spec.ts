import { TestBed } from '@angular/core/testing';

import { PageSetterService } from './page-setter.service';

describe('PageSetterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageSetterService = TestBed.get(PageSetterService);
    expect(service).toBeTruthy();
  });
});
