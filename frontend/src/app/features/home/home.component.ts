import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isBlue: boolean = false;
  text: string = 'beloo';

  toggleColor(){
    this.isBlue = !this.isBlue;
    this.text = this.isBlue ? 'plavo' : 'belo';
  }


}
