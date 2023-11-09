// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./Components/Header/Header";
// import Footer from "./Components/Footer/Footer";
// import Warehouses from "./Pages/Warehouses/Warehouses";
// import Inventory from "./Pages/InventoryPage/InventoryPage";

// function App() {
//     return (
//         <BrowserRouter>
//             <Header />
//             <Routes>
//                 <Route path="/" element={<Warehouses />} />
//                 <Route path="/warehouses" element={<Warehouses />} />
//                 <Route path="/warehouses/:id" element={<Warehouses />} />
//                 <Route path="/inventory" element={<Inventory />} />
//                 <Route path="/inventory/:id" element={<Inventory />} />
//             </Routes>
//             <Footer />
//         </BrowserRouter>
//     );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Warehouses from "./Pages/Warehouses/Warehouses";
import Inventory from "./Pages/InventoryPage/InventoryPage";
import Grid from "./Components/Grid/Grid";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Warehouses />} />
                <Route path="/warehouses" element={<Warehouses />} />
                <Route path="/warehouses/:id" element={<Warehouses />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/inventory/:id" element={<Inventory />} />
            </Routes>
            <Footer />

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
        </BrowserRouter>
    );
}

export default App;
