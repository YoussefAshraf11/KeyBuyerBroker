// src/components/ProjectsGrid.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../../network/project";
import { setProjectsList, setLoading, setProjectError } from "../../store/projectSlice";

export default function ProjectsGrid() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects);
  const loading = useSelector((state) => state.project.loading);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        dispatch(setLoading(true));
        const response = await getProjects();
        dispatch(setProjectsList(response.data.data));
      } catch (error) {
        dispatch(setProjectError(error.message));
        console.error('Error fetching projects:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProjects();
  }, [dispatch]);

  const handleImageError = (projectId) => {
    setImageErrors(prev => ({
      ...prev,
      [projectId]: true
    }));
  };

  if (loading) {
    return (
      <div className="w-full py-10 px-4 sm:px-6 md:px-8 lg:px-0 flex justify-center items-center">
        <div className="text-xl text-[#002855]">Loading projects...</div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#002855] mb-6 text-center">
        Real estate projects in Alexandria
      </h2>

      {projects.length === 0 ? (
        <div className="w-full py-10 px-4 sm:px-6 md:px-8 lg:px-0 flex justify-center items-center">
          <div className="text-xl text-[#002855]">No projects found</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {projects.map((project) => (
            <div
              key={project._id}
              onClick={() => navigate(`/project-details/${project._id}`)}
              className="w-full max-w-[450px] rounded-xl overflow-hidden shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              {!project.image || imageErrors[project._id] ? (
                <div className="w-full h-64 bg-[#001731] flex items-center justify-center">
                  <p className="text-white text-lg font-semibold">Image Not Available</p>
                </div>
              ) : (
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-64 object-cover"
                  onError={() => handleImageError(project._id)}
                />
              )}
              <div className="bg-[#002855] flex justify-center items-center h-20 text-white rounded-2xl text-center py-2 font-semibold">
                {project.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
