const pool = require('../../db');
const query = require('./query');

const getCustomers = (req, res) => {
    pool.query(query.getCustomers, (error, result) =>{
        if (error) throw error;
        res.status(200).json(result.rows);
    });
};

const getCustomersByCustomerID = (req, res) => {
    const CustomerID = req.params.CustomerID; // Use the string directly
    console.log('CustomerID:', CustomerID);

    console.log('Query:', query.getCustomersByCustomerID);
    if (!query.getCustomersByCustomerID) {
        console.error('Query is undefined');
        res.status(500).json({ error: 'Internal Server Error: Query is undefined' });
        return;
    }

    pool.query(query.getCustomersByCustomerID, [CustomerID], (error, result) => {
        if (error) {
            console.error('Error executing query', error.stack);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json(result.rows);
    });
};

const addCustomers = (req, res) => {
    const { CustomerID, CustomerName, Phone, Email } = req.body;
    if (!CustomerID) {
        return res.status(400).json({ error: "CustomerID is required" });
    }
    
    // Check if email exists
    pool.query(query.checkEmailExists, [Email], (error, result) => {
        if (error) {
            // Handle query error
            console.error("Error checking email existence:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (result.rows.length) {
            // Email already exists
            return res.status(400).json({ error: "Email already exists" });
        }

        // Add customer if email doesn't exist
        pool.query(query.addCustomers, [CustomerID, CustomerName, Phone, Email], (error, result) => {
            if (error) {
                // Handle query error
                console.error("Error adding customer:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(201).json({ message: "Customer created successfully" });
        });
    });
};

const removeCustomers = (req, res) => {
    const CustomerID = req.params.CustomerID;
    console.log('CustomerID:', CustomerID);

    if (!query.getCustomersByCustomerID) {
        console.error('Query is undefined');
        res.status(500).json({ error: 'Internal Server Error: Query is undefined' });
        return;
    }

    pool.query(query.getCustomersByCustomerID, [CustomerID], (error, result) => {
        if (error) {
            console.error('Error executing query', error.stack);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (result.rowCount === 0) {
            res.status(404).send("Customer does not exist in the database, could not remove.");
            return;
        }
        pool.query(query.removeCustomers, [CustomerID], (error, result) => {
            if (error) {
                console.error('Error removing customer:', error.stack);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.status(200).send("Customer removed successfully.");
        });
    });
};

const updateCustomers = (req, res) => {
    const CustomerID = req.params.CustomerID;
    console.log('CustomerID:', CustomerID);
    const { CustomerName } = req.body;

    console.log('Query:', query.getCustomers);
    if (!query.getCustomers) {
        console.error('Query is undefined');
        res.status(500).json({ error: 'Internal Server Error: Query is undefined' });
        return;
    }
    pool.query(query.getCustomers, [CustomerID], (error, result) => {
        if (error) {
            console.error('Error executing query:', error.stack);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (!result.rows.length) {
            res.status(404).send("Customer does not exist in the database.");
            return;
        }
        console.log('Query:', query.updateCustomers);
        if (!query.updateCustomers) {
            console.error('Query is undefined');
            res.status(500).json({ error: 'Internal Server Error: Query is undefined' });
            return;
        }

        pool.query(query.updateCustomers, [CustomerName, CustomerID], (error, result) => {
            if (error) {
                console.error('Error updating customer:', error.stack);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.status(200).send("Customer updated successfully.");
        });
    });
};


module.exports = {
    getCustomers,
    getCustomersByCustomerID,
    addCustomers,
    removeCustomers,
    updateCustomers,
};