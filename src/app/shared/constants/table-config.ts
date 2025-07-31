import { ColumnConfig, TabConfig } from '../models/client.model';

export const CLIENT_COLUMNS: ColumnConfig[] = [
  { key: 'imie_nazwisko', label: 'Imię i nazwisko', type: 'text' },
  { key: 'adres', label: 'Adres', type: 'text' },
  { key: 'telefon', label: 'Telefon', type: 'text' },
  { key: 'ilosc_obiektow', label: 'Ilość obiektów', type: 'text' },
];

export const TAB_CONFIGS: TabConfig[] = [
  {
    label: 'Oferty',
    key: 'offers',
    columns: [
      { key: 'id', label: 'ID', type: 'text' },
      { key: 'data_zlecenia', label: 'Data zlecenia', type: 'date' },
      { key: 'rozpoczecie', label: 'Rozpoczęcie', type: 'datetime' },
      { key: 'zakonczenie', label: 'Zakończenie', type: 'datetime' },
      { key: 'adres', label: 'Adres', type: 'text' },
      { key: 'rodzaj', label: 'Rodzaj usługi', type: 'text' },
      { key: 'imie_nazwisko_klienta', label: 'Klient', type: 'text' },
      { key: 'imie_nazwisko_pracownika', label: 'Pracownik', type: 'text' },
    ],
  },
  {
    label: 'Faktury',
    key: 'invoices',
    columns: [
      { key: 'id', label: 'ID', type: 'text' },
      { key: 'imie_nazwisko_klienta', label: 'Klient', type: 'text' },
      { key: 'nazwa_pliku', label: 'Nazwa pliku', type: 'file' },
    ],
  },
  {
    label: 'Umowy',
    key: 'contracts',
    columns: [
      { key: 'id', label: 'ID', type: 'text' },
      { key: 'imie_nazwisko_klienta', label: 'Klient', type: 'text' },
      { key: 'nazwa_pliku', label: 'Nazwa pliku', type: 'file' },
    ],
  },
];
