import { Component, OnInit } from '@angular/core';
import { SalesmanService } from '../services/salesman.service';

interface SalesmanCommission {
  salesman: string;
  totalSalesAmount: number;
  totalCommission: number;
}
@Component({
  selector: 'app-salesman-commission',
  templateUrl: './salesman-commission.component.html',
  styleUrls: ['./salesman-commission.component.css']
})
export class SalesmanCommissionComponent implements OnInit {
  salesmanCommissions: SalesmanCommission[] = [];
  errorMessage = '';

  constructor(private salesmanService: SalesmanService) { }
  ngOnInit(): void {
    this.salesmanService.getSalesmanCommission().subscribe(
      data => this.salesmanCommissions = data,
      error => this.errorMessage = error
    );
  }
}
