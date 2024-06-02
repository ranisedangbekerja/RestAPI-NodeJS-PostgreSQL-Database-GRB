const getCustomers = 'SELECT * FROM "Customers"'; // WHERE "CustomerID" = $1
const getCustomersByCustomerID = 'SELECT * FROM "Customers" WHERE "CustomerID" = $1';
const checkEmailExists = 'SELECT s FROM "Customers" s WHERE s."Email" = $1';
const addCustomers = 'INSERT INTO "Customers" ("CustomerID", "CustomerName", "Phone", "Email") VALUES ($1, $2, $3, $4)';
const removeCustomers = 'DELETE FROM "Customers" WHERE "CustomerID" = $1'
const updateCustomers = 'UPDATE "Customers" SET "CustomerName" = $1 WHERE "CustomerID" = $2';

module.exports = {
    getCustomers,
    getCustomersByCustomerID,
    checkEmailExists,
    addCustomers,
    removeCustomers,
    updateCustomers,
};
