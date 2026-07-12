import {
    BsLaptop,
    BsPersonFill,
    BsPersonHeart,
    BsDiamond,
    BsBicycle,
    BsBag,
    BsWatch,
    BsGrid,
    BsPhone,
    BsHouseDoor,
    BsController,
    BsScissors,
} from "react-icons/bs";
import { useNavigate } from "react-router";

const CATEGORY_ICON_MAP = {
    "electronics":      BsLaptop,
    "phone":            BsPhone,
    "mobile":           BsPhone,
    "men's clothing":   BsPersonFill,
    "women's clothing": BsPersonHeart,
    "jewelery":         BsDiamond,
    "jewelry":          BsDiamond,
    "watches":          BsWatch,
    "sports":           BsBicycle,
    "fashion":          BsBag,
    "home":             BsHouseDoor,
    "gaming":           BsController,
    "beauty":           BsScissors,
};

function getCategoryIcon(category) {
    const key = category?.toLowerCase?.() ?? "";
    for (const [pattern, Icon] of Object.entries(CATEGORY_ICON_MAP)) {
        if (key.includes(pattern)) return Icon;
    }
    return BsGrid; 
}

export default function CategoryBlock({ category, products }) {
    const navigate = useNavigate();
    const numberOfProducts = products.filter(
        (product) => product.category === category
    ).length;

    const Icon = getCategoryIcon(category);

    const label = category
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    return (
        <div
        onClick={() => navigate(`/products?category=${category}`)}
            className="
                flex flex-col items-center justify-center gap-4
                bg-white dark:bg-slate-900 rounded-2xl py-7 px-4 cursor-pointer
                border border-gray-200 dark:border-slate-800 transition-all duration-200
                hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg hover:-translate-y-1
                w-36 sm:w-40 md:w-44 lg:w-52
            "
        >
            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40">
                <Icon className="text-indigo-500 dark:text-indigo-400 text-2xl sm:text-3xl" />
            </div>

            <div className="text-center">
                <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-slate-100 leading-tight">
                    {label}
                </p>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                    {numberOfProducts} product{numberOfProducts !== 1 ? "s" : ""}
                </p>
            </div>
        </div>
    );
}