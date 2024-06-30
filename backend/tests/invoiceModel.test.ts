import { Invoice } from "../src/types";
import invoiceModel from "../src/models/invoiceModel";
import db from "../src/db";

const testInvoice: Invoice = {
  id: 1,
  date: "2024-06-30",
  customerName: "John Doe",
  salespersonName: "Jane Smith",
  notes: "Sample notes",
  products: [
    { name: "Product A", picture: "", stock: 10, price: 100 },
    { name: "Product B", picture: "", stock: 20, price: 200 },
  ],
  totalAmount: 300,
};

beforeAll((done) => {
  db.connect(done);
});

afterAll((done) => {
  db.end(done);
});

describe("Invoice Model", () => {
  it("should create a new invoice", (done) => {
    invoiceModel.create(testInvoice, (err, results) => {
      expect(err).toBeNull();
      console.log("err", err);
      expect(results).toBeDefined();
      console.log("results", results);
      done();
    });
  });

  it("should get all invoices", (done) => {
    invoiceModel.getAll((err, results) => {
      expect(err).toBeNull();
      expect(results).toBeDefined();
      expect(results.length).toBeGreaterThan(0);
      done();
    });
  });

  it("should get revenue", (done) => {
    invoiceModel.getRevenue((err, results) => {
      expect(err).toBeNull();
      expect(results).toBeDefined();
      expect(results.length).toBeGreaterThan(0);
      done();
    });
  });
});
