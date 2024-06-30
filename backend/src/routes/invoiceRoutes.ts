import express from "express";
import {
  createInvoice,
  getAllInvoices,
  getRevenue,
} from "../controllers/invoiceController";

const router = express.Router();

router.post("/invoices", createInvoice);
router.get("/invoices", getAllInvoices);
router.get("/invoices/revenue", getRevenue);

export default router;
