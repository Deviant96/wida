import { Request, Response } from "express";
import InvoiceModel from "../models/invoiceModel";

export const createInvoice = async (req: Request, res: Response) => {
  const invoice = req.body;
  InvoiceModel.create(invoice, (err, results) => {
    if (err) {
      return res.status(500).send("Error creating invoice");
    }
    res.status(201).send({ id: results.insertId, ...invoice });
  });
};

export const getAllInvoices = (req: Request, res: Response) => {
  InvoiceModel.getAll((err, results) => {
    if (err) {
      return res.status(500).send("Error fetching invoices");
    }
    res.send(results);
  });
};

export const getRevenue = (req: Request, res: Response) => {
  InvoiceModel.getRevenue((err, results) => {
    if (err) {
      return res.status(500).send("Error fetching revenue data");
    }
    res.send(results);
  });
};
