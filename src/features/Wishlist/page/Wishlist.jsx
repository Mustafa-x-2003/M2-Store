import React,{useState,useEffect} from "react";
import Loading from "../../../components/common/Loading";
import WishlistCard from "../components/WishlistCard";
import { getWishlist, removeFromWishlist, clearWishlist} from "../services/wishlistApi";
import { addToCart } from "../../cart/services/CartsApi";
import toast from "react-hot-toast";
import EmptyWishlist from "../components/EmptyWishlist";
const Wishlist =()=>{
        
        const [wishlist, setWishlist] = useState([]);
        const [loading, setLoading] = useState(true);
        const fetchWishlist =async ()=>{
                try{
                        setLoading(true);
                        const {data}=await getWishlist ()
                        
                        setWishlist(data.wishlist.products);
                }
                catch(error){
                        console.error(error)
                        toast.error("Failed to load wishlist");
                }
                finally {
                        setLoading(false);
                }
        }

        useEffect(() => {
                fetchWishlist();
        }, []);


        const handleRemovefromWishlist = async (productId) => {
                try {
                        await removeFromWishlist(productId);

                        toast.success("Removed from wishlist");

                        fetchWishlist();
                } catch (error) {
                        console.error(error);
                        toast.error("Failed to remove from wishlist");
                }
        };

        const handleAddToCart = async (productId)=>{
                try{
                        await addToCart(productId);
                        toast.success("Added to cart");
                }
                catch (error){
                        console.error(error)
                        toast.error("Failed to add to cart");
                }
        }

      
        const handleClearWishlist = async ()=>{
                try {
                        if (!window.confirm("Are you sure you want to clear your wishlist?")) {
                                return;
                        }
                        await clearWishlist();

                        setWishlist([]);

                        toast.success("Wishlist cleared");
                } catch (error) {
                        console.error(error);

                        toast.error("Failed to clear wishlist");
                }
        }
        if (loading) {
                return <Loading />;
        }


        return(
                 <>
                            

                        <div>
                                {wishlist.length === 0 ? 
                                        <EmptyWishlist /> 
                                        
                                        : <div className=" container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                                              
                                                <div className="flex justify-between items-center mb-8">
                                                        <h2 className="text-3xl font-bold">My Wishlist</h2>

                                                        {wishlist.length > 0 && (
                                                                <button
                                                                        onClick={handleClearWishlist}
                                                                        className="bg-[var(--danger)] hover:opacity-90 text-[var(--text-inverse)]  px-5 py-2 rounded-lg"
                                                                >
                                                                        Clear Wishlist
                                                                </button>
                                                        )}
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
                                                        {
                                                                wishlist.map((product) => {
                                                                        return (
                                                                                <WishlistCard key={product._id} product={product} onAddToCart={handleAddToCart} onRemovefromWishlist={handleRemovefromWishlist} />
                                                                        )
                                                                })
                                                        }


                                                </div>
                                        </div>

                                 }
                        </div>

              
                        

                         
                </>



        )
}

export default Wishlist