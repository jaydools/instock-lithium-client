import { useParams } from "react-router-dom";
import "./Warehouses.scss";
import WarehouseList from "../../Components/WarehouseList/WarehouseList";
import WarehouseDetails from "../../Components/WarehouseDetails/WarehouseDetails";

function Warehouses() {
    const { id } = useParams();
    return <main className="warehouses">{!id ? <WarehouseList /> : <WarehouseDetails />}</main>;
    return;
}

export default Warehouses;
