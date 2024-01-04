const { BASE_URL } = require("./base_url");
const { commonApI } = require("./commonAPI");

export const registerAPI = async  (user) =>{
    return await commonApI("post",`${BASE_URL}/users/register`,user,"")
}

export const loginAPI = async (user) =>{
    return await commonApI("post",`${BASE_URL}/users/login`,user,"")
}


export const addProjectAPI = async (reqBody,reqHeader) =>{
    return await commonApI("post",`${BASE_URL}/project/add`,reqBody,reqHeader)
}

// get home projects api call   
export const getHomeProjectAPI = async () =>{
    return await commonApI("get",`${BASE_URL}/projects/home`,"","")
}
// get all projects api call   
export const getAllProjectAPI = async (searchQuery,reqHeader) =>{
    return await commonApI("get",`${BASE_URL}/projects/all/?search=${searchQuery}`,"",reqHeader)
}

// get user projects
export const getUserProjectAPI = async(reqHeader)=>{
    return await commonApI("get",`${BASE_URL}/user/project`,"",reqHeader)
}
// deleteuser projects
export const deleteUserProjectAPI = async(id,reqHeader)=>{
    return await commonApI("delete",`${BASE_URL}/user/project/${id}`,{},reqHeader)
}

// deleteuser projects
export const editUserProjectAPI = async(id,reqBody,reqHeader)=>{
    return await commonApI("put",`${BASE_URL}/user/editUserProject/${id}`,reqBody,reqHeader)
}