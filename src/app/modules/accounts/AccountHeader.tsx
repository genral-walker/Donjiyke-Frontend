/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { Link } from 'react-router-dom'
import { Dropdown1 } from '../../../_metronic/partials'
import { useLocation } from 'react-router'
import { useAppSelector } from '../../../setup/redux/useRedux'

const AccountHeader: React.FC = () => {
  const user = useAppSelector(state => state.user);
  const location = useLocation();

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column' style={{ pointerEvents: 'none' }}>
                <div className='d-flex align-items-center mb-2'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1' style={{ textTransform: 'capitalize' }}>
                    {user.name}
                  </a>
                  <a href='#'>

                  </a>
                  <a
                    href='#'
                    className='btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3'
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_upgrade_plan'
                    style={{ textTransform: 'capitalize' }}
                  >
                    {user.role}
                  </a>
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 pe-2'>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                  >
                    <KTSVG
                      path='/media/icons/duotune/communication/com011.svg'
                      className='svg-icon-4 me-1'
                    />
                    {user.email}
                  </a>
                </div>
                {user.mobile &&
                  <div className='d-flex flex-wrap fw-bold fs-6 mb-2 pe-2'>
                    <a
                      href='#'
                      className='d-flex align-items-center text-gray-400 text-hover-primary me-5'  
                    >
                      <KTSVG
                        path='/media/icons/duotune/communication/com005.svg'
                        className='svg-icon-4 me-1'
                      />
                      {user.mobile}
                    </a>
                  </div>
                }
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export { AccountHeader }
