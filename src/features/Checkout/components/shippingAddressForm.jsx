import React from "react";
import InputField from "./inputField";

function ShippingAddressForm({ register, errors }) {

    const fields = [
        {
            label: "Full Name",
            id: "fullName",
            type: "text",
            name: "fullName",
            placeholder: "e.g. Mohamed Ahmed",
            autoComplete: "name",
            validation: {
                required: "Full Name is Required",
                minLength: {
                    value: 3,
                    message: "Full name must be at least 3 characters"
                }
            }
        },

        {
            label: "Phone Number",
            id: "phone",
            type: "tel",
            name: "phone",
            placeholder: "e.g. 01055991234",
            autoComplete: "tel",
            validation: {
                required: "Phone Number is Required",
                pattern: {
                    value: /^01[0125][0-9]{8}$/,
                    message: "Enter a valid phone number"
                }
            }
        },

        {
            label: "Country",
            id: "country",
            type: "text",
            name: "country",
            placeholder: "e.g. Egypt",
            autoComplete: "country-name",
            validation: {
                required: "Country Name is Required",
                pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Country Name must be at least 2 characters"
                }
            }
        },

        {
            label: "City",
            id: "city",
            type: "text",
            name: "city",
            placeholder: "e.g. Aswan",
            autoComplete: "address-level2",
            validation: {
                required: "City Name is Required",
                pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "City Name must be at least 2 characters"
                }
            }
        },

        {
            label: "Address",
            id: "address",
            type: "text",
            name: "address",
            placeholder: "e.g. 15 Tahrir St., Dokki",
            autoComplete: "street-address",
            containerClassName: "md:col-span-2",
            validation: {
                required: "Address is Required",
                minLength: {
                    value: 5,
                    message: "Address must be at least 5 characters"
                }
            }
        }
    ]

    return (
        <section
            className="rounded-2xl border p-6 space-y-6"
            style={{
                background: "var(--card)",
                borderColor: "var(--border)"
            }}
        >
            <h2
                className="text-xl font-bold"
                style={{ color: "var(--text)" }}
            >
                Shipping Address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {
                    fields.map((field) => (
                        <InputField
                            key={field.id}
                            {...field}
                            register={register}
                            error={errors[field.name]}
                        />
                    ))
                }
            </div>
        </section>
    );
}

export default ShippingAddressForm;
