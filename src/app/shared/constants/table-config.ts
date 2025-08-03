import { ColumnConfig, TabConfig } from '../models/client.model';

export const CLIENT_COLUMNS: ColumnConfig[] = [
  {
    key: 'imie_nazwisko',
    label: 'CLIENT_MANAGEMENT.COLUMNS.NAME',
    type: 'text',
  },
  { key: 'adres', label: 'CLIENT_MANAGEMENT.COLUMNS.ADDRESS', type: 'text' },
  { key: 'telefon', label: 'CLIENT_MANAGEMENT.COLUMNS.PHONE', type: 'text' },
  {
    key: 'ilosc_obiektow',
    label: 'CLIENT_MANAGEMENT.COLUMNS.OBJECTS_COUNT',
    type: 'text',
  },
];

export const TAB_CONFIGS: TabConfig[] = [
  {
    label: 'TABS.OFFERS',
    key: 'offers',
    columns: [
      { key: 'id', label: 'OFFERS.ID', type: 'text' },
      { key: 'data_zlecenia', label: 'OFFERS.ORDER_DATE', type: 'date' },
      { key: 'rozpoczecie', label: 'OFFERS.START', type: 'datetime' },
      { key: 'zakonczenie', label: 'OFFERS.END', type: 'datetime' },
      { key: 'adres', label: 'OFFERS.ADDRESS', type: 'text' },
      { key: 'rodzaj', label: 'OFFERS.SERVICE_TYPE', type: 'text' },
      { key: 'imie_nazwisko_klienta', label: 'OFFERS.CLIENT', type: 'text' },
      {
        key: 'imie_nazwisko_pracownika',
        label: 'OFFERS.EMPLOYEE',
        type: 'text',
      },
    ],
  },
  {
    label: 'TABS.INVOICES',
    key: 'invoices',
    columns: [
      { key: 'id', label: 'INVOICES.ID', type: 'text' },
      { key: 'imie_nazwisko_klienta', label: 'INVOICES.CLIENT', type: 'text' },
      { key: 'nazwa_pliku', label: 'INVOICES.FILE_NAME', type: 'file' },
    ],
  },
  {
    label: 'TABS.CONTRACTS',
    key: 'contracts',
    columns: [
      { key: 'id', label: 'CONTRACTS.ID', type: 'text' },
      { key: 'imie_nazwisko_klienta', label: 'CONTRACTS.CLIENT', type: 'text' },
      { key: 'nazwa_pliku', label: 'CONTRACTS.FILE_NAME', type: 'file' },
    ],
  },
];
