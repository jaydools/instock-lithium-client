import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "../Grid/Grid";
import Title from "../Title/Title";
import "./WarehouseDetails.scss";
import WarehouseForm from "../WarehouseForm/WarehouseForm";
import InventoryItemDelete from "../InventoryItemDelete/InventoryItemDelete";

function WarehouseDetails({ warehouseId }) {
    const [warehouseFromId, setWarehouseFromId] = useState({});
    const [warehouseIdInventory, setWarehouseIdInventory] = useState([]);
    const [editingWarehouse, setEditingWarehouse] = useState(false);
    const navigate = useNavigate();
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedInventoryID, setSelectedInventoryID] = useState(null);

    const toggleEditingWarehouse = () => setEditingWarehouse(!editingWarehouse);

    const handleDeleteClick = id => {
        setSelectedInventoryID(id);
        setShowDeletePopup(true);
    };

    useEffect(() => {
        const fetchWarehouseFromId = async warehouseId => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/warehouses/${warehouseId}`,
                );
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
                setWarehouseIdInventory(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (editingWarehouse) return;
        fetchWarehouseFromId(warehouseId || 1);
        fetchWarehouseIdInventories(warehouseId);
    }, [warehouseId, editingWarehouse]);

    return (
        <>
            {editingWarehouse ? (
                <WarehouseForm
                    handleBack={toggleEditingWarehouse}
                    selectedWarehouseId={warehouseId}
                />
            ) : warehouseFromId && warehouseIdInventory ? (
                <>
                    <Title
                        pageTitle={warehouseFromId.warehouse_name}
                        edit="Edit"
                        handleBack={() => navigate("/")}
                        handleEdit={toggleEditingWarehouse}
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
                        onDelete={handleDeleteClick}
                    />

                    {showDeletePopup && (
                        <InventoryItemDelete
                            onClose={() => setShowDeletePopup(false)}
                            inventoryData={warehouseIdInventory.find(
                                item => item.id === selectedInventoryID,
                            )}
                            endpoint={`${process.env.REACT_APP_BACKEND_URL}/api/inventories/${selectedInventoryID}`}
                        />
                    )}
                </>
            ) : (
                <p>"loading details..."</p>
            )}
        </>
    );
}

export default WarehouseDetails;
