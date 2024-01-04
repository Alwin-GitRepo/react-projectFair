const Projects = require('../Models/projectSchema');

// add projects
exports.addProjects = async(req,res)=>{
    console.log("Insisde the add project");
    const userId = req.payload
    console.log("User-id:"+userId);
    // get Image Name
    const projectImage = req.file.filename

    // get add projects details
    const  {title,language,github,linkedin,overview} = req.body
    console.log("title: " + title,"language:"+language,"github:"+github,"linkedin:"+linkedin,"overview:"+overview,"project:"+projectImage);

    // logic of adding project details
    try{
        const existingProject = await Projects.findOne({github:github})
        if(existingProject){
            res.status(406).json("project already exists ")
        }else{
            // there is no existing project
            const newProject = new Projects({title,language,github,linkedin,overview,projectImage,userId})
            // to save new project details in mongo db
            await newProject.save()
            // send response to the client
            res.status(200).json(newProject)
        }

    }catch(err){
        res.status(401).json("Add project request failed")
    }
}

// get user projects 
exports.allUsersProjects = async(req,res) => {
    const userId = req.payload
    try {
        const userProjects = await Projects.find({userId})
        res.status(200).json(userProjects)
    } catch (error) {
        res.status(401).json({"Request failed": +error})
    }
}

// get all projects
exports.getAllProjects = async(req,res)=>{
    const searchKey = req.query.search

    const query = {
        $or:[
            {language:{
                $regex:searchKey,
                $options:"i"
            }},
            {title:{
                $regex:searchKey,
                $options:"i"
            }}
        ]
        
    }
    try{
        const allProjects = await Projects.find(query)
        res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json({"Request failed": +err})
    }
}

// home project
exports.getHomeProject = async(req,res)=>{
    try{
        const homeProject = await Projects.find().limit(3)
        res.status(200).json(homeProject)
    }catch(err){
        res.status(401).json({"Request failed": +err})
    }
}

exports.deleteUserProject = async (req, res) => {
    const { id } = req.params; // Destructure 'id' from req.params
    console.log(id, '--------------------------------');
    try {
        const deleted = await Projects.findByIdAndDelete(id);
        if (deleted) {
            res.status(200).json("Deleted Successfully");
        } else {
            return res.status(404).json("Project does not exist");
        }
    } catch (error) { 
        res.status(500).json({ "Internal Server Error": error.message });
    }
};


exports.editUserProject = async (req, res) => {
    try {
        const id = req.params.id;
        const {  title, linkedin, github,language,overview } = req.body;
        console.log(id);

        if (!id) {
            return res.status(400).json("ID is required");
        }

        const edited = await Projects.findByIdAndUpdate(
            id,
            { $set: { title, linkedin, github,language,overview } },
            { new: true }
        );

        if (edited) {
            res.status(200).json(edited);
        } else {
            res.status(404).json("Cannot edit project");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ "Internal Server Error": error.message });
    }
};





module.exports