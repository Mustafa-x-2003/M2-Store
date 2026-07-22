import { BsStars } from "react-icons/bs";
import { useNavigate } from "react-router";

export default function FirstSection() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden bg-[#3730a3] dark:bg-[#0d0b2b] min-h-[75vh]">

      <div className="absolute inset-0 bg-gradient-to-br from-[#4338ca] via-[#4f46e5] to-[#3730a3] dark:from-[#312e81] dark:via-[#1e1b4b] dark:to-[#0d0b2b] opacity-90" />

      <div className="absolute -right-24 top-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-[#6366f1]/30 blur-3xl pointer-events-none" />


      <div className="
        relative z-10
        lg:mx-32
        px-6 sm:px-10 
        py-20
        flex flex-col
        max-w-[650px]
      ">


        <div className="flex items-center gap-2 mb-5">
          <BsStars className="text-yellow-300 text-xl" />

          <span className="
            text-base
            font-semibold
            text-white/90
          ">
            Premium Shopping Experience
          </span>
        </div>



        <h1 className="
          text-[48px]
          sm:text-[56px]
          lg:text-[64px]
          font-bold
          text-white
          leading-[1.05]
          tracking-tight
          mb-6
        ">
          Shop the future,
          <br />
          delivered today
        </h1>



        <p className="
          text-xl
          font-normal
          text-white/75
          leading-relaxed
          max-w-[540px]
          mb-8
        ">
          Discover premium products at unbeatable prices. Fast delivery, easy
          returns, and exceptional quality.
        </p>



        <div className="flex gap-4">

                <div className="flex flex-wrap gap-3 mt-1">
                   <button onClick={()=>navigate('/products')} className="px-6 py-3 rounded-md bg-white text-[#4338ca] text-sm font-semibold hover:bg-white/90 active:scale-95 transition-all duration-150 cursor-pointer">
                    Shop Now
                 </button>
            <button className="px-6 py-3 rounded-md border border-white/60 text-white text-sm font-semibold hover:bg-white/10 active:scale-95 transition-all duration-150 cursor-pointer"
                  onClick={()=>document.getElementById('shopCategory').scrollIntoView({behavior: 'smooth'})}
                  >
                     View Categories
                    </button>
               </div>

        </div>

      </div>

    </section>
  );
}