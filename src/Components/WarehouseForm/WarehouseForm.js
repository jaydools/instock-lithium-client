import React from "react";
import "./WarehouseForm.scss";

import { useState, useEffect } from "react";
import axios from "axios";
import Title from "../Title/Title";
import Error from "../../Assets/Images/error-24px.svg";

function WarehouseForm({ handleBack, selectedWarehouseId }) {
    const [warehouse_name, setwarehouse_name] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [contact_name, setContact_name] = useState("");
    const [contact_position, setContact_Position] = useState("");
    const [contact_phone, setContact_phone] = useState("");
    const [contact_email, setContact_email] = useState("");

    const [failed, setFailed] = useState({
        warehouse_name: false,
        address: false,
        city: false,
        country: false,
        contact_name: false,
        contact_position: false,
        contact_phone: false,
        contact_email: false,
    });

    const formatPhoneNumber = phoneState => {
        let digits = `${phoneState}`;
        const countryCode = digits.length === 11 ? `+${digits[0]} ` : "";
        if (countryCode) digits = digits.slice(1);

        const areaCode = `(${digits.slice(0, 3)}) `;
        digits = digits.slice(3);

        const lastSeven = [digits.slice(0, 3), digits.slice(3)].join("-");

        return `${countryCode}${areaCode}${lastSeven}`;
    };

    function validatePhone(number) {
        return [10, 11].includes(number.replace(/\D/g, "").length);
    }

    function validateEmail(contact_email) {
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]*$/;
        return re.test(contact_email);
    }

    function validateField(field, value, setFailState = true) {
        if (field === "contact_phone") {
            const fieldFailed = !validatePhone(value);
            setFailState &&
                setFailed({
                    ...failed,
                    contact_phone: fieldFailed,
                });
            if (!fieldFailed) setContact_phone(formatPhoneNumber(value.replace(/\D/g, "")));
            return !fieldFailed;
        }

        if (field === "contact_email") {
            const fieldFailed = !validateEmail(value);
            setFailState &&
                setFailed({
                    ...failed,
                    contact_email: fieldFailed,
                });
            return !fieldFailed;
        }

        const newFailed = { ...failed };
        newFailed[field] = !value;
        setFailState && setFailed({ ...newFailed });
        return !!value;
    }

    async function handleAddWarehouse(event) {
        event.preventDefault();

        const fields = {
            warehouse_name,
            address,
            city,
            country,
            contact_name,
            contact_position,
            contact_phone,
            contact_email,
        };

        const newFailed = {};
        for (const field in fields) {
            newFailed[field] = !validateField(field, fields[field], false);
        }

        if (Object.values(newFailed).some(failedValidation => failedValidation)) {
            return setFailed({ ...newFailed });
        }

        try {
            if (selectedWarehouseId) {
                await axios.put(
                    `${process.env.REACT_APP_BACKEND_URL}/api/warehouses/${selectedWarehouseId}`,
                    fields,
                );
            } else {
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/warehouses`, fields);
            }
        } catch (error) {
            console.log(`Failed to ${selectedWarehouseId ? "PUT" : "POST new"} warehouse:`, error);
        }
        handleBack();
    }

    useEffect(() => {
        if (!selectedWarehouseId) return;

        const setFormDefaults = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/warehouses/${selectedWarehouseId}`,
                );

                setwarehouse_name(data.warehouse_name);
                setAddress(data.address);
                setCity(data.city);
                setCountry(data.country);
                setContact_name(data.contact_name);
                setContact_Position(data.contact_position);
                setContact_phone(data.contact_phone);
                setContact_email(data.contact_email);
            } catch (error) {
                console.log(`Failed to get warehouse data for id ${selectedWarehouseId}.`, error);
                handleBack();
            }
        };
        setFormDefaults();
    }, [selectedWarehouseId]);

    return (
        <form noValidate="noValidate" className="whcard " onSubmit={handleAddWarehouse}>
            <Title
                pageTitle={selectedWarehouseId ? "Edit Warehouse" : "Add New Warehouse"}
                handleBack={handleBack}
            />
            <div className="whcard__content-wrp">
                <div className="whcard__details-wrp ">
                    <div className="whcard__sub-header ">Warehouse Details</div>
                    <label className="whcard__label ">
                        Warehouse Name
                        <input
                            onChange={e => setwarehouse_name(e.target.value)}
                            value={warehouse_name}
                            onBlur={() => validateField("warehouse_name", warehouse_name)}
                            type="text"
                            placeholder="Warehouse Name"
                            name="warehouse "
                            className={`whcard__input ${
                                failed.warehouse_name ? "whcard__input--failed" : ""
                            }`}
                        />
                        {failed.warehouse_name && (
                            <div className="whcard__error-wrp">
                                <img className="whcard__error-img" src={Error} alt="" />
                                <p className="whcard__error-text">This field is required</p>
                            </div>
                        )}
                    </label>
                    <label className="whcard__label ">
                        Street Address
                        <input
                            onChange={e => setAddress(e.target.value)}
                            value={address}
                            onBlur={() => validateField("address", address)}
                            type="text"
                            placeholder="Street Address"
                            name="address"
                            className={`whcard__input ${
                                failed.address ? "whcard__input--failed" : ""
                            }`}
                        />
                        {failed.address && (
                            <div className="whcard__error-wrp">
                                <img className="whcard__error-img" src={Error} alt="" />
                                <p className="whcard__error-text">This field is required</p>
                            </div>
                        )}
                    </label>
                    <label className="whcard__label">
                        City
                        <input
                            onChange={e => setCity(e.target.value)}
                            value={city}
                            onBlur={() => validateField("city", city)}
                            type="text"
                            placeholder="City"
                            name="city"
                            className={`whcard__input ${
                                failed.city ? "whcard__input--failed" : ""
                            }`}
                        />
                        {failed.city && (
                            <div className="whcard__error-wrp">
                                <img className="whcard__error-img" src={Error} alt="" />
                                <p className="whcard__error-text">This field is required</p>
                            </div>
                        )}
                    </label>
                    <label className="whcard__label">
                        Country
                        <input
                            onChange={e => setCountry(e.target.value)}
                            value={country}
                            onBlur={() => validateField("country", country)}
                            type="text"
                            placeholder="Country"
                            name="country "
                            className={`whcard__input ${
                                failed.country ? "whcard__input--failed" : ""
                            }`}
                        />
                        {failed.country && (
                            <div className="whcard__error-wrp">
                                <img className="whcard__error-img" src={Error} alt="" />
                                <p className="whcard__error-text">This field is required</p>
                            </div>
                        )}
                    </label>
                </div>
                <div className="whcard__contact-wrp">
                    <div className="whcard__sub-header ">Contact Details</div>
                    <label className="whcard__label ">
                        Contact Name
                        <input
                            onChange={e => setContact_name(e.target.value)}
                            value={contact_name}
                            onBlur={() => validateField("contact_name", contact_name)}
                            type="text"
                            placeholder="Contact Name"
                            className={`whcard__input ${
                                failed.contact_name ? "whcard__input--failed" : ""
                            }`}
                            name="contact_name "
                        />
                        {failed.contact_name && (
                            <div className="whcard__error-wrp">
                                <img className="whcard__error-img" src={Error} alt="" />
                                <p className="whcard__error-text">This field is required</p>
                            </div>
                        )}
                    </label>
                    <label className="whcard__label">
                        Position
                        <input
                            onChange={e => setContact_Position(e.target.value)}
                            value={contact_position}
                            onBlur={() => validateField("contact_position", contact_position)}
                            type="text"
                            placeholder="Position"
                            name="contact_position"
                            className={`whcard__input ${
                                failed.contact_position ? "whcard__input--failed" : ""
                            }`}
                        />
                        {failed.contact_position && (
                            <div className="whcard__error-wrp">
                                <img className="whcard__error-img" src={Error} alt="" />
                                <p className="whcard__error-text">This field is required</p>
                            </div>
                        )}
                    </label>
                    <label className="whcard__label">
                        Phone Number
                        <input
                            onChange={e => setContact_phone(e.target.value)}
                            value={contact_phone}
                            onBlur={() => validateField("contact_phone", contact_phone)}
                            type="tel"
                            placeholder="Phone Number"
                            name="contact_phone"
                            className={`whcard__input ${
                                failed.contact_phone ? "whcard__input--failed" : ""
                            }`}
                        />
                        {failed.contact_phone && (
                            <div className="whcard__error-wrp">
                                <img className="whcard__error-img" src={Error} alt="" />
                                <p className="whcard__error-text">
                                    Please enter a valid phone number
                                </p>
                            </div>
                        )}
                    </label>
                    <label className="whcard__label">
                        Email
                        <input
                            onChange={e => setContact_email(e.target.value)}
                            value={contact_email}
                            onBlur={() => validateField("contact_email", contact_email)}
                            type="email"
                            placeholder="Email"
                            name="contact_email "
                            className={`whcard__input ${
                                failed.contact_email ? "whcard__input--failed" : ""
                            }`}
                        />
                        {failed.contact_email && (
                            <div className="whcard__error-wrp">
                                <img className="whcard__error-img" src={Error} alt="" />
                                <p className="whcard__error-text">Please enter a valid email</p>
                            </div>
                        )}
                    </label>
                </div>
            </div>
            <div className="whcard__btns-wrp">
                <button className="whcard__cancel" type="button" onClick={handleBack}>
                    Cancel
                </button>
                <button type="submit" className="whcard__add">
                    {selectedWarehouseId ? "Save" : "+ Add Warehouse"}
                </button>
            </div>
        </form>
    );
}

export default WarehouseForm;
