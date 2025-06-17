import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { getMyAppointments } from "../../../network/appointment";

const formatAppointmentType = (type) => {
  switch (type) {
    case 'initial':
      return 'Initial';
    case 'payment':
      return 'Payment';
    default:
      return type;
  }
};

export default function BrokerHomePage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failedImages, setFailedImages] = useState(new Set());
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const response = await getMyAppointments();
      
      // Filter appointments to show only 'scheduled' or 'awaiting_payment' statuses
      const filteredAppointments = response.data.data.filter(appointment => 
        appointment.status === 'scheduled' || appointment.status === 'awaiting_payment'
      );
      
      setAppointments(filteredAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load appointments",
        confirmButtonColor: "#002855",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleImageError = (propertyId) => {
    setFailedImages(prev => new Set([...prev, propertyId]));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#002349] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-10 max-w-6xl">
      <h1 className="text-[#002349] font-bold text-2xl mb-8">My Appointments</h1>
      
      {appointments?.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-center text-gray-500">No appointments scheduled</p>
        </div>
      ) : (
        <div className="space-y-6">
          {appointments?.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-[#002349] text-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Property Image */}
                <div className="w-full md:w-1/3 h-48 bg-[#001731] rounded-lg overflow-hidden flex-shrink-0">
                  {!appointment.property?.images?.[0] || failedImages.has(appointment.property._id) ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-white">No Image Available</p>
                    </div>
                  ) : (
                    <img
                      src={appointment.property.images[0]}
                      alt={appointment.property.title || "Property"}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(appointment.property._id)}
                    />
                  )}
                </div>

                {/* Appointment Details */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-4">{appointment.property?.title || 'Appointment Details'}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-300">Client</p>
                      <p className="font-medium">{appointment.buyerId?.username || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-gray-300">Type</p>
                      <p className="font-medium">{formatAppointmentType(appointment.type)}</p>
                    </div>
                    <div>
                      <p className="text-gray-300">Date</p>
                      <p className="font-medium">
                        {new Date(appointment.appointmentDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-300">Time</p>
                      <p className="font-medium">
                        {new Date(appointment.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-300">Status</p>
                      <p className="font-medium capitalize">{appointment.status.replace('_', ' ')}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-4 items-center">
                    {appointment.status === 'awaiting_payment' ? (
                      <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-medium">
                        Waiting for buyer confirmation on payment
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            navigate(`/broker/appointments/${appointment._id}`, {
                              state: { appointment },
                            });
                          }}
                          className="bg-white text-[#002349] px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                        >
                          View Details
                        </button>
                        
                        {appointment.status === 'awaiting_payment_confirmation' && (
                          <button
                            onClick={() => {
                              // Handle payment confirmation
                            }}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                          >
                            Confirm Payment
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}