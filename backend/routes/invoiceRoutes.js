const express = require("express");

module.exports = (invoices) => {
  const router = express.Router();

  // Create Invoice
  router.post("/", (req, res) => {
    const invoice = {
      id: invoices.length + 1,
      ...req.body,
      createdAt: new Date()
    };
    invoices.push(invoice);
    res.json(invoice);
  });

  // Get all Invoices
  router.get("/", (req, res) => {
    res.json(invoices);
  });

  // Delete Invoice
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const invoiceIndex = invoices.findIndex(invoice => invoice.id === parseInt(id));
    
    if (invoiceIndex === -1) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    invoices.splice(invoiceIndex, 1); // Remove the invoice from the array
    res.status(204).send(); // No content
  });

  return router;
};
