import request from "supertest";
import db from "../src/db";
import app from "../src/server";
import { testInvoice } from "./data/invoice.mock";

beforeAll((done) => {
  db.connect(done);
});

afterAll((done) => {
  db.end(done);
});

describe("Invoice Endpoints", () => {
  it("should create a new invoice", async () => {
    const res = await request(app).post("/api/invoices").send(testInvoice);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.customerName).toEqual(testInvoice.customerName);
  });

  it("should get all invoices", async () => {
    const res = await request(app).get("/api/invoices");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("should get revenue", async () => {
    const res = await request(app).get("/api/invoices/revenue");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
