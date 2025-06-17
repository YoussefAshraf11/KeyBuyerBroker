/* ---------------- main page ---------------- */
import HeroSection from "../../components/HeroSection/herosection";
import ProjectCard from "../../components/ProjectCard/projectcard";
import PropertyCard from "../../components/PropertyCard/propertycard";
import DeveloperLogo from "../../components/DeveloperLogo/developerlogo";
import { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects, getProperties } from "../../network/project";
import { setProjectsList, setPropertiesList, setLoading, setProjectError } from "../../store/projectSlice";
import { useNavigate } from "react-router-dom";

/* ---  A.  Real-Estate Project thumbnails  --- */
import PalmHillsProj from "../../assets/Real Estate Projects/Palm Hills.svg";
import TheOneProj from "../../assets/Real Estate Projects/The One.svg";
import JewarProj from "../../assets/Real Estate Projects/Jewar.svg";

/* ---  B.  Residential Property icons  --- */
import Apartments from "../../assets/Residental Properties/Apartments.svg";
import Chalet from "../../assets/Residental Properties/Chalet.svg";
import Duplex from "../../assets/Residental Properties/Duplex.svg";
import SVillas from "../../assets/Residental Properties/S Villas.svg";
import StandAlone from "../../assets/Residental Properties/Stand Alone Villas.svg";
import TwinVillas from "../../assets/Residental Properties/Twin Villas.svg";

/* ---  C.  Developer logos  --- */
import AlexWest from "../../assets/Real Estate Developers in Alexandria/Alex West.jpeg";
import Alforat from "../../assets/Real Estate Developers in Alexandria/Alforat Development.svg";
import ElSalam from "../../assets/Real Estate Developers in Alexandria/El Salam Interbuild.svg";
import PalmHillsDev from "../../assets/Real Estate Developers in Alexandria/Palm Hills.svg";
import SaudiEgyptian from "../../assets/Real Estate Developers in Alexandria/Saudi Egyptian.svg";
import ValoreDev from "../../assets/Real Estate Developers in Alexandria/Valore Development.svg";
import ValoreProj from "../../assets/Real Estate Projects/Valore.svg";
import RoyalZoneProj from "../../assets/Real Estate Projects/Royal Zone Villas.svg";
import AlexWestProj from "../../assets/Real Estate Projects/Alex West.svg";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects);
  const properties = useSelector((state) => state.project.properties);
  const loading = useSelector((state) => state.project.loading);

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

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        dispatch(setLoading(true));
        const response = await getProperties({ all: true });
        dispatch(setPropertiesList(response.data.data.properties));
      } catch (error) {
        dispatch(setProjectError(error.message));
        console.error('Error fetching properties:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProperties();
  }, [dispatch]);


  const developers = [
    { img: PalmHillsDev, name: "Palm Hills Developments" },
    { img: Alforat, name: "Alforat Development" },
    { img: ValoreDev, name: "Valore Development" },
    { img: SaudiEgyptian, name: "Saudi-Egyptian Developers" },
    { img: ElSalam, name: "El Salam Interbuild" },
    { img: AlexWest, name: "Alex West" },
  ];
  const railRef = useRef(null);
  const [fadeL, setFadeL] = useState(false);
  const [fadeR, setFadeR] = useState(true);

  const wheelToScroll = (e) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
      railRef.current.scrollLeft += e.deltaY;
    }
  };

  const reportEdges = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setFadeL(el.scrollLeft > 0);
    setFadeR(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    reportEdges();
    el.addEventListener("scroll", reportEdges, { passive: true });
    window.addEventListener("resize", reportEdges);
    return () => {
      el.removeEventListener("scroll", reportEdges);
      window.removeEventListener("resize", reportEdges);
    };
  }, [reportEdges]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#002349] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen">
        <HeroSection />

        {/* ---------- intro ---------- */}
        <section className="bg-gray-100">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-primary">
                The Best Real Estate Website in Egypt
              </h2>

              <p className="text-base text-xl text-primary font-medium">
                Welcome to KeyFinder — Your Exclusive Real Estate Broker Hub.
              </p>
              <p className="text-base text-xl text-primary font-medium">
                At KeyFinder, we are redefining the way buyers and sellers
                connect in the real estate market.
              </p>
              <p className="text-base text-xl text-primary font-medium">
                As a leading brokerage company, we collect and list all the most
                exciting and sought-after real estate projects in our region,
                offering buyers exclusive access to a wide range of properties
                through our platform.
              </p>
              <p className="text-base text-xl text-primary font-medium">
                With a focus on providing personalized service and transparent
                processes, we make buying a home easier, faster, and more
                convenient.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Projects ---------- */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-primary font-semibold mb-6 text-lg sm:text-xl md:text-2xl">
            Real Estate Projects in Alexandria
          </h2>

          {/* grid → 3 columns on md+  */}
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 place-items-center">
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => navigate(`/project-details/${project._id}`)}
                className="w-full cursor-pointer"
              >
                <ProjectCard 
                  key={project._id} 
                  name={project.name}
                  img={project.image
                  } // Assuming you have an images array in your project model
                />
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Residential ---------- */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-primary font-semibold mb-6 text-lg sm:text-xl md:text-2xl">
            Residential Properties in Alexandria
          </h2>

          <div className="relative mt-10">
            <div
              ref={railRef}
              onWheel={wheelToScroll}
              className="flex gap-4 overflow-x-auto no-scrollbar pb-2
               before:pointer-events-none before:absolute before:inset-y-0 before:left-0
               before:w-12 before:bg-gradient-to-r before:from-white before:to-transparent
               after:pointer-events-none after:absolute after:inset-y-0 after:right-0
               after:w-12 after:bg-gradient-to-l after:from-white after:to-transparent"
              style={{
                "--tw-before-opacity": fadeL ? 1 : 0,
                "--tw-after-opacity": fadeR ? 1 : 0,
              }}
            >
              {properties.map((property) => (
                <div key={property._id} className="shrink-0 w-[320px]">
                  <PropertyCard 
                    name={property.title}
                    img={property.images?.[0] || ''}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Developers ---------- */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-primary font-semibold mb-6 text-lg sm:text-xl md:text-2xl">
            Real Estate Developers in Alexandria
          </h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {developers.map((d) => (
              <DeveloperLogo key={d.name} {...d} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
