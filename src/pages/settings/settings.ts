import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  city:string;
  state:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage) {

      this.storage.get('location').then((val) => {
        if(val) {
          let location = JSON.parse(val);
          this.city = location.city;
          this.state = location.state;
        } else {
          this.city = 'Duluth';
          this.state = 'MN';
        }
      });
    }

  saveForm(){
    let location = {
      city: this.city,
      state: this.state
    }
    this.storage.set('location', JSON.stringify(location));
    this.navCtrl.parent.select(0);
  }

}
