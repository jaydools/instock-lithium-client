import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "../Grid/Grid";
import Title from "../Title/Title";
import "./WarehouseDetails.scss";

function WarehouseDetails({ warehouseId }) {
    const [warehouseFromId, setWarehouseFromId] = useState({});
    const [warehouseIdInventory, setWarehouseIdInventory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWarehouseFromId = async warehouseId => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/warehouses/${warehouseId}`,
                );
                console.log(response);
                setWarehouseFromId(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        const fetchWarehouseIdInventories = async warehouseId => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/warehouses/${warehouseId}/inventories`,
                );
                console.log(response);
                setWarehouseIdInventory(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchWarehouseFromId(warehouseId || 1);
        fetchWarehouseIdInventories(warehouseId);
    }, [warehouseId]);

    return (
        <>
            {warehouseFromId && warehouseIdInventory ? (
                <>
                    <Title
                        pageTitle={warehouseFromId.warehouse_name}
                        edit="Edit"
                        handleBack={() => navigate("/")}
                        handleEdit={() => {}}
                    />
                    <div className="warehouse-details-container">
                        <div>
                            <h4 className="warehouse-details-container__title">
                                WAREHOUSE ADDRESS:
                            </h4>
                            <div className="warehouse-details-container__address-container">
                                <p className="warehouse-details-container__body">
                                    {warehouseFromId.address},
                                </p>
                                <p className="warehouse-details-container__body">
                                    {warehouseFromId.city}, {warehouseFromId.country}
                                </p>
                            </div>
                        </div>
                        <div className="contact-container">
                            <div className="contact-container__contact-name">
                                <h4 className="item-details-container__title">CONTACT NAME:</h4>
                                <p className="contact-container__body--padding">
                                    {warehouseFromId.contact_name}
                                </p>
                                <p className="item-details-container__body">
                                    {warehouseFromId.contact_position}
                                </p>
                            </div>
                            <div>
                                <h4 className="item-details-container__title">
                                    CONTACT INFORMATION:
                                </h4>
                                <p className="contact-container__body--padding">
                                    {warehouseFromId.contact_phone}
                                </p>
                                <p className="item-details-container__body">
                                    {warehouseFromId.contact_email}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Grid
                        fieldNames={["item_name", "category", "status", "quantity"]}
                        displayNamesMobile={["inventory item", "category", "Status", "Qty"]}
                        displayNamesDesktop={["inventory item", "category", "Status", "quantity"]}
                        records={warehouseIdInventory}
                        linkToDetailsPage={"/inventory"}
                        onEdit={id => console.log(`edited ${id}`)}
                        onDelete={id => console.log(`deleted ${id}`)}
                    />
                </>
            ) : (
                <p>"loading details..."</p>
            )}
        </>
    );
}

export default WarehouseDetails;
