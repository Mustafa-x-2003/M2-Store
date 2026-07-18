import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { getCurrentUser } from "../service/profileService";
import { updateAddresses, deleteAddress } from "../service/addressService";

export default function Address({ user }) {
  const [address, setAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({
    country: "",
    city: "",
    street: "",
    building: "",
    postalCode: "",
  });
  useEffect(() => {
    fetchUserAddress();
  }, []);
  const fetchUserAddress = async () => {
    try {
      const currentUser = await getCurrentUser();
      const existing = currentUser?.addresses?.[0];

      if (existing) {
        setAddress(existing);
        setForm({
          country: existing.country || "",
          city: existing.city || "",
          street: existing.street || "",
          building: existing.building || "",
          postalCode: existing.postalCode || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch address:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = async () => {
    if (!form.country || !form.city || !form.street) {
      toast.error("Please fill country, city and street");
      return;
    }
    const userId = user?.id || user?._id;
    if (!userId) {
      toast.error("User ID is missing");
      return;
    }
    const updatedAddresses = [{ ...form, defaultAddress: true }];

    try {
      const updatedUser = await updateAddresses(userId, updatedAddresses);
      const savedAddress = updatedUser?.addresses?.[0] || form;

      setAddress(savedAddress);
      setIsEditing(false);
      toast.success(isEditing ? "Address updated!" : "Address added successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to save address");
    }
  };
  const handleEdit = () => setIsEditing(true);
  const handleDelete = async () => {
    const userId = user?.id || user?._id;
    if (!userId) return;
    try {
      await deleteAddress(userId);
      setAddress(null);
      setForm({ country: "", city: "", street: "", building: "", postalCode: "" });
      toast.success("Address deleted.");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to delete address");
    }
  };
  const inputClass = "w-full rounded-lg border border-[var(--border)] bg-[var(--input-bg)] px-4 py-3 text-sm text-[var(--text)] outline-none";
  if (isLoading) {
    return (
      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
        <p className="text-sm text-[var(--text-muted)]">Loading address...</p>
      </div>
    );
  }
  return (
    <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <MapPin size={18} className="text-[var(--primary)]" />
        <h3 className="text-lg font-bold text-[var(--text)]">Addresses</h3>
      </div>
      {address && !isEditing ? (
        <div className="rounded-lg border border-[var(--border)] p-4">
          <p className="text-sm font-bold text-[var(--text)]">
            {address.country}, {address.city}
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            {address.street}, {address.building} - {address.postalCode}
          </p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleEdit}
              className="rounded-lg border border-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-[var(--text-inverse)] cursor-pointer">
              Edit </button>
            <button onClick={handleDelete}
              className="rounded-lg border border-[var(--danger)] px-4 py-2 text-sm font-semibold text-[var(--danger)] transition hover:bg-[var(--danger)] hover:text-[var(--text-inverse)] cursor-pointer">
              Delete </button>
          </div>
        </div>
      ) : (
        <>
          {!isEditing && <p className="mb-4 text-md text-[var(--text-darker)] opacity-90">No addresses yet.</p>}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input name="country" placeholder="Country" value={form.country} onChange={handleChange} className={inputClass} />
            <input name="city" placeholder="City" value={form.city} onChange={handleChange} className={inputClass} />
            <input name="street" placeholder="Street" value={form.street} onChange={handleChange} className={inputClass} />
            <input name="building" placeholder="Building" value={form.building} onChange={handleChange} className={inputClass} />
            <input
              name="postalCode"
              placeholder="Postal code"
              value={form.postalCode}
              onChange={handleChange}
              className={`${inputClass} sm:col-span-2`}
            />
          </div>
          <button
            onClick={handleSave}
            className="mt-4 flex items-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--text-inverse)] transition hover:opacity-90 cursor-pointer">
            {isEditing ? "Save Changes" : "+ Add Address"}
          </button>
        </>
      )}
    </div>
  );
}