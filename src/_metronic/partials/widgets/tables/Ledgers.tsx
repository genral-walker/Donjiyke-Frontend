/* eslint-disable jsx-a11y/anchor-is-valid */
// LEDGERS COMPONENT 
import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router'
import { addStock } from '../../../../setup/redux/reducers/stocks'
import http, { useAppDispatch, useAppSelector } from '../../../../setup/redux/useRedux'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'


type Props = {
  className: string
}

const Ledgers: React.FC<Props> = ({ className }) => {   

  const dispatch = useAppDispatch()
  const ledgers = useAppSelector(state => state.ledgers)

  const location = useLocation();
  const history = useHistory();



  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>Ledgers</span>
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
            <button className='btn btn-sm btn-primary' onClick={() => history.push('/crafted/pages/ledgers')}>
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
                <th className='min-w-120px'>Date</th>
                <th className='min-w-120px'>Material</th>
                <th className='min-w-120px'>Meter</th>
                <th className='min-w-120px'>Cost</th>
                <th className='min-w-120px'>Payment</th>
                <th className='min-w-120px'>Balance</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {ledgers.length ?
                ledgers.map((data: any) => {

                  return (
                    <tr>
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
                          {data.meter} mtr
                        </span>
                      </td>
                      <td>
                        <span className='text-dark fw-bolder fs-6'>
                          ₦{data.cost}
                        </span>

                      </td>
                      <td>
                        <span className='text-dark fw-bolder fs-6'>
                          {data.payment === 'Nill' ? data.payment : '₦' + data.payment}         
                        </span>
                      </td>
                      <td>
                        <span className='text-dark fw-bolder fs-6'>
                          ₦{data.balance}
                        </span>
                      </td>
                    </tr>
                  )
                }) :
                <tr><td colSpan={10}><h3 style={{ margin: '1rem auto', width: 'max-content' }}>No Ledgers Data</h3></td></tr>
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

export { Ledgers }
