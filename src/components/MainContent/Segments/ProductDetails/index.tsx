// Import components from the ProductDetails folder
import ProductDetailsDrawer from './ProductDetailsDrawer';
import DeliveryDetailsDrawer from './DeliveryDetailsDrawer';
import LinkedClaimsDrawer from './LinkedClaimsDrawer';

// Export components to make them available for other files
export {
    ProductDetailsDrawer,
    DeliveryDetailsDrawer,
    LinkedClaimsDrawer
};

// Export a default component if there's a main one
export default ProductDetailsDrawer;

// If there are no components to export yet, use this instead:
// export {};