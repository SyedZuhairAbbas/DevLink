import  {useState , useEffect } from  'react'

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
        <div  className='p-8'>
            {isProject ? (
                <div>
                    {projects.map(  project => (
                        <div key={project._id}>
                            <h1>{project.title}</h1>
                        </div>
                    ))}
                </div>
            ) : (
                <p> Loading Projects ...</p>
            )}
        </div>
    )
}