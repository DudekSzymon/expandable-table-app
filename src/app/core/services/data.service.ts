import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import {
  Client,
  Offer,
  Invoice,
  Contract,
  ApiResponse,
  ExpandedRowData,
} from '../../shared/models/client.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private mockClients: ApiResponse<Client> = {
    response: {
      result: [
        {
          imie: 'Jan',
          nazwisko: 'Kowalski',
          adres: 'ul. Słoneczna 12, Warszawa',
          telefon: '123-456-789',
          ilosc_obiektow: 3,
        },
      ],
    },
  };

  private mockOffers: ApiResponse<Offer> = {
    response: {
      result: [
        {
          id: 1,
          data_zlecenia: '2025-01-02',
          rozpoczecie: '2025-01-02T10:00',
          zakonczenie: '2025-01-02T10:00',
          adres: 'ul. Zielona 4, Warszawa',
          rodzaj: 'Malowanie',
          imie_nazwisko_klienta: 'Anna Nowak',
          imie_nazwisko_pracownika: 'Jan Kowalski',
        },
        {
          id: 2,
          data_zlecenia: '2025-01-02',
          rozpoczecie: '2025-01-08T10:00',
          zakonczenie: '2025-01-15T10:00',
          adres: 'ul. Krakowska 18, Warszawa',
          rodzaj: 'Remont',
          imie_nazwisko_klienta: 'Katarzyna Wiśniewska',
          imie_nazwisko_pracownika: 'Jan Kowalski',
        },
        {
          id: 3,
          data_zlecenia: '2025-01-02',
          rozpoczecie: '2025-01-02T10:00',
          zakonczenie: '2025-01-02T10:00',
          adres: 'ul. Piękna 22, Warszawa',
          rodzaj: 'Naprawa',
          imie_nazwisko_klienta: 'Piotr Malinowski',
          imie_nazwisko_pracownika: 'Jan Kowalski',
        },
      ],
    },
  };

  private mockInvoices: ApiResponse<Invoice> = {
    response: {
      result: [
        {
          id: 1,
          imie_nazwisko_klienta: 'Anna Nowak',
          nazwa_pliku: 'faktura_1.pdf',
        },
        {
          id: 2,
          imie_nazwisko_klienta: 'Katarzyna Wiśniewska',
          nazwa_pliku: 'faktura_2.pdf',
        },
        {
          id: 3,
          imie_nazwisko_klienta: 'Piotr Malinowski',
          nazwa_pliku: 'faktura_3.pdf',
        },
      ],
    },
  };

  private mockContracts: ApiResponse<Contract> = {
    response: {
      result: [
        {
          id: 1,
          imie_nazwisko_klienta: 'Anna Nowak',
          nazwa_pliku: 'umowa1.pdf',
        },
        {
          id: 2,
          imie_nazwisko_klienta: 'Katarzyna Wiśniewska',
          nazwa_pliku: 'umowa2.pdf',
        },
        {
          id: 3,
          imie_nazwisko_klienta: 'Piotr Malinowski',
          nazwa_pliku: 'umowa3.pdf',
        },
      ],
    },
  };

  getClients(): Observable<Client[]> {
    return of(this.mockClients).pipe(
      delay(300),
      map((response) => response.response.result)
    );
  }

  getExpandedRowData(clientName: string): Observable<ExpandedRowData> {
    return forkJoin({
      offers: of(this.mockOffers).pipe(
        map((response) => response.response.result)
      ),
      invoices: of(this.mockInvoices).pipe(
        map((response) => response.response.result)
      ),
      contracts: of(this.mockContracts).pipe(
        map((response) => response.response.result)
      ),
    }).pipe(delay(200));
  }
}
