export default function CategoryCard({ cat }) {
    return (
        <span className="inline-block bg-gray-100 dark:bg-gray-700 hover:bg-teal-50 dark:hover:bg-teal-900/40 hover:text-teal-600 dark:hover:text-teal-400 border border-gray-200 dark:border-gray-600 hover:border-teal-200 dark:hover:border-teal-700 text-gray-500 dark:text-gray-400 text-xs font-medium px-2.5 py-1 rounded-lg cursor-default transition-all duration-200">
            {cat}
        </span>
    )
}