import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Galleria } from 'primereact/galleria';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { useAddProductMutation } from '../order/ordersApiSlice';

const ProductItem = () => {
    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const navigate = useNavigate();
    const [addProduct] = useAddProductMutation();
    const [visible, setVisible] = useState(false);

    const responsiveOptions = [
        { breakpoint: '991px', numVisible: 4 },
        { breakpoint: '767px', numVisible: 3 },
        { breakpoint: '575px', numVisible: 1 }
    ];

    const itemTemplate = (item) => {
        return <img src={`${item}`} alt={item.alt} style={{ width: '100%', maxHeight: '400px' }} />
    };

    const thumbnailTemplate = (item) => {
        return <img src={`${item}`} alt={item.alt} style={{ maxWidth: '100px', maxHeight: '100px' }} />
    };

    const handleClick = () => {
        navigate(`/basket`);
    };

    const handleClickAddToBasket = () => {
        //addProduct(productId);
        setVisible(true);
    };

    return (
        <div className="card">
            <h1 style={{ fontFamily: "Arial", color: "blue", fontSize: '32px', marginBottom: '10px' }}>{name}</h1>
            <p style={{ fontFamily: "Arial", color: "black", fontSize: '20px', marginBottom: '20px' }}>{description}</p>

            <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '450px' }}
                item={itemTemplate} thumbnail={thumbnailTemplate} />

            <h2 style={{ fontFamily: "Arial", color: "green", fontSize: '24px', marginTop: '20px' }}>מחיר: {price} ₪</h2>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button style={{ backgroundColor: "orange", color: "black" }} onClick={handleClickAddToBasket} label="הוסף לסל" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Dialog header='המוצר נוסף לסל' visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <p>המוצר נוסף לסל בהצלחה.</p>
                    <Button label="עבור לסל קניות" icon="pi pi-shopping-cart" onClick={handleClick} className="p-button-text" />
                </Dialog>
            </div>
        </div>
    );
};

export default ProductItem;
