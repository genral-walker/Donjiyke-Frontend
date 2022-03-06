/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useHistory, useLocation } from 'react-router'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import {KTSVG} from '../../../helpers'
import { useAppSelector } from '../../../../setup/redux/useRedux'


type Props = {
  className: string
  color: string
}

const MixedWidget1: React.FC<Props> = ({className, color}) => {

  const location = useLocation();
  const history = useHistory();
  const stocks = useAppSelector((state) => state.stocks)
  const sales = useAppSelector((state) => state.sales)

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body p-0'>
        {/* begin::Header */}
        <div className={`px-9 pt-7 card-rounded h-275px w-100 bg-${color}`}>
          {/* begin::Heading */}
          <div className='d-flex flex-stack'>
            <h3 className='m-0 text-white fw-bolder fs-3'>Dashboard Summary</h3>
            <div className='ms-1' style={{pointerEvents: 'none'}}>
              {/* begin::Menu */}
              <button
                type='button'
                className={`btn btn-sm btn-icon btn-color-white btn-active-white btn-active-color-${color} border-0 me-n3`}
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
                data-kt-menu-flip='top-end'
              >
                <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2'/>
              </button>
              {/* end::Menu */}
            </div>
          </div>
          {/* end::Heading */}
          {/* begin::Balance */}
          <div className='d-flex text-center flex-column text-white pt-8'>
            <span className='fw-bold fs-5'>Total Sales</span>    
            <span className='fw-bolder fs-2x pt-1'>{sales.length}</span>
          </div>
          <div className='d-flex text-center flex-column text-white pt-8'>
            <span className='fw-bold fs-5'>Available Stocks</span>
            <span className='fw-bolder fs-2x pt-1'>{stocks.reduce((a:any, b: any) => a + +b.balance, 0)} mtr</span>
          </div>
          {/* end::Balance */}
        </div>
        {/* end::Header */}
        {/* begin::Items */}
      
        {/* end::Items */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {MixedWidget1}
