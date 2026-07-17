import { useNavigate } from "react-router";
import { BsBoxSeam } from "react-icons/bs";
const OrderEmpty=()=>{
    const x=useNavigate()
    return(
        <div className="w-[50%] mx-auto flex flex-col items-center gap-y-4">
          <div className="w-19 h-19 bg-slate-200 flex items-center justify-center rounded-full">
            <BsBoxSeam className="w-12 h-12 text-[var(--text-muted)] font-bold" />
          </div>

          <h2 className="text-[var(--text)] text-xl font-bold">
            No orders yet
          </h2>

          <p className="text-[var(--text-secondary)] text-sm font-medium max-w-md sm:max-w-sm text-center">
           You haven't placed any orders yet. Start shopping to see your orders here.
          </p>

          <button
            className="bg-[var(--primary)] text-[var(--button-secondary)] py-2 px-3 rounded-xl hover:bg-[var(--primary-hover)] transition-all duration-200"
            onClick={() => x("/products")}
          >
            Start Shopping
          </button>
        </div>
    )
}
export default OrderEmpty;