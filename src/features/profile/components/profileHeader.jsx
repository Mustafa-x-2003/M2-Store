import { useState, useEffect } from "react";
import { Mail, Phone } from "lucide-react";
import EditProfile from "./editProfile";

export default function ProfileHeader({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(user);
  useEffect(() => { setUserData(user); }, [user]);
  const handleUpdate = (updatedUser) => {
    setUserData((prev) => ({ ...prev, ...updatedUser }));
    setIsEditing(false);
  };
  const displayName = userData?.username || userData?.name;
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:text-left gap-4 mb-6">
        <div className="flex size-20 items-center justify-center overflow-hidden rounded-full bg-[var(--surface-secondary)]">
          {userData?.avatar ? ( <img src={userData.avatar} alt="avatar" className="h-full w-full object-cover" /> ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 text-[var(--text-muted)]">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>)}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[var(--text)]">{displayName}</h2>
          <p className="text-sm text-[var(--text-darker)] opacity-90">{userData?.email}</p>
          <span className="text-xs font-semibold text-[var(--primary)]">{userData?.role||"Customer"}</span>
        </div>
      </div>
      {!isEditing ? (
        <>
          <div className="mt-4 space-y-3 mb-3">
            <div className="flex items-center gap-3 text-sm text-[var(--text-darker)]">
              <Mail size={16} className="opacity-50"/>
              <span>{userData?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--text-darker)]">
              <Phone size={16} className="opacity-50" />
              <span>{userData?.phone || "Not set"}</span>
            </div>
          </div>
          <button  type="button" onClick={() => setIsEditing(true)}
          className="mt-4 rounded-lg border border-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-[var(--text-inverse)] cursor-pointer">
            Edit Profile </button>
        </>
      ) : ( <EditProfile user={userData} onClose={() => setIsEditing(false)} onUpdate={handleUpdate}/>)}
    </div>
  );
}