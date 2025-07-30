export interface Client {
  imie: string;
  nazwisko: string;
  adres: string;
  telefon: string;
  ilosc_obiektow: number;
}

export interface Offer {
  id: number;
  data_zlecenia: string;
  rozpoczecie: string;
  zakonczenie: string;
  adres: string;
  rodzaj: string;
  imie_nazwisko_klienta: string;
  imie_nazwisko_pracownika: string;
}

export interface Invoice {
  id: number;
  imie_nazwisko_klienta: string;
  nazwa_pliku: string;
}

export interface Contract {
  id: number;
  imie_nazwisko_klienta: string;
  nazwa_pliku: string;
}

export interface ApiResponse<T> {
  response: {
    result: T[];
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ExpandedRowData {
  offers: Offer[];
  invoices: Invoice[];
  contracts: Contract[];
}

export interface ColumnConfig {
  key: string;
  label: string;
  type?: 'text' | 'date' | 'datetime' | 'file';
  format?: string;
}

export interface TabConfig {
  label: string;
  key: keyof ExpandedRowData;
  columns: ColumnConfig[];
}
