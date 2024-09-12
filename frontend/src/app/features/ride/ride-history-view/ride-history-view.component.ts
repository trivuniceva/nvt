import { Component, OnInit } from '@angular/core';
import { RideService } from '../../../core/services/ride/ride.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import {Chart} from "chart.js";

@Component({
  selector: 'app-ride-history-view',
  templateUrl: './ride-history-view.component.html',
  styleUrls: ['./ride-history-view.component.css']
})
export class RideHistoryViewComponent implements OnInit {
  rides: any[] = [];
  selectedRide: any = null;
  startDate: string = '';
  endDate: string = '';
  totalDistance: number = 0;
  totalEarnings: number = 0;
  averageDistance: number = 0;
  averageEarnings: number = 0;

  // Dodajte ove atribute za sortiranje
  sortField: string = 'startDate';
  sortAsc: boolean = false;

  constructor(
    private rideService: RideService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchRides();
  }

  fetchRides(): void {
    // Ako je potrebno, dodajte opcionalne parametre za filtriranje
    this.rideService.getRideHistory(this.authService.userEmail).subscribe((rides: any[]) => {
      this.rides = rides;
      this.updateStatistics();
    });
  }

  updateStatistics(): void {
    if (this.rides.length === 0) {
      this.totalDistance = 0;
      this.totalEarnings = 0;
      this.averageDistance = 0;
      this.averageEarnings = 0;
      return;
    }

    let totalDistance = 0;
    let totalEarnings = 0;

    this.rides.forEach(ride => {
      totalDistance += ride.distance || 0;
      totalEarnings += ride.price || 0;
    });

    this.totalDistance = totalDistance;
    this.totalEarnings = totalEarnings;
    this.averageDistance = totalDistance / this.rides.length;
    this.averageEarnings = totalEarnings / this.rides.length;

    console.log(`Ukupno pređeni kilometri: ${this.totalDistance}`);
    console.log(`Ukupno zarađeni novac: ${this.totalEarnings}`);
    console.log(`Prosek pređenih kilometara: ${this.averageDistance}`);
    console.log(`Prosek zarađenog novca: ${this.averageEarnings}`);
  }

  sort(field: string) {
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortField = field;
      this.sortAsc = true;
    }
    this.sortRides();
  }

  sortRides() {
    this.rides.sort((a, b) => {
      let fieldA = a[this.sortField];
      let fieldB = b[this.sortField];
      if (fieldA < fieldB) {
        return this.sortAsc ? -1 : 1;
      } else if (fieldA > fieldB) {
        return this.sortAsc ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  showDetails(ride: any) {
    this.selectedRide = ride;
  }

  closeDetails() {
    this.selectedRide = null;
  }

  orderNow(ride: any) {
    console.log('Poručuješ rutu odmah:', ride.route);
  }

  orderLater(ride: any) {
    console.log('Poručuješ rutu kasnije:', ride.route);
  }

  applyDateFilter() {
    this.rideService.getRideHistory(this.authService.userEmail).subscribe((rides: any[]) => {
      this.rides = rides;
      this.updateStatistics();
    });
  }

  createCharts(): void {
    new Chart('ridesChart', {
      type: 'line',
      data: {
        labels: ['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota', 'Nedelja'],
        datasets: [{
          label: 'Broj vožnji po danima',
          data: [10, 20, 15, 25, 30, 5, 20], // Primer podataka
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart('distanceChart', {
      type: 'bar',
      data: {
        labels: ['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota', 'Nedelja'],
        datasets: [{
          label: 'Pređeni kilometri',
          data: [100, 200, 150, 250, 300, 50, 200], // Primer podataka
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart('earningsChart', {
      type: 'pie',
      data: {
        labels: ['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota', 'Nedelja'],
        datasets: [{
          label: 'Zarađeni novac',
          data: [1000, 2000, 1500, 2500, 3000, 500, 2000], // Primer podataka
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  }
}
