const express = require("express");
const cors = require("cors");
const invoiceRoutes = require("./routes/invoiceRoutes");

const app = express();
app.use(cors({
  origin: "https://invoice-gen-mocha.vercel.app"
}));
app.use(express.json());

let invoices = []; // In-memory storage for invoices

app.use("/api/invoices", invoiceRoutes(invoices)); // Pass the invoices array to the routes

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
