const router = require('express').Router();
const ctrl = require('../controllers/systems.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.use(authMiddleware);
router.get('/access', ctrl.getAccessControl);
router.get('/hvac', ctrl.getHVAC);
router.get('/electrical', ctrl.getElectrical);
router.get('/parking', ctrl.getParking);
router.get('/spaces', ctrl.getSpacesReservations);

module.exports = router;
