import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AddProject(){
    
    const navigate = useNavigate()
    const [searchTerm , setSearchTerm] = useState({
        title: '' ,
        description: '' ,
        techStack: '',
        githubUrl: '' ,
        liveUrl: '' ,
        imageUrl: '' ,
        author: ''
    })

    async function handleSubmit(e){
        e.preventDefault()
        const techArray = searchTerm.techStack.split(',').map(tech => tech.trim())

        const res = await fetch('http://localhost:3000/projects' , {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...searchTerm , techStack: techArray})
        })

        if(!res.ok) throw new Error("Network Response was not Ok")
        
        const data = await res.json()
        navigate(`/project/${data.project._id}`)
    }


    return  (
        <div className="p-8 bg-[#1a1d0f]">
            <div className="p-8 min-h-screen bg-[#1a1d0f] flex justify-center items-start">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mt-10">
                    <h1 className="text-2xl font-bold text-[#D4DE95] mb-2">Add New Project</h1>
                    <input
                        name="title"
                        value={searchTerm.title}
                        onChange={(e) => setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value })}
                        placeholder="Title"
                        className="w-full bg-[#1a1d0f] text-[#D4DE95] placeholder-gray-500 border border-[#636B2F] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4DE95]"
                    />
                    <input
                        name="description"
                        value={searchTerm.description}
                        onChange={(e) => setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value })}
                        placeholder="Description"
                        className="w-full bg-[#1a1d0f] text-[#D4DE95] placeholder-gray-500 border border-[#636B2F] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4DE95]"
                    />
                    <input
                        name="techStack"
                        value={searchTerm.techStack}
                        onChange={(e) => setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value })}
                        placeholder="Tech Stack"
                        className="w-full bg-[#1a1d0f] text-[#D4DE95] placeholder-gray-500 border border-[#636B2F] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4DE95]"
                    />
                    <input
                        name="githubUrl"
                        value={searchTerm.githubUrl}
                        onChange={(e) => setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value })}
                        placeholder="GitHub Url"
                        className="w-full bg-[#1a1d0f] text-[#D4DE95] placeholder-gray-500 border border-[#636B2F] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4DE95]"
                    />
                    <input
                        name="liveUrl"
                        value={searchTerm.liveUrl}
                        onChange={(e) => setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value })}
                        placeholder="Live Url"
                        className="w-full bg-[#1a1d0f] text-[#D4DE95] placeholder-gray-500 border border-[#636B2F] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4DE95]"
                    />
                    <input
                        name="imageUrl"
                        value={searchTerm.imageUrl}
                        onChange={(e) => setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value })}
                        placeholder="Image Url"
                        className="w-full bg-[#1a1d0f] text-[#D4DE95] placeholder-gray-500 border border-[#636B2F] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4DE95]"
                    />
                    <input
                        name="author"
                        value={searchTerm.author}
                        onChange={(e) => setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value })}
                        placeholder="Author"
                        className="w-full bg-[#1a1d0f] text-[#D4DE95] placeholder-gray-500 border border-[#636B2F] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4DE95]"
                    />
                    <button
                        type="submit"
                        className="cursor-pointer bg-[#D4DE95] text-[#1a1d0f] font-bold px-6 py-2
                        rounded-lg transition-all duration-200 hover:bg-[#636B2F]/70 hover:text-[#D4DE95]
                        hover:scale-105">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}