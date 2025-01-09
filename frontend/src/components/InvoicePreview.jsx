import React from "react";
import jsPDF from "jspdf";
import './InvoicePreview.css';

function InvoicePreview({ customerName, products, tax, total, onDownloadComplete }) {
  const calculateSubtotal = () => {
    return products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  };

  const subtotal = calculateSubtotal();

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Invoice", 10, 10);
    doc.setFontSize(12);
    doc.text(`Customer: ${customerName}`, 10, 20);
    
    let y = 30;
    doc.setFontSize(12);
    doc.text("Products:", 10, y);
    y += 10;

    //header for the product table
    doc.setFontSize(12);
    doc.text("Name", 10, y);
    doc.text("Quantity", 100, y);
    doc.text("Price (₹)", 150, y);
    y += 10;

    // line under the header
    doc.line(10, y, 200, y);
    y += 5;

    products.forEach((product) => {
      doc.text(product.name, 10, y);
      doc.text(product.quantity.toString(), 100, y);
      doc.text(`₹${product.price.toFixed(2)}`, 150, y);
      y += 10;
    });

    // subtotal, tax, and total
    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 10, y);
    y += 10;
    doc.text(`Tax: ₹${((subtotal * tax) / 100).toFixed(2)}`, 10, y);
    y += 10;
    doc.text(`Total: ₹${total.toFixed(2)}`, 10, y);
    
    doc.save("invoice.pdf");
    onDownloadComplete();
  };

  return (
    <div className="invoice-preview">
      <h3>Invoice Preview</h3>
      <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
      <p>Tax: ₹{((subtotal * tax) / 100).toFixed(2)}</p>
      <p>Total: ₹{total.toFixed(2)}</p>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
}

export default InvoicePreview;
