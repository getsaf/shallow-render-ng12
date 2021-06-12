import { Injectable} from '@angular/core';
import {  HttpClient } from '@angular/common/http';

////// Module Setup //////

type WeatherServiceResults = {
  chanceOfRain: number;
  temperature: number;
};

@Injectable()
export class WeatherService {
  constructor(private _http: HttpClient) {}

  getTemperatureForZip(zipcode: string) {
    return this._http
      .get<WeatherServiceResults>('https://my-weather-api.com', { params: { zipcode } })
      .toPromise()
      .then(result => result.temperature);
  }
}

