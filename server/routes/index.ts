const UsersController = require('../controllers/UsersController')
const RoomController = require('../controllers/RoomController')
const Router = require('express')
const router = new Router()

router.get('/users', UsersController.getUsers)  

router.get('/rooms', RoomController.getRooms)
router.get('/rooms/:id', RoomController.getOneRoom) 
router.post('/rooms', RoomController.createRooms)
router.put('/rooms/:id/', RoomController.updateRooms)
router.delete('/rooms/:id/', RoomController.deleteRoom)

module.exports = router