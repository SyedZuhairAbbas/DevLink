import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
    return (
        <Link to={`/project/${project._id}`}>
            <div className="border border-[#636B2F] rounded-xl p-5 bg-[#3D4127]
                                hover:shadow-lg hover:shadow-[#636B2F]/30 transition">

            <h1 className="text-xl font-bold text-[#D4DE95] mb-1">
                {project.title}
            </h1>

            <p className="text-[#BAC095] text-sm mb-3">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
                {project.techStack.map(tech => (
                <span key={tech} className="text-xs bg-[#636B2F]/40 text-[#D4DE95] px-2 py-1 rounded-full">
                    {tech}
                </span>
                ))}
            </div>

            <div
                className="flex gap-3 text-sm text-[#D4DE95] mb-3 underline "
                onClick={(e) => e.stopPropagation()}>

                <a href={project.githubUrl} target="_blank">GitHub</a>
                <a href={project.liveUrl} target="_blank">Live</a>
            </div>

            <img
                src={project.imageUrl}
                alt="img"
                className="w-full h-40 object-cover rounded-lg mb-3"
                onError={(e) => e.target.style.display = 'none'}
            />

            <div className="flex justify-between items-center text-sm text-[#BAC095]">
                <span>{project.author}</span>
                <span>❤ {project.likes}</span>
            </div>
            </div>
        </Link>
    )
}