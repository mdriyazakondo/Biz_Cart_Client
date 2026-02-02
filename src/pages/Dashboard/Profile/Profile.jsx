import React, { useState } from "react";
import {
  useGetRoleByUserQuery,
  useUpdateUserMutation,
} from "../../../redux/features/users/userApi";
import useAuth from "../../../hooks/useAuth";
import {
  LogOut,
  Mail,
  ShieldCheck,
  Calendar,
  Edit3,
  Camera,
  X,
  Check,
  UploadCloud,
} from "lucide-react";
import { imageUpload } from "../../../utils";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const Profile = () => {
  const { users, logoutUserFunc } = useAuth();
  const { data, isLoading: userLoading } = useGetRoleByUserQuery(
    { email: users?.email },
    { skip: !users?.email },
  );

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const user = data?.user;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = user?.image;
      if (selectedFile) {
        imageUrl = await imageUpload(selectedFile);
      }
      const name = e.target.name.value;
      await updateProfile(users, {
        displayName: users.displayName,
        photoURL: users.photoURL,
      });
      await updateUser({ name, image: imageUrl }).unwrap();
      setIsEditModalOpen(false);
      setSelectedFile(null);
      setPreview(null);

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#1e293b] rounded-4xl shadow-2xl border border-gray-800/50 overflow-hidden">
        <div className="h-32 bg-linear-to-tr from-blue-600 via-indigo-600 to-purple-600"></div>
        <div className="px-8 pb-10">
          <div className="relative -mt-16 mb-6 flex justify-center">
            <div className="relative group">
              <img
                src={user?.image || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-3xl border-4 border-[#1e293b] object-cover shadow-2xl"
              />
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="absolute -bottom-2 -right-2 bg-blue-600 p-2.5 rounded-xl border-4 border-[#1e293b] text-white hover:bg-blue-500"
              >
                <Camera size={18} />
              </button>
            </div>
          </div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mt-3">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                {user?.role}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <InfoItem
              icon={<Mail size={20} />}
              label="Email"
              value={user?.email}
            />
            <InfoItem
              icon={<Calendar size={20} />}
              label="Member Since"
              value={
                user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "N/A"
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl"
            >
              <Edit3 size={18} className="text-blue-400" />
              Edit
            </button>
            <button
              onClick={logoutUserFunc}
              className="flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#1e293b] w-full max-w-md rounded-4xl border border-gray-800 shadow-2xl">
            <div className="p-6 border-b border-gray-800 flex justify-between">
              <h3 className="text-xl font-bold text-white">Update Profile</h3>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setPreview(null);
                  setSelectedFile(null);
                }}
                className="text-gray-400 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-8 space-y-6">
              <div className="flex flex-col items-center gap-4">
                <label
                  htmlFor="profileImage"
                  className="relative w-24 h-24 cursor-pointer group"
                >
                  <img
                    src={
                      preview ||
                      user?.image ||
                      "https://via.placeholder.com/150"
                    }
                    className="w-full h-full rounded-2xl object-cover border-2 border-dashed border-blue-500/50 p-1"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition">
                    <UploadCloud className="text-white" />
                  </div>
                </label>
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  Click photo to upload
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.name}
                  className="w-full bg-[#0f172a] border border-gray-800 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2"
              >
                <Check size={18} />
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0f172a]/40 border border-gray-800/50">
    <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400">{icon}</div>
    <div>
      <p className="text-[10px] text-gray-500 font-bold uppercase">{label}</p>
      <p className="text-sm text-gray-200">{value}</p>
    </div>
  </div>
);

export default Profile;
