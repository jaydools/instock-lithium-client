import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Warehouses from "./Pages/Warehouses/Warehouses";
import Inventory from "./Pages/InventoryPage/InventoryPage";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Warehouses />} />
                <Route path="/warehouses/:id/*" element={<Warehouses />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/inventory/:id/*" element={<Inventory />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
