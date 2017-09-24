import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather: any;
  location: {
    city:string,
    state: string
  }
  firstLoad = true;

  constructor(
    public navCtrl: NavController,
    private weatherProvider: WeatherProvider,
    private storage:Storage) {

  }

  ionViewWillEnter(){
    this.loadWeather();
  }
  loadWeather(){
    this.storage.get('location').then((val) => {
      if(val) {
        this.location = JSON.parse(val);
      } else {
        this.location = {
          city: 'Duluth',
          state: 'MN'
        }
      }

      this.weatherProvider.getWeather(this.location.city, this.location.state)
      .subscribe(weather => {
        this.weather = weather.current_observation;
      });
    });
  }
}
