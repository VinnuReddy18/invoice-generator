# Invoice Generator

A simple and efficient Invoice Generator application built with React for the frontend and Express for the backend. This application allows users to create, view, and delete invoices with a clean and minimal user interface.

## Features

- Create invoices with customer details and product information.
- View a list of past invoices.
- Download invoices as PDF files.
- Delete invoices as needed.

## Tech Stack

- **Frontend**: React, Axios
- **Backend**: Express, CORS
- **PDF Generation**: jsPDF

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/invoice-generator.git
   cd invoice-generator
   ```

2. Navigate to the frontend directory and install dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Navigate to the backend directory and install dependencies:

   ```bash
   cd backend
   npm install
   ```

### Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

   The backend will run on `http://localhost:5000`.

2. Start the frontend application:

   ```bash
   cd frontend
   npm start
   ```

   The frontend will run on `http://localhost:3000`.

### Usage

- Open your browser and navigate to `http://localhost:3000`.
- Fill in the customer details and product information to create an invoice.
- Click on "Download PDF" to save the invoice.
- View past invoices in the table and delete any invoice if needed.

### Deployment

To deploy the application, you can use platforms like Vercel for the frontend and Heroku or Vercel for the backend. Ensure that the backend API URL is correctly set in the frontend code.

---
