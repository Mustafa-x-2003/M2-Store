export default function CategoryCard({ cat }) {
    return (
        <span className="inline-block bg-[var(--card)] hover:bg-[var(--primary)] hover:bg-[var(--primary-hover)] hover:text-[var(---primary)] border border[var(--border)] hover:border-[var(--primary)] text-md font-medium px-2.5 py-1 rounded-lg cursor-default transition-all duration-200">
            {cat}
        </span>
    )
}