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
  electronics: BsLaptop,
  phone: BsPhone,
  mobile: BsPhone,
  "men's clothing": BsPersonFill,
  "women's clothing": BsPersonHeart,
  jewelery: BsDiamond,
  jewelry: BsDiamond,
  watches: BsWatch,
  sports: BsBicycle,
  fashion: BsBag,
  home: BsHouseDoor,
  gaming: BsController,
  beauty: BsScissors,
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
    (product) => product.category === category,
  ).length;

  const Icon = getCategoryIcon(category);

  const label = category
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div
      onClick={() => navigate(`/products?category=${category}`)}
      className="flex flex-col items-center justify-center w-[270px] h-[170px]   rounded-xl border border-[var(--border)] bg-[var(----surface)]  cursor-pointer  hover:shadow-lg hover:-translate-y-1 hover:border-[var(--input-focus)] transition-all duration-300 "
    >
      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 transition-colors duration-300">
        <Icon className="text-indigo-500 text-2xl transition-colors duration-300" />
      </div>

      <div className="text-center mt-3 transition-colors duration-300">
        <p className="text-xl text-[var(--text)] mt-1 transition-colors duration-300">
          {label}
        </p>

        <p className="text-sm text-gray-400 mt-1 transition-colors duration-300">
          {numberOfProducts} products
        </p>
      </div>
    </div>
  );
}
