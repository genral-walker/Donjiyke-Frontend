/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useHistory, useLocation } from 'react-router'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'

type Props = {
  className: string
}

const TablesWidget13: React.FC<Props> = ({ className }) => {

  const location = useLocation();
 const history = useHistory();

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
              <button className='btn btn-sm btn-primary' onClick={()=>history.push('/crafted/pages/stocks')}>
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
                <th className='min-w-120px'>Date In</th>
                <th className='min-w-100px'>kg</th>
                <th className='min-w-100px'>Metre Run</th>
                <th className='min-w-120px'>Date Out</th>
                <th className='min-w-100px'>Metre Out</th>
                <th className='min-w-150px'>Issued By</th>
                <th className='min-w-150px'>Issued To</th>
                <th className='min-w-120px'>Cost</th>
                <th className='min-w-120px text-end'>Balance</th>
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
                <td className='text-dark fw-bolder fs-6'>350 mtr</td>
                <td>
                  <div className='d-flex align-items-center' style={{ pointerEvents: 'none' }}>
                    <div className='symbol symbol-30px me-3'>
                      <img src={toAbsoluteUrl('/media/avatars/150-11.jpg')} alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bolder fs-6'>
                        Ana Simmons
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <span className='text-dark fw-bolder fs-6'>Issued from the house of the people</span>
                </td>
                <td>
                  <span className='text-dark fw-bolder fs-6'>
                  ₦323,710
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
                 </a> */}
                  <span className='text-dark fw-bolder fs-6'>Balance data</span>

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

export { TablesWidget13 }
