import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private _polaziste: string = '';
  private _destinacija: string = '';

  setPolaziste(polaziste: string) {
    this._polaziste = polaziste;
  }

  setDestinacija(destinacija: string) {
    this._destinacija = destinacija;
  }

  getPolaziste(): string {
    return this._polaziste;
  }

  getDestinacija(): string {
    return this._destinacija;
  }
}
