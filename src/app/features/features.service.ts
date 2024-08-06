import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TransferMoney } from '../models/transfer-money';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  private apiUrl = 'https://v6.exchangerate-api.com/v6/c7f608e9af25a4502e634875/latest/USD';
  private transferApiUrl = "/api/favorites";
  private authToken = localStorage.getItem('token');
  private myAccountUrl = '/api/balance';
  private myAccountPayHistoryUrl = '/api/transactions';

  constructor(private http: HttpClient) {}

  getExchangeRates(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.conversion_rates)
    );
  }

  getBalance(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.get<any>(this.myAccountUrl, { headers });
  }

  getPaymentHistory(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.get<any>(this.myAccountPayHistoryUrl, { headers });
  }

  submitTransfer(transferData: TransferMoney): Observable<TransferMoney> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.post<TransferMoney>(this.transferApiUrl, transferData, { headers });
  }
}
