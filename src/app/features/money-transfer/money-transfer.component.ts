import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.css']
})
export class MoneyTransferComponent implements OnInit {
  currentRoute = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateCurrentRoute();
    });

    this.updateCurrentRoute();
  }

  private updateCurrentRoute() {

    const urlSegments = this.router.url.split('/');
    const lastSegment = urlSegments[urlSegments.length - 1] || '';

    this.mappingRoute(lastSegment);
  }

  private mappingRoute(route: string) {
    switch (route) {
      case '':
        this.currentRoute = 'Amount';
        break;
      case 'confirmation':
        this.currentRoute = 'Confirmation';
        break;
      case 'payment':
        this.currentRoute = 'Payment';
        break;
      default:
        this.currentRoute = 'Amount';
    }
  }
}
