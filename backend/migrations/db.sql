CREATE TABLE invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    customerName VARCHAR(255),
    salespersonName VARCHAR(255),
    notes TEXT,
    totalAmount DECIMAL(10, 2)
);