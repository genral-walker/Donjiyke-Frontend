/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Link} from 'react-router-dom'
import {KTSVG} from '../../../../_metronic/helpers'
import {
  ChartsWidget1,
  TablesWidget1,
  ListsWidget5,
  TablesWidget5,
} from '../../../../_metronic/partials/widgets'

export function Overview() {
  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer' 
        style={{pointerEvents: 'none'}}>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Profile Details</h3>
          </div>
        </div>

        <div className='card-body p-9'>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Company</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>Keenthemes</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Contact Phone
              <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Phone number must be active'
              ></i>
            </label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>044 3276 454 935</span>

              <span className='badge badge-success'>Verified</span>
            </div>
          </div>

        </div>
      </div>

      <div className='row gy-10 gx-xl-10 '>
     {/* INSERT ACCOUNT LIST HERE */}
      </div>

      {/* <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-6'>
          <ListsWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>

        <div className='col-xl-6'>
          <TablesWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div> */}
    </>
  )
}
