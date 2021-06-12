import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {WeatherService} from "./weather.service";

@NgModule({
  providers: [WeatherService],
  imports: [HttpClientModule],
})
export class WeatherModule {}

