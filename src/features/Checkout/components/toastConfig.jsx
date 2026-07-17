import toast from "react-hot-toast";
import { FiCheckCircle } from "react-icons/fi";

export const showSuccessToast = (message) => {
    toast.custom(
        (t) => (
            <div
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border transition-all duration-300
          ${t.visible ? "toast-in" : "toast-out"}
        `}
                style={{
                    background: "rgba(17,24,39,.96)",
                    color: "#fff",
                    borderColor: "rgba(255,255,255,.08)",
                    backdropFilter: "blur(12px)",
                }}
            >
                <div
                    className="flex items-center justify-center w-8 h-8 rounded-full"
                    style={{
                        background: "#22c55e20",
                    }}
                >
                    <FiCheckCircle
                        size={20}
                        color="#22c55e"
                    />
                </div>

                <span className="font-medium">
                    {message}
                </span>
            </div>
        ),
        {
            duration: 3000,
            position: "top-center",
        }
    );
};