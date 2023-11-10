import React from "react";
import "./WarehouseAdd.scss";

import { useState, useEffect } from "react";
import axios from "axios";
import Title from "../Title/Title";
import Error from "../../Assets/Images/error-24px.svg";

function WarehouseAdd({ handleBack }) {
    const API_URL = process.env.REACT_APP_BACKEND_URL;

    const [warehouse_name, setwarehouse_name] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [contact_name, setContact_name] = useState("");
    const [contact_position, setContact_Position] = useState("");
    const [contact_phone, setContact_phone] = useState("");
    const [contact_email, setContact_email] = useState("");

    const [warehouse_nameError, setwarehouse_nameError] = useState(null);
    const [addressError, setAddressError] = useState(null);
    const [cityError, setcityError] = useState(null);
    const [countryError, setCountryError] = useState(null);
    const [contact_nameError, setContact_nameError] = useState(null);
    const [contact_positionError, setContact_PositionError] = useState(null);
    const [contact_phoneError, setContact_phoneError] = useState(null);
    const [contact_emailError, setContact_emailError] = useState(null);

    function validatecontact_phoneNumber(number) {
        const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        return re.test(number);
    }

    function validatecontact_email(contact_email) {
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]*$/;
        return re.test(contact_email);
    }

    async function handleAddWarehouse(event) {
        event.preventDefault();

        if (
            warehouse_nameError === true ||
            addressError === true ||
            cityError === true ||
            countryError === true ||
            contact_nameError === true ||
            contact_positionError === true ||
            contact_phoneError === true ||
            contact_emailError === true
        ) {
        } else {
            try {
                await axios.post(`${API_URL}/api/warehouses`, {
                    warehouse_name: warehouse_name,
                    address: address,
                    city: city,
                    country: country,
                    contact_name: contact_name,
                    contact_position: contact_position,
                    contact_phone: contact_phone,
                    contact_email: contact_email,
                });
            } catch (error) {
                console.log("Failed to post new warehouse:", error);
            }
            handleBack();
        }
    }

    return (
        <form className="whcard " onSubmit={handleAddWarehouse}>
            <Title pageTitle="Add Warehouse" handleBack={handleBack} />
            <div className="whcard__content-wrp">
                <div className="whcard__details-wrp ">
                    <div className="whcard__sub-header ">Warehouse Details</div>
                    <label className="whcard__label ">
                        Warehouse Name
                        <input
                            onChange={e => setwarehouse_name(e.target.value)}
                            type="text "
                            placeholder="Washington "
                            name="warehouse "
                            className="whcard__input "
                        />
                        {warehouse_nameError && (
                            <div className="whcard__error-wrp">
                                <img className="whcard__error-img" src={Error} alt="" />
                                <p className="whcard__error-text">This field is required</p>
                            </div>
                        )}
                    </label>
                    <label className="whcard__label ">
                        Street Adress
                        <input
                            onChange={e => setAddress(e.target.value)}
                            type="text "
                            placeholder="33 Pearl Street SW "
                            name="address "
                            className="whcard__input "
                        />
                        {addressError && (
                            <div className="whcard__error-wrp">
                                <img className="whcard__error-img" src={Error} alt="" />
                                <p className="whcard__error-text">This field is required</p>
                            </div>
                        )}
                    </label>
                    <label className="whcard__label ">
                        City
                        <input
                            onChange={e => setCity(e.target.value)}
                            type="text "
                            placeholder="Washington "
                            name="city "
                            className="whcard__input "
                        />
                        {cityError && (
                            <div className="whcard__error-wrp">
                                <img className="whcard__error-img" src={Error} alt="" />
                                <p className="whcard__error-text">This field is required</p>
                            </div>
                        )}
                    </label>
                    <label className="whcard__label ">
                        Country
                        <input
                            onChange={e => setCountry(e.target.value)}
                            type="text "
                            placeholder="USA "
                            name="country "
                            className="{errorState ? whcard__input error : whcard__card}"
                        />
                        {countryError && (
                            <div className="whcard__error-wrp">
                                <img className="whcard__error-img" src={Error} alt="" />
                                <p className="whcard__error-text">This field is required</p>
                            </div>
                        )}
                    </label>
                </div>
                <div className="whcard__contact-wrp ">
                    <div className="whcard__sub-header ">Contact Details</div>
                    <label className="whcard__label ">
                        Contact Name
                        <input
                            onChange={e => setContact_name(e.target.value)}
                            type="text "
                            placeholder="Graeme Lyon "
                            className="whcard__input "
                            name="contact_name "
                        />
                        {contact_nameError && (
                            <div className="whcard__error-wrp">
                                <img className="whcard__error-img" src={Error} alt="" />
                                <p className="whcard__error-text">This field is required</p>
                            </div>
                        )}
                    </label>
                    <label className="whcard__label ">
                        contact_position
                        <input
                            onChange={e => setContact_Position(e.target.value)}
                            type="text "
                            placeholder="Warehouse Manager "
                            name="contact_position "
                            className="whcard__input "
                        />
                        {contact_positionError && (
                            <div className="whcard__error-wrp">
                                <img className="whcard__error-img" src={Error} alt="" />
                                <p className="whcard__error-text">This field is required</p>
                            </div>
                        )}
                    </label>
                    <label className="whcard__label ">
                        contact_phone Number
                        <input
                            onChange={e => setContact_phone(e.target.value)}
                            type="text "
                            placeholder="+1(647)504-0911 "
                            name="contact_phone "
                            className="whcard__input "
                        />
                        {contact_phoneError && (
                            <div className="whcard__error-wrp">
                                <img className="whcard__error-img" src={Error} alt="" />
                                <p className="whcard__error-text">
                                    Please Enter a Valid Phone Number
                                </p>
                            </div>
                        )}
                    </label>
                    <label className="whcard__label ">
                        contact_email
                        <input
                            onChange={e => setContact_email(e.target.value)}
                            type="contact_email"
                            placeholder="glyon@instock.com "
                            name="contact_email "
                            className="whcard__input "
                        />
                    </label>
                    {contact_emailError && (
                        <div className="whcard__error-wrp">
                            <img className="whcard__error-img" src={Error} alt="" />
                            <p className="whcard__error-text">Pleasee Enter a Valid Email</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="whcard__btns-wrp">
                <button className="button--primary">Cancel</button>
                <button type="submit" className="button--primary">
                    + Add Warehouse
                </button>
            </div>
        </form>
    );
}

export default WarehouseAdd;
