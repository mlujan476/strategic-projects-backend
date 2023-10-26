interface ICreateProjectPayload {
    title: string
    bannerUrl: string
    description: string
    goals: string
    dataDashboardPaths: string[]
    partnerContent: string[]
    resources: string[]

}

const ProjectAPI = () => {

    const createProject = async (payload: ICreateProjectPayload) => {

        console.log('PAYLOAD: ', payload)
        console.log("JSON: ", JSON.stringify(payload))
        
        const response = await fetch("http://localhost:8080/project/create", {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
              'Content-Type': 'application/json'
            }
            
          })
         
      
          const resData = await response.json();
          console.log('=====>>> CREATE_PROJECT RESPONSE: ' + JSON.stringify(resData))
          if (!response.ok) {
            throw new Error(resData.message || 'Adding the goal failed.');
          }
      
          return resData;
    }

    const getProjects = async () => {
    
        const response = await fetch('http://localhost:8080/project')
        const resData = await response.json()
        
    
        if(!response.ok){
          throw new Error(resData.message || 'Error getProjects()')
        }
    
        console.log("data: " + JSON.stringify(resData))
     
        return resData
    }





    return {
        createProject,
        getProjects
    }
}

export default ProjectAPI