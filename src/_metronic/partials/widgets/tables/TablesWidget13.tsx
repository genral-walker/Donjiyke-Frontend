/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useHistory, useLocation } from 'react-router'
import { useAppSelector } from '../../../../setup/redux/useRedux'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'

type Props = {
  className: string,
  datum?: any  
}

const TablesWidget13: React.FC<Props> = ({ className, datum }) => {

 const [stock, setStock] = useState([]);

 const location = useLocation();
 const history = useHistory();

 const user = useAppSelector(state => state.user);

 let userStorage: any = window.localStorage.getItem('user');
 userStorage = JSON.parse(`${userStorage}`);

 const userToken = useAppSelector(state => state?.user?.auth?.accessToken) || userStorage?.auth?.accessToken;

 const fetchStocks = async () => {

   const config = {
     headers: { Authorization: `Bearer ${userToken}` }
   }

   try {
     let res = await axios.get('http://localhost:8000/api/stocks', config);

     if (res) {

       window.localStorage.setItem('stocks', JSON.stringify(res.data))
       setStock(res.data);
     }

   } catch (error: any) {      
     alert(error.message ?? error)
   }
 }


 useEffect(() => {
  fetchStocks();
 }, []);


 useEffect(() => {
   
    let stocksStorage: any = window.localStorage.getItem('stocks');
    stocksStorage =JSON.parse(`${stocksStorage}`); 
   if (stocksStorage && stock.length === 0) {
     setStock(stocksStorage)
   }
  }, []);

  useEffect(() => {
   setStock(datum)
  }, [datum]);

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
              { stock ?
                stock?.map((data: any) => {

                  return (
                    <tr>

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
                     </a> */}
                      <span className='text-dark fw-bolder fs-6'>{data.balance}</span>
    
                    </td>
                  </tr>
                )
                }) :

                <tr><h2 style={{ margin: '1rem auto', width: '200px' }}>No Stocks Data</h2></tr>        
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
