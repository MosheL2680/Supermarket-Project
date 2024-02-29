import React, { useState } from 'react';
import { IProduct, delProductsAsync, updateProductAsync } from '../features/products/productsSlice';
import { FaShekelSign } from 'react-icons/fa';

import { Button, Card, CardActions, CardContent, CardMedia, Typography, Input } from '@mui/material';
import { useAppDispatch } from '../app/hooks';

const ProdDisp = (p: IProduct) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedDesc, setUpdatedDesc] = useState(p.desc);
  const [updatedPrice, setUpdatedPrice] = useState(p.price);

  const handleUpdate = (Id: any) => {
    let data = { desc: updatedDesc, price: updatedPrice };
    dispatch(updateProductAsync({ id: Id, data: data }));
    setIsEditing(false);
  };

  return (
    <Card sx={{ maxWidth: 280 }} style={{ margin: 10 }}>
      <CardMedia sx={{ height: 140 }} image={`https://super-django-1.onrender.com${p.img}`} title={p.desc} />
      <CardContent>
        {isEditing ? (
          <>
            <Input
              value={updatedDesc}
              onChange={(e) => setUpdatedDesc(e.target.value)}
              placeholder="Enter product description"
            />
            <Input
              type="number"
              value={updatedPrice}
              onChange={(e) => setUpdatedPrice(Number(e.target.value))}
              placeholder="Enter product price"
            />
          </>
        ) : (
          <>
            <Typography gutterBottom variant="h5" component="div">
              {p.desc}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {p.price}
              <FaShekelSign />
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        {isEditing ? (
          <Button size="small" onClick={()=>handleUpdate(p.id)}>
            Save
          </Button>
        ) : (
          <>
            <Button size="small" onClick={() => dispatch(delProductsAsync(p.id))}>
              delete product
            </Button>
            <Button size="small" onClick={() => setIsEditing(true)}>
              update details
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default ProdDisp;
