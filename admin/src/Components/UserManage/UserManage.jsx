import React,{useState,useEffect} from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import Toggler from './Toggler';

function UserManage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/admin/getallusers`)
      .then(response =>{
        setUsers(response.data)
      }  
      )
      .catch(error => console.error(error));
  }, []);

  return (
    <div className='mt-3' style={{width:"100%"}}>
    <MDBTable align='middle' className='w-100'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Location</th>
          <th scope='col'>occupation</th>
          <th scope='col'>Block/UnBlock</th>
          <th scope='col'>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody style={{overflow:"scroll"}}>
        

      {users.map(user => (
          // <li key={user.id}>{user.name}</li>

          <tr key={user._id}>
          <td>
            <div className='d-flex align-items-center'>
              {/* <img
                src='https://mdbootstrap.com/img/new/avatars/6.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              /> */}
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{user.firstName} {user.lastName}</p>
                <p className='text-muted mb-0'>{user.email}</p>
              </div>
            </div>
          </td>
          <td>
            <p className='text-muted mb-0'>{user.location}</p>
          </td>
          <td>
            <p className='text-muted mb-0'>{user.occupation}</p>
          </td>
          <td>
          {/* <CheckCircleIcon sx={{color:"green"}}/>
          <Switch  defaultChecked color="warning" /> */}

          <Toggler userId={user}/>
          </td>
          <td>
            <MDBBtn color='link' rounded size='sm'>
              Details
            </MDBBtn>
          </td>
        </tr>

          
        ))}
        
        
      </MDBTableBody>
    </MDBTable>
    </div>
  );
}

export default UserManage