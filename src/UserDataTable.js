import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';

//jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

const baseUrl = 'http://localhost:8080/'

function UserDataTable() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(baseUrl + 'formDetails').then(res => {
            console.log(JSON.stringify(res.data));
            setData(res.data);
        });
        //initialize dataTable with some timeout so the API data gets appended in jquery dataTable
        $(document).ready(function () {
            setTimeout(function () {
                $('#myTable').DataTable();
            }, 1000);
        });
    }, []);

    return (
        <div className='my-3'>
            <table id='myTable' className="table table-hover table-striped table-bordered" style={{ width: '100%' }} >
                <thead>
                    <tr style={{ background: '#ecffe6' }}>
                        <th>Name</th>
                        <th>Sex</th>
                        <th>Age</th>
                        <th>Mobile</th>
                        <th>Address</th>
                        <th>Parent Name</th>
                        <th>Govt IdType</th>
                        <th>Govt Id</th>
                        <th>Nationality</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(userData => (
                            <tr>
                                <td>{userData.userName}</td>
                                <td>{userData.sex}</td>
                                <td>{userData.age}</td>
                                <td>{userData.mobile_number}</td>
                                <td>{userData.address}</td>
                                <td>{userData.guardian_name}</td>
                                <td>{userData.govtIdType}</td>
                                <td>{userData.govtId}</td>
                                <td>{userData.nationality}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default UserDataTable;
