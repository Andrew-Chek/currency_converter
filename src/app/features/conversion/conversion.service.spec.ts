import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { ConversionService } from './conversion.service';

describe('ConversionService', () => {
  let service: ConversionService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'https://api.apilayer.com/fixer';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ConversionService,
        HttpClient
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ConversionService);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  describe('#convertCurrencies', () => {
    it('should send proper request', () => {

      service.convertCurrencies('USD', 'EUR', 12).subscribe({
        next: data => expect(data).toBeTruthy(),
        error: fail
      })
  
      const req = httpTestingController.expectOne(`${apiUrl}/convert?from=USD&to=EUR&amount=12`);
      expect(req.request.method).toEqual('GET');
    })

    it('should return expected exchange value', () => {

      service.convertCurrencies('UAH', 'USD').subscribe({
        next: data => {
          expect(data.result).toEqual(37)
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`/convert?from=UAH&to=USD&amount=1`);
      req.flush({result: 37})
    })
  })
})
