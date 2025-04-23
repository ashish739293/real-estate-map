export default function ProjectCard({ project }) {
    return (
      <div className="bg-white backdrop-blur-sm bg-opacity-40 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-1">
        {/* <img src={project.image} alt={project.name} className="w-full h-40 object-cover rounded-xl mb-4" /> */}
        <h3 className="text-xl font-bold text-indigo-800 truncate">{project.name}</h3>
        <p className="text-gray-600 truncate">{project.location}</p>
        <p className="text-green-600 font-semibold mt-1">{project.priceRange}</p>
        <p className="text-sm text-gray-500 italic mt-1">By {project.builder}</p>
      </div>
    );
  }