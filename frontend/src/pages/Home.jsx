import  {useState , useEffect } from  'react'
import ProjectCard from '../components/ProjectCard'

export default function Home(){
    const [projects , setProjects ] = useState(null)
    const [isProject , setIsProjects ] = useState(false)

    useEffect( () => {
        fetch('http://localhost:3000/projects/')
        .then(res => res.json())
        .then(data => {
            setProjects(data)
            setIsProjects(true)
        })
    } , [])


    return (
        <div  className='p-8 min-h-screen bg-[#1a1d0f]'>
            <div >
                {isProject ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
                        {projects.map(  project => (
                            <div key={project._id}>
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p> Loading Projects ...</p>
                )}
            </div>
        </div>
    )
}