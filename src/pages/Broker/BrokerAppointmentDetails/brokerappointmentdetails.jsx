import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getAppointmentById, deleteAppointment, updateAppointment } from "../../../network/appointment";

const MySwal = withReactContent(Swal);

export default function BrokerAppointmentDetail() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(state?.appointment);
  const [loading, setLoading] = useState(!state?.appointment);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const fetchAppointment = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await getAppointmentById(id);
        setAppointment(response.data.data);
      } catch (err) {
        console.error('Error fetching appointment:', err);
        setError('Failed to load appointment details');
      } finally {
        setLoading(false);
      }
    };

    if (!appointment && id) {
      fetchAppointment();
    }
  }, [id, appointment]);

  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    if (feedback) {
      
      const handleFeedbackAction = async () => {
        if (feedback === 'liked') {
          try {
            // Update appointment status to awaiting_payment
            await updateAppointment(appointment._id, { status: 'awaiting_payment' });
            
            await Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Moving to payment confirmation',
              showConfirmButton: false,
              timer: 1500
            });
            navigate("/broker-home");
          } catch (err) {
            console.error('Error updating appointment:', err);
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to update appointment status',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'bg-[#002349] text-white px-6 py-2 rounded',
              },
              buttonsStyling: false
            });
          }
        } else {
          // If not liked, delete the appointment
          try {
            await deleteAppointment(appointment._id);
            await Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Appointment deleted successfully',
              showConfirmButton: false,
              timer: 1500
            });
            navigate("/broker-home");
          } catch (err) {
            console.error('Error deleting appointment:', err);
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete appointment. Please try again.',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'bg-[#002349] text-white px-6 py-2 rounded',
              },
              buttonsStyling: false
            });
          }
        }
      };
      
      handleFeedbackAction();
    }
  }, [feedback, appointment?._id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading appointment details...</p>
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error || 'Appointment not found'}</p>
      </div>
    );
  }

  const handleFeedback = async () => {
    const { value: choice } = await Swal.fire({
      title: "How was this appointment?",
      html: `
        <div class="flex flex-col space-y-4 text-left">
          <label class="flex items-center">
            <input type="radio" name="feedback" value="liked" class="mr-3 w-4 h-4 text-[#002349]"/>
            <span class="font-semibold text-base">Liked and made a Reservation Paper</span>
          </label>
          <label class="flex items-center">
            <input type="radio" name="feedback" value="notLiked" class="mr-3 w-4 h-4 text-[#002349]"/>
            <span class="font-semibold text-base">Not Liked</span>
          </label>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "p-6 rounded-md",
        confirmButton: "bg-[#002349] text-white px-6 py-2 rounded",
        cancelButton: "bg-gray-500 text-white px-6 py-2 rounded ml-2",
      },
      buttonsStyling: false,
      focusConfirm: false,
      preConfirm: () => {
        const checked = document.querySelector(
          'input[name="feedback"]:checked'
        );
        if (!checked) Swal.showValidationMessage("Please select an option");
        return checked ? checked.value : null;
      },
    });

    if (choice) {
      setFeedback(choice);
    }
  };

  const propertyImage = appointment?.property?.images?.[0];
  const appointmentDate = new Date(appointment.appointmentDate);
  const formattedDate = appointmentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = appointmentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl bg-[#002349] rounded-md shadow-md overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 h-64 md:h-auto bg-gray-100 flex items-center justify-center">
          {imageError || !propertyImage ? (
            <div className="text-gray-500 text-center p-4">
              <svg
                className="w-16 h-16 mx-auto mb-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm font-medium">No Image Available</p>
            </div>
          ) : (
            <img
              src={propertyImage}
              alt={appointment.property?.title || 'Property'}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          )}
        </div>
        <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              {appointment.property?.title || 'Appointment Details'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
              <div className="space-y-3">
                <p className="text-lg">
                  <span className="font-semibold">Property:</span> {appointment.property?.title}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Type:</span> {appointment.property?.type?.split('_').join(' ')}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Bedrooms:</span> {appointment.property?.bedrooms}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Bathrooms:</span> {appointment.property?.bathrooms}
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-lg">
                  <span className="font-semibold">Client:</span> {appointment.buyerId?.username}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Date:</span> {formattedDate}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Time:</span> {formattedTime}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Status:</span> 
                  <span className="capitalize">
                    {appointment.status.split('_').join(' ')}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-6 py-2 rounded text-sm font-medium hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleFeedback}
              className="bg-white text-[#002349] px-6 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
