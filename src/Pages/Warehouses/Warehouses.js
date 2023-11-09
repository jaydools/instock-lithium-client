import React from "react";
import "./Warehouses.scss";
import InventoryItemDetails from "../../Components/InventoryItemDetails/InventoryItemDetails";
import Title from "../../Components/Title/Title";

function Warehouses() {
    return (
        <body>
            {/* INSERT YOUR COMPONENT HERE TO PREVIEW */}
            <Title pageTitle="Invetory Details" edit="Edit" backUrl="/warehouses" />
            <InventoryItemDetails />
        </body>
    );
}

export default Warehouses;
