// src/pages/ConfirmPaymentPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { getMyAppointments, updateAppointment } from "../../../network/appointment";

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

export default function ConfirmPaymentPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failedImages, setFailedImages] = useState(new Set());
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const response = await getMyAppointments();
      
      // Filter appointments to show only 'awaiting_payment_confirmation' status
      const filteredAppointments = response.data.data.filter(appointment => 
        appointment.status === 'awaiting_payment_confirmation'
      );
      
      setAppointments(filteredAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load payment appointments",
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

  // Handle payment confirmation
  const handleConfirm = async (appointmentId) => {
    const result = await Swal.fire({
      title: "Did the Buyer Complete the Payment Successfully?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm",
      cancelButtonText: "No, Cancel",
      confirmButtonColor: "#002855",
    });

    if (result.isConfirmed) {
      try {
        // Update appointment status to completed
        await updateAppointment(appointmentId, { status: 'completed' });
        
        await Swal.fire({
          title: "Success",
          text: "Payment has been confirmed and appointment marked as completed",
          icon: "success",
          confirmButtonColor: "#002855",
        });
        
        // Refresh the appointments list
        fetchAppointments();
      } catch (err) {
        console.error('Error confirming payment:', err);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to confirm payment. Please try again.',
          confirmButtonColor: "#002855",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#002349] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment appointments...</p>
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 text-xl">No payment appointments found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-[#002349] mb-8">Payment Confirmations</h1>
        
        <div className="space-y-6">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Property Image */}
                  <div className="w-full md:w-1/3 h-48 bg-gray-100 rounded-lg overflow-hidden">
                    {appointment.property?.images?.[0] && !failedImages.has(appointment.property._id) ? (
                      <img
                        src={appointment.property.images[0]}
                        alt={appointment.property.title || 'Property'}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(appointment.property._id)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}
                  </div>

                  {/* Appointment Details */}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {appointment.property?.title || 'Appointment Details'}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-500">Client</p>
                        <p className="font-medium">{appointment.buyerId?.username || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Type</p>
                        <p className="font-medium">{formatAppointmentType(appointment.type)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Date</p>
                        <p className="font-medium">
                          {new Date(appointment.appointmentDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Time</p>
                        <p className="font-medium">
                          {new Date(appointment.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Status</p>
                        <p className="font-medium capitalize">
                          {appointment.status.replace('_', ' ')}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        onClick={() => handleConfirm(appointment._id)}
                        className="bg-[#002349] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#001a33] transition-colors w-full sm:w-auto"
                      >
                        Confirm Payment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
