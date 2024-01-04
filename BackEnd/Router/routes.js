// import express
const express = require('express');


// create router object of express to define routes
const router = new express.Router();

// import register from userController
const {register, login} = require('../controllers/userController');
const { addProjects, getAllProjects, allUsersProjects, getHomeProject, deleteUserProject, editUserProject } = require('../controllers/projectController');
const jwtMiddleware = require('../Middlewares/jwtMiddleware');
const { multerConfig } = require('../Middlewares/multerMiddleware');

// using router object to define routes(paths)
// register api call 
router.post('/users/register', register)
router.post('/users/login', login)

// add projects routes
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),addProjects)

// get all projects
router.get('/user/project',jwtMiddleware,allUsersProjects)
// get home projects
router.get('/projects/all',jwtMiddleware,getAllProjects)
// get home projects
router.get('/projects/home',getHomeProject)
// delete user project
router.delete('/user/project/:id',jwtMiddleware,deleteUserProject)
// edit user project
router.put('/user/editUserProject/:id',jwtMiddleware,editUserProject)

module.exports = router;