const express = require("express");
const customerRoutes = require('./source/customer/routes');
const app = express();
const port = 3002;

app.use(express.json());

app.get("/", (req, res) =>{
    res.send("Hello World!");
})

app.use('/api/v1/customers', customerRoutes);

app.listen(port, () => console.log(`Server is listening on port ${port}`));