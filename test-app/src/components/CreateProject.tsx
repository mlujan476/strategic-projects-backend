import { useRef, useState } from 'react'
import ProjectAPI from '../api/ProjectAPI'



const CreateProject = () => {

  const projectApi = ProjectAPI()


  const [dataDashboardPaths, setDataDashboardPaths] = useState<string[]>([])
  const [partnerContent, setPartnerContent] = useState<string[]>([])
  const [resources, setResources] = useState<string[]>([])
  const [teamMembers, setTeamMembers] = useState<string[]>([])

  const titleRef = useRef(null)
  const bannerUrlRef = useRef(null)
  const descRef = useRef(null)

  const goalRef = useRef(null)

  const [dashDataUrlState, setDashDataUrlState] = useState<string>('')
  const [partnerContentUrlState, setPartnerContentUrlState] = useState<string>('')
  const [resourceState, setResourceState] = useState<string>('')
  const [teamMemberState, setTeamMemberState] = useState<string>('')

  interface ICreateProjectPayload {
    title: string
    bannerUrl: string
    description: string
    goals: string
    dataDashboardPaths: string[]
    partnerContent: string[]
    resources: string[]
    teamMembers: string[]

}

  const handleSubmit = () => {
    const object: ICreateProjectPayload = {
      title: titleRef.current ? titleRef.current : "",
      bannerUrl: bannerUrlRef.current ? bannerUrlRef.current : "",
      description: descRef.current ? descRef.current : "",
      goals: goalRef.current ? goalRef.current : "",
      dataDashboardPaths,
      partnerContent,
      resources,
      teamMembers
    }

    console.log("handleSubmit() Object Sent: ", object)

    projectApi.createProject(object)
    .then((res: any) => {
      console.log("createProject() response: ", res)
      setDataDashboardPaths([])
      setPartnerContent([])
      setResources([])
      setTeamMembers([])

      setDashDataUrlState('')
      setPartnerContentUrlState('')
      setResourceState('')
      setTeamMemberState('')

    })
    .catch((err: any) => console.error("handleSubmit() -> projectApi.createProject() Response Error: ", err))
  }

  const handlAppendItem = (cat: string) => {
    console.log(cat)
    switch(cat){
      /* case "GOAL":
        setGoals([...goals, goalRef.current.value])
        goalRef.current = ''
        break; */

      case "DASHBOARD_DATA_IMAGE":
        setDataDashboardPaths([...dataDashboardPaths, dashDataUrlState])
        setDashDataUrlState('')
        break;

      case "PARTNER_CONTENT":
        setPartnerContent([...partnerContent, partnerContentUrlState])
        setPartnerContentUrlState('')
        break;

      case "RESOURCE":
        setResources([...resources, resourceState])
        setResourceState('')
        break;

      case "TEAM_MEMBER":
        setTeamMembers([...teamMembers, teamMemberState])
        setTeamMemberState('')
        break;

      default:
        break;

    }
  }


  const handleChange = (e: any, value: string) => {
    console.log(value)
    switch(value){
      /* case "GOAL":
        setGoals([...goals, goalRef.current.value])
        goalRef.current = ''
        break; */

      case "DASHBOARD_DATA_IMAGE":
        setDashDataUrlState(e.target.value)
        break;

      case "PARTNER_CONTENT":
        setPartnerContentUrlState(e.target.value)
        break;

      case "RESOURCE":
        setResourceState(e.target.value)
        break;

      case "TEAM_MEMBER":
        setTeamMemberState(e.target.value)
        break;

      default:
        break;

    }
  }


  const handleGetProjects = () => {
    projectApi.getProjects()
    .then((res: any) => {
      console.log("handleGetProjects() response: ", res.data)
    })
    .catch((err: any) => console.error("handleGetProjects() Response Error: ", err))
  }

  return (
    <div style={{ 
      display: "flex",
      flexDirection: "column",
      alignItems:"baseline",
      width: "300px"
    }}>
      <label>Title</label>
      <input ref={titleRef} style={{ width: "100%", height: "25px", padding: "5px" }} type="text" />

      <label>Banner URL</label>
      <input ref={bannerUrlRef} style={{ width: "100%", height: "25px", padding: "5px" }} type="text" />

      <label>Description</label>
      <textarea ref={descRef} style={{ width: "100%", height: "250px", padding: "5px" }} />

      <label>Goals</label>
      <textarea ref={goalRef} style={{ width: "100%", height: "250px", padding: "5px" }}/>
     

      <label>Dashboard Data Image URLs</label>
      <input  onChange={(e: any) => handleChange(e, "DASHBOARD_DATA_IMAGE")} value={dashDataUrlState} style={{ width: "100%", height: "25px", padding: "5px" }} type="text" />
      <button style={{marginBottom: "15px", backgroundColor:"#1e00c8"}} onClick={() => handlAppendItem("DASHBOARD_DATA_IMAGE")}>Add Dashboard Image</button>

      <label>Partner Content/URLs</label>
      <input  onChange={(e: any) => handleChange(e, "PARTNER_CONTENT")} value={partnerContentUrlState}  style={{ width: "100%", height: "25px", padding: "5px" }} type="text" />
      <button style={{marginBottom: "15px", backgroundColor:"#1e00c8"}} onClick={() => handlAppendItem("PARTNER_CONTENT")}>Add Partner Content</button>

      <label>Resources</label>
      <input  onChange={(e: any) => handleChange(e, "RESOURCE")} value={resourceState}  style={{ width: "100%", height: "25px", padding: "5px" }} type="text" />
      <button style={{marginBottom: "15px", backgroundColor: "#1e00c8"}} onClick={() => handlAppendItem("RESOURCE")}>Add Resource</button>

      <label>Team Members</label>
      <input onChange={(e: any) => handleChange(e,"TEAM_MEMBER")} value={teamMemberState}  style={{ width: "100%", height: "25px", padding: "5px" }} type="text" />
      <button style={{marginBottom: "15px", backgroundColor: "#1e00c8"}} onClick={() => handlAppendItem("TEAM_MEMBER")}>Add Team Member</button>

      <button onClick={handleSubmit} style={{color: "#f8f8f8", backgroundColor: "#545454"}}>Submit</button>
      <button onClick={handleGetProjects} style={{color: "#f8f8f8", backgroundColor: "#008820"}}>Get All Projects</button>
    </div>
  )
}

export default CreateProject