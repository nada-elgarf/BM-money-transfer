import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private transferDataSubject = new BehaviorSubject<any>(null);
  transferData$ = this.transferDataSubject.asObservable();

  private apiUrl = '/api/transfer';

  constructor(private http: HttpClient) { }

  setTransferData(data: any): void {
    this.transferDataSubject.next(data);
  }

  getTransferData(): any {
    return this.transferDataSubject.getValue();
  }

  submitTransfer(transferData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, transferData);
  }
}
