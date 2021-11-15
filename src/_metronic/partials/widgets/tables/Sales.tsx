
/* eslint-disable jsx-a11y/anchor-is-valid */ 
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
// import { saveSales } from '../../../../setup/redux/sales/salesActions'
import { useAppDispatch, useAppSelector } from '../../../../setup/redux/useRedux'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'

type Props = {
  className: string,
  datum?: any  
}

const SalesTable: React.FC<Props> = ({ className, datum }) => {

  const [sale, setsale] = useState([]);

  const location = useLocation();
  const history = useHistory();

  const user = useAppSelector(state => state.user);

  let userStorage: any = window.localStorage.getItem('user');
  userStorage = JSON.parse(`${userStorage}`);

  const userToken = useAppSelector(state => state.user.auth.accessToken) || userStorage.auth.accessToken;

  const fetchSales = async () => {

    // console.log(userToken);

    const config = {
      headers: { Authorization: `Bearer ${userToken}` }
    }

    try {
      let res = await axios.get('http://localhost:8000/api/sales', config);

      if (res) {

        window.localStorage.setItem('sales', JSON.stringify(res.data))
        setsale(res.data);
      }

    } catch (error: any) {      
      alert(error.message ?? error)
    }
  }


  useEffect(() => {
   fetchSales();
  }, []);


  useEffect(() => {
    
     let salesStorage: any = window.localStorage.getItem('sales');
      salesStorage =JSON.parse(`${salesStorage}`); 
    if (salesStorage && sale.length === 0) {
      setsale(salesStorage)
    }
   }, []);

   useEffect(() => {
    setsale(datum)
   }, [datum]);


  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>Sales</span>
        </h3>

        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Go to Sales Page'
        >
          {
            location.pathname === '/dashboard' &&
            <button className='btn btn-sm btn-primary' onClick={() => history.push('/crafted/pages/sales')}>
              View All
            </button>
          }
        </div>
      </div>


      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bolder text-muted'>
                <th className='min-w-120px'>Date</th>
                <th className='min-w-150px'>Material</th>
                <th className='min-w-100px'>Meter</th>
                <th className='min-w-100px'>Payment</th>
                <th className='min-w-120px'>Cost</th>
                <th className='min-w-150px'>Issued By</th>
                {/* <th className='min-w-150px'>Issued To</th> */}
                <th className='min-w-120px text-end'>Balance</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>

              { sale ?
                sale?.map((data: any) => {
/*
{
        "id": 1,
        "material": "sfsfasdsas",
        "meter": "23234",
        "payment": "23423",
        "cost": "2141",
        "balance": "2123",
        "created_at": "2021-11-09T11:28:08.000000Z",
        "updated_at": "2021-11-09T11:28:08.000000Z"
    }
*/
                  return (<tr>

                  <td>
                    <span className='text-dark fw-bolder fs-6'>
                      {data.created_at}
                    </span>
                  </td>
                  <td>
                    <span className='text-dark fw-bolder fs-6'>
                     {data.material}
                    </span>
                  </td>
                  <td>
                    <span className='text-dark fw-bolder fs-6'>
                      {data.meter}
                    </span>
  
                  </td>
                  <td>
                    <span className='text-dark fw-bolder fs-6'>
                      ₦{data.payment}
                    </span>
                  </td>
                  <td className='text-dark fw-bolder fs-6'>₦{data.cost}</td>
                  <td>
                    <div className='d-flex align-items-center' style={{ pointerEvents: 'none' }}>
                      <div className='symbol symbol-30px me-3'>
                        <img src={toAbsoluteUrl('/media/avatars/blank.png')} alt='' />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <a href='#' className='text-dark fw-bolder fs-6'>     
                          {data.issuer}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className='text-end'>
                    {/* <a
                     href='#'
                     className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                   >
                     <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                   </a>
                   <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                     <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                   </a> */}
                    <span className='text-dark fw-bolder fs-6'>₦{data.balance}</span>
  
                  </td>
                </tr>)
                }) :

                <tr><h2 style={{ margin: '1rem auto', width: '200px' }}>No Sales Data</h2></tr>        
              }
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export { SalesTable }
