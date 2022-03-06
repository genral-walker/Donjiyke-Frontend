import React, {useEffect, useMemo, useState} from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {KTSVG} from '../../../_metronic/helpers'
import {SalesTable} from '../../../_metronic/partials/widgets'
import http, {randomPass, useAppDispatch, useAppSelector} from '../../../setup/redux/useRedux'
import {addNewSale, addSales} from '../../../setup/redux/reducers/sales'
import {updateStock} from '../../../setup/redux/reducers/stocks'
import { useHistory } from 'react-router-dom'
import moment from 'moment'


const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Sales',
    path: '/crafted/pages/sales',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

// SALES PAGE

const SalesPage: React.FC = () => {
  const history = useHistory()
  const user = useAppSelector((state) => state.user)
  const stocks = useAppSelector((state) => state.stocks)
  const dispatch = useAppDispatch()
  const [choosenRoll, setChoosenRoll] = useState<any | {}>()
  const [loading, setLoading] = useState(false)
  const [rollOfInterest, setRollOfInterest] = useState('')

  useEffect(()=> setRollOfInterest('1'),[])

  const availableStocks = useMemo(
    () => stocks.filter((stock: any) => parseInt(stock.balance) > 0),
    [stocks]
  )

  const submitSale = async (evt: React.FormEventHandler<HTMLFormElement> | any) => {
    let issuerData = ''
    evt.preventDefault()   
    if (user.role === 'admin') {
      issuerData = user.role
    } else {
      if (user.name) {
        issuerData = user.name
      } else {
       return alert('Please add your name in your account before making a sale!')
      }
    }

    setLoading(true)

    const metreOut = (document.getElementById('meter') as HTMLInputElement).value
    const issuedTo = (document.getElementById('issued_to') as HTMLInputElement).value
    const dateOut = moment((document.getElementById('dateOut') as HTMLInputElement).value).format('DD/MM/YYYY, h:mm a')

    try {
      let res: any = await http.post('/sales', {
        target_roll: rollOfInterest,
        metre_run: choosenRoll ? choosenRoll.balance : availableStocks[0]?.balance,
        metre_out: metreOut,
        date_out: dateOut,
        balance: `${
          choosenRoll ? +choosenRoll.balance - +metreOut : availableStocks[0]?.balance - +metreOut
        }`,
        issuer: issuerData,
        issued_to: issuedTo,
      })
      

      dispatch(addNewSale(res.data))
      alert('Sale created successfully!!')
      try {
        const stockUpdated = await http.patch(`/stocks/${rollOfInterest}`, {
          balance: `${
            choosenRoll ? +choosenRoll.balance - +metreOut : availableStocks[0]?.balance - +metreOut
          }`,
        })

        dispatch(updateStock(stockUpdated.data))
      } catch (error: any) {
        setLoading(false)
        console.log(error.message ?? error)
        alert('Network error, please try again.')
      }

      evt.target.reset()
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      console.log(error.message ?? error)
      alert('Network error, please try again.')
    }
  }

  return (
    <>
      <PageTitle breadcrumbs={accountBreadCrumbs}>Sales Page</PageTitle>
      <div className='row gy-5 g-xl-8'>
        <SalesTable className='card-xxl-stretch-50 mb-14 mb-xl-18' />

        {/* MODAL */}

        <button
          type='button'
          className='btn btn-primary'
          data-bs-toggle='modal'
          data-bs-target='#kt_modal_1'
        >
          Add New Sale
        </button>

        <div className='modal fade' tabIndex={-1} id='kt_modal_1'>
          <form onSubmit={submitSale}>
            <div className='modal-dialog' style={{maxWidth: '800px'}}>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title'>Add New Sale</h5>
                  <div
                    className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  >
                    <KTSVG
                      path='/media/icons/duotune/arrows/arr061.svg'
                      className='svg-icon svg-icon-2x'
                    />
                  </div>
                </div>

                {/* <form> */}
                <div className='modal-body'>
                  <div className='row g-9 mb-8'>
                    <div className='col fv-row'>
                      <div className='d-flex flex-column mb-8 fv-row fv-plugins-icon-container'>
                        <label className='d-flex align-items-center fs-6 fw-bold mb-2'>
                          <span className='required'>Select Roll</span>
                        </label>
                        <select
                          onChange={(e) =>{
                            setRollOfInterest(e.target.value);
                            setChoosenRoll(() =>
                              availableStocks.find((stock: any) => `${stock.id}` === e.target.value)
                            )}
                          }
                          value={rollOfInterest}
                          required
                          className='form-control form-control-solid'
                          id='target_roll'
                          aria-label='Select Roll'
                          placeholder='Select which roll to take from.'
                        >
                          
                          {
                            availableStocks.map((stock: any) => (
                              <option key={randomPass(35)} value={stock.id}>Roll {stock.id}</option>  
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className='col fv-row'>
                      <div className='d-flex flex-column mb-8 fv-row fv-plugins-icon-container'>
                        <label className='d-flex align-items-center fs-6 fw-bold mb-2'>
                          <span className='required'>Metre Out</span>
                        </label>
                        <input
                          type='number'
                          min={1}
                          max={choosenRoll ? choosenRoll.balance : availableStocks[0]?.balance}
                          id='meter'
                          required
                          className='form-control form-control-solid'
                          placeholder='Enter Metre Out'
                        />
                      </div>
                    </div>
                    <div className="col-md-4 fv-row">
                      <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                          <span className="required">Date Out</span>
                        </label>
                        <input type={'datetime-local'} id="dateOut" required className="form-control form-control-solid" placeholder="Select Date Out" />
                      </div>
                    </div>
                    <div className='col-12 fv-row'>
                      <div className='d-flex flex-column mb-8 fv-row fv-plugins-icon-container'>
                        <label className='d-flex align-items-center fs-6 fw-bold mb-2'>
                          <span className='required'>Issued To?</span>
                        </label>
                        <textarea
                          required
                          id='issued_to'
                          rows={5}
                          className='form-control form-control-solid'
                          placeholder='Issued to?'
                          style={{resize: 'none'}}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='modal-footer'>
                  <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
                    Close
                  </button>
                  <button type='submit' className='btn btn-primary' disabled={loading}>
                    {!loading && <span className='indicator-label'>Submit</span>}
                    {loading && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Submitting...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SalesPage
