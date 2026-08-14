import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'

export default function ProjectDetail (){
    const {id} = useParams()
    const [details , setDetails] = useState(null)
    const [isDetails , setIsDetails] = useState(false)
    const [comments , setComment] = useState(null)
    const [showToast, setShowToast] = useState(false)
    const [searchTerm , setSearchTerm] = useState({
        author: '' ,
        text: ''
    })

    useEffect( () => {
        fetch(`http://localhost:3000/projects/${id}`)
        .then(res => res.json())
        .then( data => {
            setDetails(data)
            setIsDetails(true)
        })
    } , [id])

    useEffect( () => {
        fetch(`http://localhost:3000/comments/project/${id}`)
        .then(res => res.json())
        .then( data => {
            setComment(data)
        })
    } , [id])

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...searchTerm, project: id })
        })

        if (!response.ok) {
            throw new Error('Network Response was not ok')
        }

        const data = await response.json()
        setComment([...comments, data.comment])
        setShowToast(true)
        setTimeout(() => setShowToast(false), 2500)
        setSearchTerm({ author: '', text: '' })
    }


    return (
        <div className="p-8 min-h-screen bg-[#1a1d0f]">
            <Link
                to={'/'}
                className="inline-block text-[#BAC095] text-base bg-[#636B2F]/40 rounded-full px-3 py-2
                            transition-all duration-200 hover:bg-[#636B2F]/70 hover:text-[#D4DE95]
                            hover:scale-105 hover:shadow-lg hover:shadow-[#636B2F]/30 transition"
                >
                ← Back To Projects
            </Link>

            {isDetails ? (
                <div className="max-w-4xl mx-auto">

                    <img
                    src={details.imageUrl}
                    alt="img"
                    className="w-full h-64 md:h-80 object-cover rounded-xl mb-6"
                    onError={(e) => e.target.style.display = 'none'}
                    />

                    <div className="rounded-xl p-6">

                        <h1 className="text-3xl font-bold text-[#D4DE95] mb-2">
                            {details.title}
                        </h1>

                        <p className="text-[#BAC095] text-base mb-4">
                            {details.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {details.techStack.map(tech => (
                            <span key={tech}
                                className="text-xs bg-[#636B2F]/40 text-[#D4DE95] px-2 py-1 rounded-full">
                                {tech}
                            </span>
                            ))}
                        </div>

                        <div className="flex gap-4 text-sm text-[#D4DE95] mb-4 underline">
                            <a href={details.githubUrl} target="_blank">GitHub</a>
                            <a href={details.liveUrl} target="_blank">Live</a>
                        </div>

                        <div className="flex justify-between items-center text-sm text-[#BAC095] border-t border-[#636B2F] pt-4">
                            <span>By {details.author}</span>
                            <span>❤ {details.likes}</span>
                        </div>

                    </div>

                    <div className="mt-8 border border-[#636B2F] rounded-xl p-5">
                        <h2 className="text-xl font-bold text-[#D4DE95] mb-3">Comments</h2>

                        <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
                            <input
                                name="author"
                                value={searchTerm.author}
                                onChange={(e) => setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value })}
                                placeholder="Author"
                                className="flex-1 bg-[#1a1d0f] text-[#D4DE95] placeholder-gray-500 border border-[#636B2F] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4DE95]"
                            />
                            <input
                                name="text"
                                value={searchTerm.text}
                                onChange={(e) => setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value })}
                                placeholder="Comment"
                                className="flex-1 bg-[#1a1d0f] text-[#D4DE95] placeholder-gray-500 border border-[#636B2F] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4DE95]"
                            />
                            <button type="submit"
                                className="cursor-pointer bg-[#D4DE95] text-[#1a1d0f] font-bold px-6 py-2
                                rounded-lg transition-all duration-200 transition-all duration-200
                                hover:bg-[#636B2F]/70 hover:text-[#D4DE95] hover:scale-105 hover:shadow-lg hover:shadow-[#636B2F]/30 transition"
                                >
                                Submit
                            </button>
                        </form>

                        {comments && comments.map(comment => (
                            <div key={comment._id} className="mb-3 border border-[#636B2F] rounded-xl p-5">
                            <h3 className="font-semibold text-[#D4DE95] underline">{comment.author}</h3>
                            <p className="text-[#BAC095]">{comment.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
            <p className="text-[#D4DE95]">Loading Details</p>
            )}

            {showToast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#636B2F] text-[#D4DE95] px-6 py-3 rounded-full shadow-lg">
                    Comment posted!
                </div>
            )}
        </div>
    )
}