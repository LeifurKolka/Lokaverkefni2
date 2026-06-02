import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./features/home/HomePage";
import { ProductDetailsPage } from "./features/product-details/ProductDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:slug" element={<ProductDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;