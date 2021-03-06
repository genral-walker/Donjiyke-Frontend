
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { addSales } from '../../../../setup/redux/reducers/sales'
// import { saveSales } from '../../../../setup/redux/sales/salesActions'
import http, { formatNumbersWithCommas, randomPass, TrWrapper, useAppDispatch, useAppSelector } from '../../../../setup/redux/useRedux'
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
  const stocks = useAppSelector(state => state.stocks);
  const nonDuplicate = (value: any, index: number, self: any) => {
    return self.indexOf(value) === index;
  }

  const targetedRolls = useMemo(() => sales.map((sale: any) => sale.target_roll).filter(nonDuplicate), [sales]);
   
  const returnStockForKGAndDateReference = (targetRoll: string) => stocks.find(({id} : any) => id === +targetRoll);           

  const segmentedRollsObj = useMemo(() => targetedRolls.reduce((o: any, key: any) => ({ ...o, [key]: sales.filter((sale: any) => sale.target_roll === key) }), {}), [targetedRolls])


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
          <table className='table table-row-bordered table-row-gray-400 align-middle gs-0 gy-3'>
            {/* begin::Table head */}
            <thead>
              <TrWrapper isSales className='fw-bolder text-muted text-gray-700'>
                <th>S/N</th>
                <th>Kg</th>
                <th>Date In</th>
                <th>Metre Run</th>  
                <th>Date Out</th>
                <th>Metre Out</th>
                <th>Description</th>
                <th>Issued By</th>     
                <th>Issued To</th>
                <th>Balance</th>
              </TrWrapper>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody> 
              {Object.keys(segmentedRollsObj).length ? Object.keys(segmentedRollsObj).map((key: any, index: number) => {   
              return (
                <React.Fragment key={randomPass(30)}>
                 <tr key={index}><td colSpan={100}><h3 className='text-gray-900 card-label fw-bolder fs-3 d-block' style={{ margin: '2rem 0 1rem 27%', width: 'max-content' }}>Roll {key}</h3></td></tr>
                 {
                   segmentedRollsObj[key].map((data: any, idx: number) => {
                    return (<tr key={randomPass(30)}>
                      <td style={{ minWidth: '60px'}}>
                        <span className='text-dark fw-bolder fs-6'>
                          {idx + 1}     
                        </span>
                      </td>
                      <td style={{ minWidth: '120px' }}>
                        <span className='text-dark fw-bolder fs-6'>
                          {formatNumbersWithCommas(`${returnStockForKGAndDateReference(data.target_roll)?.kg}`)} kg        
                        </span>  
                      </td>
                      <td style={{ minWidth: '180px'}}>
                        <span className='text-dark fw-bolder fs-6'>
                          {returnStockForKGAndDateReference(data.target_roll)?.date_in}
                        </span>
                      </td>
                      <td style={{ minWidth: '120px'}}>
                        <span className='text-dark fw-bolder fs-6'>
                          {formatNumbersWithCommas(`${data.metre_run}`)} mtr
                        </span>
    
                      </td>
                      <td style={{ minWidth: '180px'}}>
                        <span className='text-dark fw-bolder fs-6'>
                          {data.date_out}
                        </span>
                      </td>
                      <td style={{ minWidth: '120px'}}>
                        <span className='text-dark fw-bolder fs-6'> 
                          {formatNumbersWithCommas(`${data.metre_out}`)} mtr
                        </span>
                      </td>
                      <td style={{ minWidth: '170px', maxWidth: '250px' }}>
                        <span className='text-dark fw-bolder fs-6'>       
                          {returnStockForKGAndDateReference(data.target_roll)?.description}    
                        </span>  
                      </td>
                      <td  style={{ minWidth: '180px', textTransform: 'capitalize'}}>
                        <span className='text-dark fw-bolder fs-6'>
                          {data.issuer}
                        </span>
                      </td>
                      <td style={{ minWidth: '150px', maxWidth: '220px' }}>
                        <span className='text-dark fw-bolder fs-6'>
                          {data.issued_to}
                        </span>
                      </td>
                      <td  style={{ minWidth: '120px'}}>
                        <span className='text-dark fw-bolder fs-6'>{formatNumbersWithCommas(`${data.balance}`)} mtr</span>
                      </td>
                    </tr>)
                  })
                 }
                </React.Fragment>
              )  
              }) :
              <tr><td colSpan={10}><h3 style={{ margin: '1rem auto', width: 'max-content' }}>No Sales Data</h3></td></tr>
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

/*
*/

export { SalesTable }
