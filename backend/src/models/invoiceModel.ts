import db from "../db";
import mysql from "mysql2";

interface Invoice {
  id?: number;
  date: string;
  customerName: string;
  salespersonName: string;
  notes?: string;
  totalAmount: number;
}

const InvoiceModel = {
  create: (
    invoice: Invoice,
    callback: (err: mysql.QueryError | null, results: any) => void
  ) => {
    const query =
      "INSERT INTO invoices (date, customerName, salespersonName, notes, totalAmount) VALUES (?, ?, ?, ?, ?)";
    db.query(
      query,
      [
        invoice.date,
        invoice.customerName,
        invoice.salespersonName,
        invoice.notes,
        invoice.totalAmount,
      ],
      callback
    );
  },
  getAll: (callback: (err: mysql.QueryError | null, results: any) => void) => {
    const query = "SELECT * FROM invoices";
    db.query(query, callback);
  },
  getRevenue: (
    callback: (err: mysql.QueryError | null, results: any) => void
  ) => {
    const query = `
      SELECT DATE(date) as date, SUM(totalAmount) as revenue
      FROM invoices
      GROUP BY DATE(date)
      ORDER BY date
    `;
    db.query(query, callback);
  },
};

export default InvoiceModel;
