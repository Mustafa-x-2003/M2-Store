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
        onClick={()=>navigate(`/products?category=${category}`)}
            className="
                group flex flex-col items-center justify-center gap-4
                bg-[var(--card)] rounded-2xl py-7 px-4 cursor-pointer
                border border-[var(--border)] transition-all duration-200
                hover:border-[var(--primary)] hover:shadow-lg hover:-translate-y-1
                w-40 sm:w-50 md:w-60 lg:w-70
            "
        >
            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[var(--info-light)] dark:bg-indigo-950/40 dark:group-hover:bg-[var(--background)] transition-all duration-200">
                <Icon className="text-[var(--primary)] text-2xl sm:text-3xl" />
            </div>

            <div className="text-center">
                <p className="text-sm sm:text-base font-semibold text-[var(--text)] eading-tight">
                    {label}
                </p>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                    {numberOfProducts} products{numberOfProducts !== 1 ? "s" : ""}
                </p>
            </div>
        </div>
    );
}