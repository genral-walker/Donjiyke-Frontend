
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { addSales } from '../../../../setup/redux/reducers/sales'
// import { saveSales } from '../../../../setup/redux/sales/salesActions'
import http, { useAppDispatch, useAppSelector } from '../../../../setup/redux/useRedux'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'

// SALES COMPONENT    

type Props = {
  className: string
}

const SalesTable: React.FC<Props> = ({ className }) => {

  const location = useLocation();
  const history = useHistory();

  const dispatch = useAppDispatch();
  const sales = useAppSelector(state => state.sales);


 const fetchSales = async () => {

    try {
      let res = await http.get('/sales');

      if (res) {
        dispatch(addSales(res.data))
      }

    } catch (error: any) {
      console.log(error.message ?? error)
      alert('Network error loading sales data. Please refresh the page.')  
    }
  }


  useEffect(() => {
    fetchSales();
  }, []);


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
          <div className="border-bottom border-gray-400 text-center mb-5"><th className='text-gray-900 card-label fw-bolder fs-6 d-block my-3'>ROW 1</th></div>
          <table className='table table-row-bordered table-row-gray-400 align-middle gs-0 gy-3'>
            {/* begin::Table head */}
            <thead>  
              <tr className='fw-bolder text-muted text-gray-700'>
              <th className='min-w-50px'>S/N</th>
                <th className='min-w-120px'>Date In</th>
                <th className='min-w-120px'>Metre Run</th>   
                <th className='min-w-100px'>Date Out</th>         
                <th className='min-w-100px'>Metre Out</th>
                <th className='min-w-120px'>Issued By</th>
                {/* <th className='min-w-150px text-end'>Issued To</th> */}
                <th className='min-w-120px'>Balance</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {sales ?
                sales?.map((data: any) => {
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

                <tr><td colSpan={10}><h3 style={{ margin: '1rem auto', width: 'max-content' }}>No Sales Data</h3></td></tr> 
                // <tr style={{ background: 'blue', width: '100% !important' }}> <th scope="row" style={{ margin: '1rem auto', width: '100%', background: 'grey' }}>ROW 1</th></tr>   
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
