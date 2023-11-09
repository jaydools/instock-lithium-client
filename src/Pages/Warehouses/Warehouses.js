import React from "react";
import "./Warehouses.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import WarehouseDetails from "../../Components/WarehouseDetails/WarehouseDetails";

function Warehouses() {
    const { warehouseId } = useParams();

    return <>{warehouseId && <WarehouseDetails warehouseId={warehouseId} />}</>;
}

export default Warehouses;
