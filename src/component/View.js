import React,{useEffect,useState} from 'react'
import { Link, useParams } from 'react-router-dom';
export default function View() {

    const [getprod, SetGetprod] = useState([]);

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
            SetGetprod(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getproddata();
    }, [])

    return (
        <div className='container mt-5'>
             <h4>All Product Information</h4>
            <div className='underline'></div>
            <ul className="list-group w-50 mt-4">
                <li className="list-group-item active" aria-current="true">All Information About</li>
                <li className="list-group-item">SKU:- {getprod.sku}</li>
                <li className="list-group-item">Name:-  {getprod.productname}</li>
                <li className="list-group-item">Image:-  {getprod.image}</li>
                <li className="list-group-item">Price:-  {getprod.price}</li>
            </ul>
            <Link className='btn btn-primary mt-5' to="/allprod">Back</Link>
        </div>
    )
}
