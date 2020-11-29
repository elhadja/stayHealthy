import { TestBed } from '@angular/core/testing';

import { InteractionsService } from './interactions.service';

describe('ToolsService', () => {
  let service: InteractionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteractionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
