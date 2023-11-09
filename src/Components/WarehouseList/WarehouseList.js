import React from "react";
import Grid from "../Grid/Grid";
import Title from "../Title/Title";
import "./WarehouseList.scss";

function WarehouseList() {
    return (
        <div className="warehouse-list">
            <Title />
            <Grid
                fieldNames={["field1", "status", "field2", "field3", "field4"]}
                displayNamesMobile={["Inventory Item", "Status", "Category", "Warehouse", "QTY"]}
                displayNamesDesktop={[
                    "Inventory Item",
                    "Status",
                    "Category",
                    "Warehouse",
                    "Quantity",
                ]}
                records={[
                    {
                        id: "1",
                        field1: "value1",
                        status: "In Stock",
                        field2: "value3",
                        field3: "value4",
                        field4: "value5",
                    },
                    {
                        id: "2",
                        field1: "value1",
                        status: "In Stock",
                        field2: "value3",
                        field3: "value4",
                        field4: "value5",
                    },
                    {
                        id: "3",
                        field1: "value1",
                        status: "Out of Stock",
                        field2: "value3",
                        field3: "value4",
                        field4: "value5",
                    },
                ]}
                linkToDetailsPage={"/inventory"}
                onEdit={() => console.log("edited")}
                onDelete={() => console.log("deleted")}
            />
        </div>
    );
}

export default WarehouseList;
