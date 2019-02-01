import React from 'react';
const productMode = process.env.REACT_APP_PRODUCT_MODE || 'sample';
export default React.createContext(productMode);