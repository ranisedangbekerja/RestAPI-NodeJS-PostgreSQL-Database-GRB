const {Router} = require("express");
const controller = require('./controller');

const router = Router();

router.get("/", controller.getCustomers);
router.post("/", controller.addCustomers);
router.get("/:CustomerID", controller.getCustomersByCustomerID);
router.put("/:CustomerID", controller.updateCustomers);
router.delete("/:CustomerID", controller.removeCustomers);

module.exports = router;