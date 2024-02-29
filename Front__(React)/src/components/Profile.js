import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../App';
import { toast } from 'react-toastify';
import { Button, ButtonGroup, Input, Link } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const { uservalue } = useContext(Context)
    const { isAdminvalue } = useContext(Context)
    const { userEmailValue } = useContext(Context)
    const [user] = uservalue
    const [is_admin] = isAdminvalue
    const [userEmail] = userEmailValue
    const [userData, setUserData] = useState({ name: '', email: '', });
    const [editing, setEditing] = useState(false);
    const token = sessionStorage.getItem('token')
    const tokenData = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
    }
    const SERVER = 'https://super-django-1.onrender.com/'


    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = () => {
        // Make a PUT request to update user data on the server
        console.log(`will send this:  data: ${userData.name}, token: ${tokenData}`);
        axios.put(SERVER + 'upduser', { name: userData.name, email: userData.email }, { headers: tokenData })
            .then(response => {
                console.log('User data updated successfully:', response.data);
                setEditing(false)
                sessionStorage.removeItem('token')
                toast.info('Updated successfuly! Now you need to login again with new details')
                navigate('/login')
            })
            .catch(error => {
                console.error('Error updating user data:', error);
                toast.error('Error updating user');
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div>
            <h2>Profile</h2>
            {editing ? ( // display when editing
                <div>
                    <label>Name:</label>
                    <Input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label>Email:</label>
                    <Input
                        type="text"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                    /><br />
                    <Button onClick={handleSaveClick}>Save changes</Button>
                </div>
            ) : (
                //display when not editing
                <div>
                    <p><strong>Name:</strong> {user}</p>
                    <p><strong>Email:</strong> {userEmail}</p>
                    {is_admin && <h3>You have admin permission</h3>}
                    {is_admin && <a href="https://super-market-admin.netlify.app/" target="_blank" rel="noopener noreferrer">Go to admin site</a>}<br />
                    <Button onClick={handleEditClick}>Edit profile</Button>
                </div>
            )}
        </div>
    );
};

export default Profile;
