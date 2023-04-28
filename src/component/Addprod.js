import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function Addprod() {
    const navigate = useNavigate();
    const [inputdata,setInputdata]=useState({
        "sku":"",
        "image":"",
        "productname":"",
        "price":"",
        "des":""
    })
    
    //onchange function
    const setprod=(e)=>{
        console.log(e.target.value);
        setInputdata({ ...inputdata, [e.target.sku]: e.target.value });   
    }
    //onclick event
    const addinpdata = async (e) => {
        e.preventDefault();

        const { sku, image, productname, price, des } = inputdata;

        const res = await fetch("http://localhost:5000/addprod", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sku,image, productname, price,des
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            setInputdata(data);
            toast.success('Please wait  !', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true, 
                progress: undefined,
                });
            setTimeout(() => {
                navigate('/allprod');
              }, 3000);

        }
    }
    return (
        <div classname='container mt-5'>
            <h4>New Products Information</h4>
            <div classname='underline1'></div>
            <form classname='mt-5 shadow p-5 w-75'>
                <div classname="mb-3">
                    <label htmlFor="exampleFormControlInput1" classname="form-label">SKU</label>
                    <input type="text" classname="form-control" id="exampleFormControlInput1" placeholder="Enter sku" 
                    onChange={setprod} name="sku" value={inputdata.sku}/>
                </div>
                
                <div classname="mb-3">
                    <label htmlFor="exampleFormControlInput1" classname="form-label">Name</label>
                    <input type="text" classname="form-control" id="exampleFormControlInput1" placeholder="Enter productname" 
                    onChange={setprod} name="productname" value={inputdata.productname}/>
                </div>
                <div classname="mb-3">
                    <label htmlFor="exampleFormControlInput1" classname="form-label">QTY</label>
                    <input type="number" classname="form-control" id="exampleFormControlInput1" placeholder="Enter price "
                    onChange={setprod} name="price" value={inputdata.price}/>
                </div>
                <div classname="mb-3">
                    <label htmlFor="exampleFormControlInput1" classname="form-label">Product Description</label>
                    <input type="text" classname="form-control" id="exampleFormControlInput1" placeholder=" Enter product Description"
                    onChange={setprod}  name="des" value={inputdata.des}/>
                </div>
                <div classname="mb-3">
                    <label htmlFor="exampleFormControlInput1" classname="form-label">Product images</label>
                    <input type="text" classname="form-control" id="exampleFormControlInput1" placeholder=" image"
                    onChange={setprod} name="image" value={inputdata.image}/>
                </div>
                <div classname='d-flex'>
                         <button classname='btn btn-primary' onClick={addinpdata}>Add Product</button>
                         <ToastContainer />
                         <NavLink classname='btn btn-primary ms-auto' to="/allprod">Back to Home</NavLink>
                </div>
              

            </form>
        </div>
    )
}
