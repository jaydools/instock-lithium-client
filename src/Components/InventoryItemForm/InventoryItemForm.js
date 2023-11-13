import "./InventoryItemForm.scss";
import Title from "../../Components/Title/Title";
import { useEffect, useState } from "react";
import axios from "axios";

function InventoryItemForm({ handleBack, selectedInventoryID }) {
    const [fields, setFields] = useState({
        item_name: "",
        description: "",
        category: "",
        status: "In Stock",
        quantity: "",
        warehouse_id: "",
    });
    const [invalidFields, setInvalidFields] = useState([]);
    const [categories, setCategories] = useState([]);
    const [warehouses, setWarehouses] = useState([]);

    const validateField = (field, value, updateState = true) => {
        const fieldWasValid = !invalidFields.includes(field);
        let fieldIsValid = fields[field] !== "";

        if (field === "quantity") {
            fieldIsValid = /^\d+$/.test(value);
        }

        if (fieldIsValid !== fieldWasValid && updateState) {
            fieldWasValid
                ? setInvalidFields([...invalidFields, field])
                : setInvalidFields(invalidFields.filter(inval => inval !== field));
        }

        return fieldIsValid;
    };

    const handleFieldChange = (field, value) => {
        const newFields = { ...fields };
        newFields[field] = value;
        setFields({ ...newFields });
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const newInvalidFields = Object.keys(fields).filter(
            field => !validateField(field, fields[field], false),
        );
        setInvalidFields([...newInvalidFields]);

        if (newInvalidFields.length) return;

        const body = {
            item_name: fields.item_name,
            description: fields.description,
            category: fields.category,
            status: fields.status,
            quantity: fields.status === "In Stock" ? parseInt(fields.quantity) : 0,
            warehouse_id: parseInt(fields.warehouse_id),
        };

        try {
            if (selectedInventoryID) {
                await axios.put(
                    `${process.env.REACT_APP_BACKEND_URL}/api/inventories/${selectedInventoryID}`,
                    body,
                );
            } else {
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/inventories`, body);
            }
        } catch (error) {
            console.log(
                `Failed to ${selectedInventoryID ? "PUT" : "POST new"} inventory item.`,
                error,
            );
        }

        handleBack();
    };

    useEffect(() => {
        const getLists = async () => {
            const categoryResponse = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/inventories/categories`,
            );
            const warehouseResponse = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/warehouses`,
            );
            setCategories(categoryResponse.data);
            setWarehouses(warehouseResponse.data);

            if (!selectedInventoryID) {
                setFields({
                    item_name: "",
                    description: "",
                    category: "",
                    status: "In Stock",
                    quantity: "",
                    warehouse_id: `${warehouseResponse.data[0].id}`,
                });
            }
        };
        const getItemData = async () => {
            const { data } = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/inventories/${selectedInventoryID}`,
            );
            setFields({
                category: data.category,
                description: data.description,
                item_name: data.item_name,
                quantity: `${data.quantity}`,
                status: data.status,
                warehouse_id: `${data.warehouse_id}`,
            });
        };

        if (selectedInventoryID) {
            getItemData();
        }
        getLists();
    }, []);

    return (
        <section className="item-form">
            <Title
                pageTitle={selectedInventoryID ? "Edit Inventory Item" : "Add New Inventory Item"}
                handleBack={handleBack}
            />
            <form action="" className="item-form__form" onSubmit={handleSubmit} noValidate>
                <fieldset className="item-form__fieldset">
                    <h2 className="item-form__subheading">Item Details</h2>
                    <label className="item-form__label">
                        Item Name
                        <input
                            type="text"
                            className={`item-form__text ${
                                invalidFields.includes("item_name")
                                    ? "item-form__text--invalid"
                                    : ""
                            }`}
                            placeholder="Item Name"
                            name="item_name"
                            onChange={event => handleFieldChange("item_name", event.target.value)}
                            value={fields.item_name}
                            onBlur={event => validateField("item_name", fields.item_name)}
                        />
                    </label>
                    <label className="item-form__label">
                        Description
                        <textarea
                            className={`item-form__textarea ${
                                invalidFields.includes("description")
                                    ? "item-form__textarea--invalid"
                                    : ""
                            }`}
                            placeholder="Please enter a brief item description..."
                            name="description"
                            onChange={event => handleFieldChange("description", event.target.value)}
                            value={fields.description}
                            onBlur={event => validateField("description", fields.description)}
                        ></textarea>
                    </label>
                    <label className="item-form__label">
                        Category
                        <select
                            className="item-form__select"
                            name="category"
                            onChange={event => handleFieldChange("category", event.target.value)}
                            value={fields.category}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </label>
                </fieldset>
                <fieldset className="item-form__fieldset">
                    <h2 className="item-form__subheading">Item Availability</h2>
                    <div className="item-form__radio-buttons">
                        <p className="item-form__subheading">Status</p>
                        <label className="item-form__radio-text">
                            <input
                                type="radio"
                                className={`item-form__radio ${
                                    invalidFields.includes("status")
                                        ? "item-form__radio--invalid"
                                        : ""
                                }`}
                                name="status"
                                value="In Stock"
                                checked={fields.status === "In Stock"}
                                onChange={event => handleFieldChange("status", event.target.value)}
                            />
                            In stock
                        </label>
                        <label className="item-form__radio-text">
                            <input
                                type="radio"
                                className={`item-form__radio ${
                                    invalidFields.includes("status")
                                        ? "item-form__radio--invalid"
                                        : ""
                                }`}
                                name="status"
                                value="Out of Stock"
                                checked={fields.status === "Out of Stock"}
                                onChange={event => handleFieldChange("status", event.target.value)}
                            />
                            Out of stock
                        </label>
                    </div>
                    <label htmlFor="" className="item-form__label">
                        Warehouse
                        <select
                            name="warehouse"
                            className="item-form__select"
                            onChange={event =>
                                handleFieldChange("warehouse_id", event.target.value)
                            }
                            value={fields.warehouse_id}
                        >
                            {warehouses.map(warehouse => (
                                <option key={warehouse.id} value={warehouse.id}>
                                    {warehouse.warehouse_name}
                                </option>
                            ))}
                        </select>
                    </label>
                    {fields.status === "In Stock" && (
                        <label className="item-form__label">
                            Quantity
                            <input
                                className={`item-form__text ${
                                    invalidFields.includes("quantity")
                                        ? "item-form__text--invalid"
                                        : ""
                                }`}
                                type="text"
                                name="quantity"
                                onChange={event =>
                                    handleFieldChange("quantity", event.target.value)
                                }
                                onBlur={event => validateField("quantity", fields.quantity)}
                                value={fields.quantity}
                            />
                        </label>
                    )}
                </fieldset>
                <button
                    className="item-form__button item-form__button--cancel"
                    type="button"
                    onClick={handleBack}
                >
                    Cancel
                </button>
                <button className="item-form__button item-form__button--update">
                    {selectedInventoryID ? "Save" : "+ Add Item"}
                </button>
            </form>
        </section>
    );
}

export default InventoryItemForm;
