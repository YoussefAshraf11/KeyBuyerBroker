// src/components/ProjectShowcase.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjectById } from "../../network/project";
import { setProjectDetails, setLoading, setProjectError } from "../../store/projectSlice";
import PropertyCard from "../../components/PropertyCard/propertycard";

export default function ProjectShowcase() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const projectDetails = useSelector((state) => state.project.projectDetails);
  const loading = useSelector((state) => state.project.loading);
  const [coverImageError, setCoverImageError] = useState(!projectDetails?.image);


  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!id) return;

      try {
        dispatch(setLoading(true));
        const response = await getProjectById(id);
        dispatch(setProjectDetails(response.data.data));
        setCoverImageError(!response.data.data.image);
      } catch (error) {
        dispatch(setProjectError(error.message));
        console.error('Error fetching project details:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProjectDetails();
  }, [id, dispatch]);


  const handleCoverImageError = () => {
    setCoverImageError(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#002349] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!projectDetails) {
    return (
      <div className="w-full py-10 px-4 sm:px-6 md:px-8 lg:px-0 flex justify-center items-center">
        <div className="text-xl text-[#002855]">No project details found</div>
      </div>
    );
  }

  return (
    <section className="w-full py-10 px-4 sm:px-6 md:px-8 lg:px-0">
      {/* Top: cover image + specs */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-6">
        {/* Cover Image */}
        {coverImageError ? (
          <div className="w-full md:w-1/2 lg:w-[460px] aspect-video bg-gray-200 rounded-xl shadow-lg flex items-center justify-center">
            <p className="text-gray-500 text-lg">Failed to load image</p>
          </div>
        ) : (
          <img
            src={projectDetails.image}
            alt={projectDetails.name}
            className="w-full md:w-1/2 lg:w-[460px] aspect-video object-cover rounded-xl shadow-lg"
            onError={handleCoverImageError}
          />
        )}

        {/* Specs Card */}
        <div className="w-full md:w-1/2 bg-[#002855] text-white rounded-xl p-6 sm:p-8 text-base sm:text-lg leading-relaxed shadow-lg m-auto">
          <h1 className="text-2xl font-bold mb-4">{projectDetails.name}</h1>
          <p className="text-gray-300 mb-6">{projectDetails.description}</p>
          <div className="flex flex-col gap-y-3">
            <div>
              Developer: <span className="font-normal">{projectDetails.developer}</span>
            </div>
            <div>
              Number of Properties: <span className="font-normal">{projectDetails.properties?.length || 0}</span>
            </div>
            <div>
              Created At: <span className="font-normal">{new Date(projectDetails.createdAt).toLocaleDateString()}</span>
            </div>
            <div>
              Updated At: <span className="font-normal">{new Date(projectDetails.updatedAt).toLocaleDateString()}</span>
            </div>
            <div>
              Location: <span className="font-normal">
                {projectDetails.location?.coordinates ? 
                  `${projectDetails.location.coordinates[0]}, ${projectDetails.location.coordinates[1]}` : 
                  'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Projects Section */}
      {/* <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#002855] mb-4">
          Similar Projects:
        </h2>

        <div className="flex gap-6 overflow-x-auto md:overflow-visible pb-4">
          {similarProjects.map(({ name, image }) => (
            <div
              key={name}
              className="flex flex-col items-center shrink-0 w-40 sm:w-48"
            >
              <img
                src={image}
                alt={name}
                className="w-full h-28 sm:h-32 object-cover rounded-xl shadow-md"
              />
              <span className="mt-2 font-semibold text-center text-sm sm:text-base">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div> */}

    <h2 className="text-2xl sm:text-3xl mx-6 font-bold text-[#002855] mb-4">
          Properties:
        </h2>
    <div className="flex gap-4 flex-wrap no-scrollbar p-4">
      {projectDetails?.properties?.length > 0 && projectDetails?.properties?.map((property) => (
                  <div key={property._id} className="shrink-0 w-[320px]">
                    <PropertyCard 
                      name={property.title}
                      img={property.images?.[0] || ''}
                      id={property._id}
                    />
                  </div>
        ))}
    </div>
    </section>
  );
}
