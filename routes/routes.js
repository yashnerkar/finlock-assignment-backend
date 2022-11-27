const router = require("express").Router();
const { login, logout, auth, getUsers, addUsers, getOrganizations, addOrganizations, getGroups, addGroups } = require("../controllers/controller");


router.post('/', login);
router.get('/logout', logout);
router.get('/auth', auth);
router.get('/users', getUsers);
router.post('/users', addUsers);
router.get('/organizations', getOrganizations);
router.post('/organizations', addOrganizations);
router.get('/groups', getGroups);
router.post('/groups', addGroups);


module.exports = router;