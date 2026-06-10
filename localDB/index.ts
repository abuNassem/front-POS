import { ProductSummary } from '@/types/product';
import { Sale } from '@/types/sale';
import Dexie, { Table } from 'dexie';

class AppDatabase extends Dexie {
  products!: Table<ProductSummary>;
  invoices!: Table<Sale>

  constructor() {
    super('posDatabase');

    this.version(1).stores({
      products: '_id, barcode, name',
      invoices:'++id'
    });
  }
}

export const db = new AppDatabase();