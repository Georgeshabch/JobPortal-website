import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  Users,
  Calendar,
  MapPin,
  Briefcase,
  Download,
  Eye,
  ArrowLeft,
} from "lucide-react";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import { getInitials } from "../../utils/helper";
import { useEffect, useMemo, useState } from "react";
import StatusBage from "../../components/StatusBage";
import ApplicantProfilePreview from "../../components/Cards/ApplicantProfilePreview";

function ApplicationViewer() {
  const location = useLocation();
  const jobId = location.state?.jobId || null;

  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.APPLICATIONS.GET_ALL_APPLICATIONS(jobId)
      );
      setApplications(response.data);
    } catch (error) {
      console.log("Failed to Fetch applications",error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) fetchApplications();
  }, [jobId]);

  // Group applications by job
  const groupedApplications = useMemo(() => {
    const filtered = applications.filter((app) => app?.job?.title?.toLowerCase?.());

    return filtered.reduce((acc, app) => {
      const jobId = app.job?._id;
      if (!acc[jobId]) {
        acc[jobId] = {
          job: app.job,
          applications: [],
        };
      }
      acc[jobId].applications.push(app);
      return acc;
    }, {});
  }, [applications]);

  const handleDownloadResume = (resumeUrl) => {
    if (resumeUrl) {
      window.open(resumeUrl, "_blank");
    } else {
      console.warn("No resume available for this applicant");
    }
  };

  return (
    <DashboardLayout activeMenu="manage-jobs">
      {loading ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading applications...</p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <button
                  onClick={() => navigate("/manage-jobs")}
                  className="group flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-white bg-white/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 border border-gray-200 hover:border-transparent rounded-xl transition-all duration-300 shadow-lg shadow-gray-100 hover:shadow-xl"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  <span>Back</span>
                </button>
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                  Applications Overview
                </h1>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 pb-8">
            {Object.keys(groupedApplications).length === 0 ? (
              <div className="text-center py-16">
                <Users className="mx-auto h-24 w-24 text-gray-300" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No applications available
                </h3>
                <p className="mt-2 text-gray-500">
                  No applications found at the moment.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.values(groupedApplications).map(({ job, applications }) => (
                  <div key={job?._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                    {/* Job Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h2 className="text-lg font-semibold text-white">
                            {job?.title || "Unknown Job"}
                          </h2>
                          <div className="flex flex-wrap items-center gap-4 mt-2 text-blue-100">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span className="text-sm">{job?.location || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              <span className="text-sm">{job?.type || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-sm">{job?.category || "N/A"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                          <span className="text-sm text-white font-medium">
                            {applications.length} Application
                            {applications.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Applications List */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {applications.map((application) => {
                          const applicant = application?.applicant || {};
                          return (
                            <div
                              key={application._id}
                              className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                            >
                              <div className="flex items-center gap-4">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                  {applicant?.avatar ? (
                                    <img
                                      src={applicant.avatar}
                                      alt={applicant?.name || "Applicant"}
                                      className="h-14 w-14 rounded-full object-cover"
                                    />
                                  ) : (
                                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                      <span className="text-blue-600 font-semibold">
                                        {getInitials(applicant?.name || "N A")}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {/* Applicant Info */}
                                <div className="min-w-0 flex-1">
                                  <h3 className="font-semibold text-gray-900 ">
                                    {applicant?.name || "Unknown Applicant"}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    {applicant?.email || "No email provided"}
                                  </p>
                                  <div className="flex items-center gap-1 mt-1 text-gray-500 text-xs">
                                    <Calendar className="h-3 w-3" />
                                    <span>
                                      Applied{" "}
                                      {moment(application.createdAt)?.format("DD-MM-YYYY")}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-3 mt-4 md:mt-0">
                                <StatusBage status={application.status} />
                                <button
                                  onClick={() =>
                                    handleDownloadResume(applicant?.resume)
                                  }
                                  className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all"
                                >
                                  <Download className="h-4 w-4" />
                                  Resume
                                </button>

                                <button
                                  onClick={() => setSelectedApplicant(application)}
                                  className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-all"
                                >
                                  <Eye className="w-4 h-4" />
                                  View Profile
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile Modal */}
          {selectedApplicant && (
            <ApplicantProfilePreview
              selectedApplicant={selectedApplicant}
              setSelectedApplicant={setSelectedApplicant}
              handleDownloadResume={handleDownloadResume}
              handleClose={() => {
                setSelectedApplicant(null);
                fetchApplications();
              }}
            />
          )}
        </div>
      )}
    </DashboardLayout>
  );
}

export default ApplicationViewer;
