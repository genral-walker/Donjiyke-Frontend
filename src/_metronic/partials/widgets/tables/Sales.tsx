
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG} from '../../../helpers'

type Props = {
  className: string
}

const SalesTable: React.FC<Props> = ({className}) => {
  
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
          title='Click to add a user'
        >
          <a
            href='#'
            className='btn btn-sm btn-primary'
            data-bs-toggle=''
            data-bs-target=''
          >
            {/* <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' /> */}
            View All
          </a>
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
                <th className='min-w-120px'>Date In</th>
                <th className='min-w-100px'>kg</th>
                <th className='min-w-100px'>Metre Run</th>
                <th  className='min-w-120px'>Date Out</th>
                <th className='min-w-100px'>Metre Out</th>
                <th className='min-w-150px'>Issued By</th>
                <th className='min-w-150px'>Issued To</th>
                <th className='min-w-100px text-end'>Balance</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
            <tr>
               
               <td>
                 <span className='text-dark fw-bolder fs-6'>
                 05/28/2020
                 </span>
               </td>    
               <td>
                 <span className='text-dark fw-bolder fs-6'>
                   439 kg
                 </span>
               </td>
               <td>
                 <span className='text-dark fw-bolder fs-6'>
                   3627 mtr
                 </span>
           
               </td>
               <td>
                 <span className='text-dark fw-bolder fs-6'>
                 05/28/2020
                 </span>
               </td>
               <td className='text-dark fw-bolder fs-6'>$3560</td>
               <td>
                 <span className='text-dark fw-bolder fs-6'>Issued from the house of the people</span>
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
                 <span className='text-dark fw-bolder fs-6'>₦30,000</span>
                 
               </td>
             </tr>
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

export {SalesTable}
