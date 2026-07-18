import { useState } from "react";
import toast from "react-hot-toast";
import { updateProfile } from "../service/profileService";

export default function EditProfile({ user, onClose, onUpdate }) {
  const [form, setForm] = useState({
    username: user?.username || user?.name || "",
    phone: user?.phone || "",
    avatarUrl: user?.avatar || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSave = async () => {
    const userId = user?.id || user?._id;
    if (!userId) {
      toast.error("User ID is missing");
      return;
    }
    setIsLoading(true);
    try {
      const updatedUser = await updateProfile(userId, {
        username: form.username,
        phone: form.phone,
        avatar: form.avatarUrl,
      });
      onUpdate({
        username: updatedUser.username,
        phone: updatedUser.phone,
        avatar: updatedUser.avatar,
      });
      toast.success("Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Update failed.");
    } finally {
      setIsLoading(false);
    }
  };
  const inputClass = "w-full rounded-lg border border-[var(--border)] bg-[var(--input-bg)] px-4 py-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]";
  return (
    <div className="mt-4 space-y-3">
      <div>
        <label className="mb-1 block text-sm text-[var(--text-muted)]">Username</label>
        <input name="username" value={form.username} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block text-sm text-[var(--text-muted)]">Phone</label>
        <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block text-sm text-[var(--text-muted)]">Avatar URL</label>
        <input name="avatarUrl" value={form.avatarUrl} onChange={handleChange} className={inputClass} />
      </div>
      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={handleSave}
          disabled={isLoading}
          className="rounded-lg bg-[var(--primary)] px-5 py-2 text-sm font-semibold text-[var(--text-inverse)] transition hover:opacity-90 disabled:opacity-50 cursor-pointer">
          {isLoading ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onClose}
          className="rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] px-5 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface)] cursor-pointer">
          Cancel </button>
      </div>
    </div>
  );
}