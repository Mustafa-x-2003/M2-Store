function InputField({
    label,
    id,
    type = "text",
    name,
    placeholder,
    containerClassName = "",
    register,
    autoComplete,
    validation,
    error,
}) {
    return (
        <div className={`flex flex-col gap-2 ${containerClassName}`}>
            <label
                htmlFor={id}
                className="text-sm font-semibold"
                style={{ color: "var(--text-secondary)" }}
            >
                {label}
            </label>

            <input
                id={id}
                type={type}
                name={name}
                autoComplete={autoComplete}
                placeholder={placeholder}
                style={inputStyle}
                {...register(name, validation)}
                className="w-full rounded-xl border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)] placeholder:text-[var(--text-muted)] transition-all duration-300"
            />
            {
                error&& (
                    <p className="mt-1 text-sm text-[var(--danger)]">
                         {error.message}
                    </p>
                )
            }
        </div>
    );
}

const inputStyle = {
    background: "var(--input-bg)",
    borderColor: "var(--input-border)",
    color: "var(--text)"
}

export default InputField;