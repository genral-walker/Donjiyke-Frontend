/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG} from '../../../helpers'

type Props = {
  className: string,
  title?: string   
}

const TablesWidget13: React.FC<Props> = ({className, title}) => {
  
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>{title}</span>
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
                <th className='w-25px'>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value='1'
                      data-kt-check='true'
                      data-kt-check-target='.widget-13-check'
                    />
                  </div>
                </th>
                <th className='min-w-150px'>Id</th>
                <th className='min-w-140px'>Country</th>
                <th className='min-w-120px'>Date</th>
                <th className='min-w-120px'>Company</th>
                <th className='min-w-120px'>Total</th>
                <th className='min-w-120px'>Status</th>
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-13-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                    56037-XDER
                  </a>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    Brasil
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>Code: PH</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    05/28/2020
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>Code: Paid</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    Intertico
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>
                    Web, UI/UX Design
                  </span>
                </td>
                <td className='text-dark fw-bolder text-hover-primary fs-6'>$3560</td>
                <td>
                  <span className='badge badge-light-success'>Approved</span>
                </td>
                <td className='text-end'>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
                  </a>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                  </a>
                  <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                    <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-13-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                    05822-FXSP
                  </a>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    Belarus
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>Code: BY</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    04/18/2021
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>Code: Paid</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    Agoda
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>
                    Houses &amp; Hotels
                  </span>
                </td>
                <td className='text-dark fw-bolder text-hover-primary fs-6'>$4850</td>
                <td>
                  <span className='badge badge-light-warning'>In Progress</span>
                </td>
                <td className='text-end'>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
                  </a>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                  </a>
                  <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                    <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-13-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                    4472-QREX
                  </a>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    Phillipines
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>Code: BH</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    07/23/2019
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>Code: Paid</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    RoadGee
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>Transportation</span>
                </td>
                <td className='text-dark fw-bolder text-hover-primary fs-6'>$8376</td>
                <td>
                  <span className='badge badge-light-danger'>Success</span>
                </td>
                <td className='text-end'>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
                  </a>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                  </a>
                  <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                    <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-13-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                    00347-BCLQ
                  </a>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    Argentina
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>Code: BR</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    12/21/2021
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>Code: Paid</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    The Hill
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>Insurance</span>
                </td>
                <td className='text-dark fw-bolder text-hover-primary fs-6'>$9486</td>
                <td>
                  <span className='badge badge-light-info'>Rejected</span>
                </td>
                <td className='text-end'>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
                  </a>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                  </a>
                  <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                    <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-13-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                    59486-XDER
                  </a>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    Agoda
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>Code: BT</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    05/28/2020
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>Code: Paid</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    Phillipines
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>Transportation</span>
                </td>
                <td className='text-dark fw-bolder text-hover-primary fs-6'>$8476</td>
                <td>
                  <span className='badge badge-light-primary'>Approved</span>
                </td>
                <td className='text-end'>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
                  </a>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                  </a>
                  <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                    <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                  </a>
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

export {TablesWidget13}
