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
                fieldNames={["field1", "field2", "field3"]}
                records={[
                    { id: "test", field1: "value1", field2: "value2", field3: "value3" },
                    { id: "test", field1: "value1", field2: "value2", field3: "value3" },
                    { id: "test", field1: "value1", field2: "value2", field3: "value3" },
                    { id: "test", field1: "value1", field2: "value2", field3: "value3" },
                    { id: "test", field1: "value1", field2: "value2", field3: "value3" },
                ]}
            />
        </BrowserRouter>
    );
}

export default App;
