import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="bg-[#3D4127] px-8 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-[#D4DE95]">
                DevLink
            </Link>
            <Link
                to="/add-project"
                className="bg-[#D4DE95] text-[#1a1d0f] font-bold px-4 py-2 rounded-lg transition-all duration-200 hover:bg-[#636B2F]/70 hover:text-[#D4DE95] hover:scale-105"
            >
                + Add Project
            </Link>
        </nav>
    )
}