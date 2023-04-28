import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function Allprod() {

    const [getprod, SetGetprod] = useState([]);
    console.log(getprod)
    //get product Data
    const getproddata = async () => {

        const res = await fetch("http://localhost:5000/getprod", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            SetGetprod(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getproddata();
    }, [])

    //Delete product data
    const deleteprod = async (id) => {

        const res2 = await fetch(`http://localhost:5000/deleteprod/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            getproddata();

        }

    }
    //search Prod
    const [searchInput,setSearchInput]=useState('');
    const searchProd=(searchval)=>{
        setSearchInput(searchval)
    }
    return (
        <div className='container mt-5'>
            <div className='d-flex'>
                <h4>PRODUCTS</h4>
                <div class="ms-auto w-50">
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Search for products" 
                        onChange={(e)=>searchProd(e.target.value)}
                    />
                </div>
            </div>
            <div>
            <Link className="navbar-brand  text-blue" to="/addprod">New Product</Link>
            </div>

            <div className='underline'></div>
            <table className="table table-bordered mt-5">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">SKU</th>
                        <th scope="col">IMAGE</th>
                        <th scope="col">PRODUCT NAME</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">  </th>
                        {/* <th scope="col"> </th> */}
                    </tr>
                </thead>
                <tbody>

                    {getprod.filter((val)=>{
                        if(searchInput == ""){
                            return val
                        }else if(val.name.toLowerCase().includes(searchInput.toLowerCase())){
                            return val; 
                        }
                    }).map((result, id) => {
                        return (
                            <>

                                <tr key={id}>
                                    <th scope="row">{id + 1}</th>
                                    <td>{result.sku}</td>
                                    <td>{result.image}</td>
                                    <td>{result.productname}</td>
                                    <td>{result.price}</td>
                                    <td>
                                        <Link className='btn btn-success ms-2' to={`/view/${result._id}`}>View</Link>
                                        <Link className='btn btn-warning ms-2' to={`/edit/${result._id}`}>Update</Link>
                                        <button className='btn btn-danger ms-2'
                                            data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => deleteprod(result._id)}>Delete</button>
                                    </td>
                                </tr>


                            </>
                        )
                    })}




                </tbody>
            </table>

        </div>
    )
}
