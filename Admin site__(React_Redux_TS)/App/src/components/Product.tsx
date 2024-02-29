import React, {  useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addProductsAsync, fetchProductsAsync, selectProducts } from '../features/products/productsSlice'
import ProdDisp from './ProdDisp'
import { Button, ButtonBase, Grid, Input, MenuItem, Select } from '@mui/material'

const Product = () => {
    const products = useAppSelector(selectProducts)
    const dispatch = useAppDispatch()
    const [add, setadd] = useState(false)
    const [newProductDesc, setNewProductDesc] = useState('')
    const [newProductPrice, setNewProductPrice] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selctedFile, setselctedFile] = useState<File|any >(null)



    useEffect(() => {
        dispatch(fetchProductsAsync())
    }, [products, dispatch])

    
    const handleAddProduct = () => {
        const formData = new FormData();
        formData.append('desc', newProductDesc);
        formData.append('price', newProductPrice);
        formData.append('ctg', selectedCategory);
        if (selctedFile) formData.append('img', selctedFile)

        dispatch(addProductsAsync(formData));
        setadd(false);
        dispatch(fetchProductsAsync());
    };

    const handleFileChange = (e: any) => {
        setselctedFile(e.target.files[0])
    }

    return (
        <>
            <Button onClick={() => setadd(true)}>Add new product</Button>
            {add && (
                <><br />
                    <Input
                        placeholder="Enter product description"
                        value={newProductDesc}
                        onChange={(e) => setNewProductDesc(e.target.value)}
                    /><br />
                    <Input
                        type='number'
                        placeholder="Enter product price"
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice((e.target.value))}
                    /><br />
                    <Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{ marginTop: '10px' }}
                    >
                        <MenuItem value={2}>Meat and fish</MenuItem>
                        <MenuItem value={3}>Fruits</MenuItem>
                        <MenuItem value={4}>Drinks</MenuItem>
                        <MenuItem value={5}>Baking Products</MenuItem>
                        <MenuItem value={6}>Snacks</MenuItem>
                    </Select><br />
                    <ButtonBase >
                        <input type="file" id="file-input" name="ImageStyle" onChange={handleFileChange} />
                    </ButtonBase><br /><br />
                    <Button onClick={handleAddProduct}>Submit</Button>
                    <Button onClick={() => setadd(false)}>Cancel</Button>
                </>
            )}
            <Grid container spacing={1}>
                {Array.isArray(products) && products.map(product =>
                    <ProdDisp
                        key={product.id}
                        desc={product.desc}
                        price={product.price}
                        id={product.id}
                        img={product.img}
                    />)}
            </Grid>
        </>
    )
}


export default Product