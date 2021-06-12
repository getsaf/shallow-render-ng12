import {HttpClient, HttpClientModule} from "@angular/common/http";
import {of} from "rxjs";
import {Shallow} from "shallow-render";
import {WeatherService} from "./weather.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {WeatherModule} from "./weather.module";

describe('WeatherService', () => {
  let shallow: Shallow<WeatherService>;

  beforeEach(() => {
    shallow = new Shallow(WeatherService, WeatherModule);
  });

  describe('getTemperatureForZip', () => {
    ////////////////////////
    // With Standard Mocks
    ////////////////////////
    it('returns the temperature for the given zipcode', async () => {
      const { inject, instance } = shallow.mock(HttpClient, { get: () => of({ temperature: 20 }) }).createService();
      const temperature = await instance.getTemperatureForZip('12345');

      expect(inject(HttpClient).get).toHaveBeenCalledWith(jasmine.stringMatching('my-weather-api.com'), {
        params: { zipcode: '12345' },
      });
      expect(temperature).toBe(20);
    });

    /////////////////////////////////
    // With HttpClientTestingModule
    /////////////////////////////////
    it('returns the temperature for the given zipcode', async () => {
      const { inject, instance } = shallow.replaceModule(HttpClientModule, HttpClientTestingModule).createService();
      const http = inject(HttpTestingController);
      const requestPromise = instance.getTemperatureForZip('12345');
      const mock = http.expectOne('https://my-weather-api.com?zipcode=12345');

      expect(mock.request.method).toBe('GET');
      mock.flush({ temperature: 20 });
      expect(await requestPromise).toBe(20);
      http.verify();
    });
  });
});

