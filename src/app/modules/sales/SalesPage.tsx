import React, {useEffect, useMemo, useState} from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {KTSVG} from '../../../_metronic/helpers'
import {SalesTable} from '../../../_metronic/partials/widgets'
import http, {useAppDispatch, useAppSelector} from '../../../setup/redux/useRedux'
import {addNewSale, addSales} from '../../../setup/redux/reducers/sales'
import {updateStock} from '../../../setup/redux/reducers/stocks'

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
  const user = useAppSelector((state) => state.user)
  const stocks = useAppSelector((state) => state.stocks)
  const dispatch = useAppDispatch()
  const [choosenRoll, setChoosenRoll] = useState<any | {}>()
  const [loading, setLoading] = useState(false)

  const availableStocks = useMemo(
    () => stocks.filter((stock: any) => parseInt(stock.balance) > 0),
    [stocks]
  )

  const submitSale = async (evt: React.FormEventHandler<HTMLFormElement> | any) => {
    evt.preventDefault()

    setLoading(true)

    const metreOut = (document.getElementById('meter') as HTMLInputElement).value
    const issuedTo = (document.getElementById('issued_to') as HTMLInputElement).value
    const targetRoll = (document.getElementById('target_roll') as HTMLInputElement).value
    /*
    IF the user is admin, allow them to make a sale.
    else if the user isn't admin...
      Check if they have filled their name, if yes then allow them make a sale.
      else prompt them to fill their name first, then direct them to the profile page to fill in their name.
    */
    /*
    STEPS.
  
    
    */

    try {
      let res: any = await http.post('/sales', {
        target_roll: targetRoll,
        metre_run: choosenRoll ? choosenRoll.balance : availableStocks[0]?.balance,
        metre_out: metreOut,
        balance: `${
          choosenRoll ? +choosenRoll.balance - +metreOut : availableStocks[0]?.balance - +metreOut
        }`,
        issuer: user.email, // if admin, use the status else use the name of the issuer.
        issued_to: issuedTo,
      })

      dispatch(addNewSale(res.data))
      alert('Sale created successfully!!')
      try {
        const stockUpdated = await http.patch(`/stocks/${parseInt(targetRoll)}`, {
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
            <div className='modal-dialog' style={{maxWidth: '400px'}}>
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
                    <div className='col fv-row'>
                      <div className='d-flex flex-column mb-8 fv-row fv-plugins-icon-container'>
                        <label className='d-flex align-items-center fs-6 fw-bold mb-2'>
                          <span className='required'>Select Roll</span>
                        </label>
                        <select
                          onChange={(e) =>
                            setChoosenRoll(() =>
                              availableStocks.find((stock: any) => `${stock.id}` === e.target.value)
                            )
                          }
                          required
                          className='form-control form-control-solid'
                          id='target_roll'
                          aria-label='Select Roll'
                          placeholder='Select which roll to take from.'
                        >
                          {availableStocks &&
                            availableStocks.map((stock: any) => (
                              <option value={stock.id}>Roll {stock.id}</option>
                            ))}
                        </select>
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
