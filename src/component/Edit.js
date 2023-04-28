import React, { useState ,useEffect} from 'react'
import { NavLink ,useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Edit() {
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
        const {sku,value}=e.target;
        setInputdata((preprod)=>{
            return{
                ...preprod,[sku]:value
            }
        })
    }


    //get single data product
    const { id } = useParams("");
    console.log(id);

    const getproddata = async () => {
        const res = await fetch(`http://localhost:5000/getprod/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            setInputdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getproddata();
    }, [])

    //update product Data
    const updateprod= async(e)=>{
        e.preventDefault();

        const {sku, image, productname, price,des} =inputdata;
        const res2 = await fetch(`http://localhost:5000/updateprod/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sku,image, productname, price,des
            })
        });
        const data2= await res2.json();
        setInputdata(data2);
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

    return (
        <div className='container mt-5'>
            <h4>Edit Product</h4>
            <div className='underline1'></div>
            <form className='mt-5 shadow p-5 w-75'>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">SKU</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder=" " 
                    onChange={setprod} name="sku" value={inputdata.sku}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">NAME</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder=" "
                    onChange={setprod} name="productname" value={inputdata.productname}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">QTY</label>
                    <input type="number" className="form-control" id="exampleFormControlInput1" placeholder=" " 
                    onChange={setprod} name="price" value={inputdata.price}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Product Description</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder=" "
                    onChange={setprod} name="des" value={inputdata.des}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Product Images</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder=" "
                    onChange={setprod} name="image" value={inputdata.image}/>
                </div>
                <div className='d-flex'>
                         <button className='btn btn-primary' onClick={updateprod}>Save Changes</button>
                         <ToastContainer />
                         <NavLink className='btn btn-primary ms-auto' to="/allprod">Back to Home</NavLink>
                </div>
              

            </form>
        </div>
    )
}
