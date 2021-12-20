/* eslint-disable jsx-a11y/anchor-is-valid */
// STOCKS COMPONENT 
import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router'
import { addStock } from '../../../../setup/redux/reducers/stocks'
import http, { useAppDispatch, useAppSelector } from '../../../../setup/redux/useRedux'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'


type Props = {
  className: string
}

const TablesWidget13: React.FC<Props> = ({ className }) => {

  const dispatch = useAppDispatch()
  const stocks = useAppSelector(state => state.stocks)

  const location = useLocation();
  const history = useHistory();


  const fetchStocks = async () => {

    try {
      let res = await http.get('/stocks');

      if (res) {
        dispatch(addStock(res.data))
      }

    } catch (error: any) {
      console.log(error);
      alert('Network error loading stocks data. please refresh the page.')
    }
  }



  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>Stocks</span>
        </h3>

        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Go to Stocks Page'
        >
          {
            location.pathname === '/dashboard' &&
            <button className='btn btn-sm btn-primary' onClick={() => history.push('/crafted/pages/stocks')}>
              View All
            </button>
          }

        </div>
      </div>


      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-bordered table-row-gray-400 align-middle gs-0 gy-3'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bolder text-muted text-gray-700'>
                <th className='min-w-60px'>Rolls</th>
                <th className='min-w-120px'>Date In</th>
                <th className='min-w-120px'>kg</th>
                <th className='min-w-120px'>Metre Run</th>
                <th className='min-w-120px'>Balance</th>

                {/* <th className='min-w-120px'>Date Out</th>
                <th className='min-w-100px'>Metre Out</th>
                <th className='min-w-150px'>Issued By</th>
                <th className='min-w-150px'>Issued To</th>
                <th className='min-w-120px'>Cost</th>
                <th className='min-w-120px text-end'>Balance</th> */}
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {stocks ?
                stocks?.map((data: any) => {

                  return (
                    <tr>
                      <td>
                        <span className='text-dark fw-bolder fs-6'>
                          Row {data.id}
                        </span>
                      </td>
                      <td>
                        <span className='text-dark fw-bolder fs-6'>
                          {data.created_at}
                        </span>
                      </td>
                      <td>
                        <span className='text-dark fw-bolder fs-6'>
                          {data.kg} kg
                        </span>
                      </td>
                      <td>
                        <span className='text-dark fw-bolder fs-6'>
                          {data.metre_run} mtr
                        </span>

                      </td>
                      <td>
                        <span className='text-dark fw-bolder fs-6'>
                          {data.balance} mtr
                        </span>

                      </td>

                      {/* <td>
                      <span className='text-dark fw-bolder fs-6'>
                        {data.updated_at}
                      </span>
                    </td>
                    <td className='text-dark fw-bolder fs-6'>{data.metre_out} mtr</td>
                    <td>
                      <div className='d-flex align-items-center' style={{ pointerEvents: 'none' }}>
                        <div className='symbol symbol-30px me-3'>
                          <img src={toAbsoluteUrl('/media/avatars/blank.png')} alt='' />
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                          <a href='#' className='text-dark fw-bolder fs-6'>
                            {data.issued_by}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className='text-dark fw-bolder fs-6'>{data.issued_to}</span>
                    </td>
                    <td>
                      <span className='text-dark fw-bolder fs-6'>
                      ₦{data.cost}
                      </span>
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
                     </a> 
                      <span className='text-dark fw-bolder fs-6'>{data.balance}</span>
    
                    </td> */}
                    </tr>
                  )
                }) :
                <tr><td colSpan={10}><h3 style={{ margin: '1rem auto', width: 'max-content' }}>No Stocks Data</h3></td></tr>
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

export { TablesWidget13 }
