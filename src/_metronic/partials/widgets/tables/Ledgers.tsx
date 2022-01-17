/* eslint-disable jsx-a11y/anchor-is-valid */
// LEDGERS COMPONENT
import React, {useState, useEffect, useMemo} from 'react'
import {useHistory, useLocation} from 'react-router'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import http, {useAppDispatch, useAppSelector} from '../../../../setup/redux/useRedux'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {addPayment} from '../../../../setup/redux/reducers/payments'
import {updateLedger} from '../../../../setup/redux/reducers/ledgers'

type Props = {
  className: string
}

interface PaymentUpdate {
  Payment: string
}

const paymentValidationSchema = Yup.object().shape({
  Payment: Yup.number().required().min(3, 'Minimum 3 symbols'),
})

const Ledgers: React.FC<Props> = ({className}) => {
  const dispatch = useAppDispatch()
  const ledgers = useAppSelector((state) => state.ledgers)
  const payments = useAppSelector((state) => state.payments)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [selectedID, setSelectedID] = useState<any>('')
  const [pvalue, setPValue] = useState('')

  const location = useLocation()
  const history = useHistory()

  const nonDuplicate = (value: any, index: number, self: any) => {
    return self.indexOf(value) === index
  }

  const targetLedgers = useMemo(
    () => payments.map((payment: any) => payment.target_ledger).filter(nonDuplicate),
    [payments]
  )

  // const returnStockForKGAndDateReference = (targetRoll: string) => stocks.find(({id} : any) => id === +targetRoll);

  const segmentedLedgerssObj = useMemo(
    () =>
      targetLedgers.reduce(
        (o: any, key: any) => ({
          ...o,
          [key]: payments.filter((payment: any) => payment.target_ledger === key),
        }),
        {}
      ),
    [targetLedgers]
  )
  const totalPayments = segmentedLedgerssObj[selectedID]?.reduce(
    (a: any, b: any) => a + +b.payment,
    0
  )
  const currentCost = ledgers.find((ledger: any) => ledger.id === selectedID)?.cost
  const currentBalance = ledgers.find((ledger: any) => ledger.id === selectedID)?.balance

  const formik = useFormik<PaymentUpdate>({
    initialValues: {
      Payment: '',
    },
    validationSchema: paymentValidationSchema,
    onSubmit: async (values, {resetForm}) => {
      const formData = {
        target_ledger: `${selectedID}`,
        payment: values.Payment,
      }
      if (+formData.payment > +currentBalance) return alert('Error, Payment exceeds Balance!')

      const getBalance = () => {
        if (totalPayments) {
          return currentCost - (totalPayments + +formData.payment)
        } else {
          return currentCost - +formData.payment
        }
      }

      setLoading(true)
      try {
        const res = await http.post(`/payments`, formData)
        if (res) {
          const ledgerRes = await http.patch(`/ledgers/${selectedID}`, {balance: `${getBalance()}`})
          dispatch(addPayment(res.data))
          dispatch(updateLedger(ledgerRes.data))
          setLoading(false)
          resetForm()
          alert('Payment Added Successfully!')
        }
      } catch (error) {
        setLoading(false)
        resetForm()
        console.log(error)
        alert('Network Error, Please try again')
      }
    },
  })

  const determinePaymentInfo = (id: any) => {
    const currentObjArr = segmentedLedgerssObj[id];
    
    switch (currentObjArr?.length) {
      case 0:
      case undefined:
      case false:
        return 'Nill'
      case 1:
        return <span style={{paddingLeft: '17px'}}>₦{currentObjArr[0]?.payment}</span>   
      default:
        if (currentObjArr?.length > 1) {
          const randNum = Math.floor(Math.random() * 999999) + 1;     
          console.log(randNum)  
          return (
            <div className='accordion mt-2' id={`kt_accordion_${randNum}`}>
              <div className='accordion-item border-top'>
                <h2 className='accordion-header' id={'kt_accordion_'+randNum+'_header_'+randNum}>
                  <button
                    className='accordion-button px-5 py-4 text-dark fw-bolder fs-6 collapsed'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target={'#kt_accordion_'+randNum+'_body_'+randNum}
                    aria-expanded='false'
                    aria-controls={'kt_accordion_'+randNum+'_body_'+randNum}
                  >
                    Payments Info
                  </button>
                </h2>
                <div
                  id={'kt_accordion_'+randNum+'_body_'+randNum}
                  className='accordion-collapse collapse'
                  aria-labelledby={'kt_accordion_'+randNum+'_header_'+randNum}
                  data-bs-parent={'#kt_accordion_'+randNum}
                >
                  <div className='accordion-body px-5 py-0'>
                    <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-4'>
                      <thead className='border-bottom border-gray-400'>
                        <tr className='fw-bolder text-muted text-gray-700'>
                          <th>Date</th>
                          <th>Payments</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentObjArr.map((objArr: any | object) => {
                          return (
                            <tr key={objArr.id}>
                              <td>{objArr.created_at}</td>
                              <td>₦{objArr.payment}</td>
                            </tr>
                          )
                        })}
                        <tr>
                          <td>
                            <h4>Total:</h4>
                          </td>
                          <td>₦{currentObjArr?.reduce((a: any, b: any) => a + +b.payment, 0)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )
        }
    }
  }

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>Ledgers</span>
        </h3>

        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Go to Ledgers Page'
        >
          {location.pathname === '/dashboard' && (
            <button
              className='btn btn-sm btn-primary'
              onClick={() => history.push('/crafted/pages/ledgers')}
            >
              View All
            </button>
          )}
        </div>
      </div>

      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-bordered table-row-gray-400 align-middle gs-0 gy-3'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bolder text-muted text-gray-700'>
                <th className='max-w-180px'>Date</th>
                <th className='max-w-170px'>Material</th>
                <th className='max-w-150px'>Meter</th>
                <th className='max-w-120px'>Cost</th>
                <th className='max-w-300px' style={{ paddingLeft: '26px'}}>Payment</th>
                <th className='max-w-110px'>Balance</th>
                {location.pathname === '/crafted/pages/ledgers' && (
                  <th className='max-w-50px'>Action</th>
                )}
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {ledgers.length ? (
                ledgers.map((data: any) => {
                  return (
                    <tr>
                      <td style={{minWidth: '180px', maxWidth: 'max-content'}}>
                        <span
                          className='text-dark fw-bolder fs-6' 
                        >
                          {data.created_at}
                        </span>
                      </td>
                      <td style={{minWidth: '170px', maxWidth: 'max-content'}}>
                        <span
                          className='text-dark fw-bolder fs-6'
                        >
                          {data.material}
                        </span>
                      </td>
                      <td style={{minWidth: '150px', maxWidth: 'max-content'}}>
                        <span
                          className='text-dark fw-bolder fs-6'
                        >
                          {data.meter} mtr
                        </span>
                      </td>
                      <td style={{minWidth: '120px', maxWidth: 'max-content'}}>
                        <span
                          className='text-dark fw-bolder fs-6'
                        >
                          ₦{data.cost}
                        </span>
                      </td>
                      <td style={{minWidth: '300px', maxWidth: 'max-content'}}>
                        <span
                          className='text-dark fw-bolder fs-6'
                        >
                          {determinePaymentInfo(data.id)}
                        </span>
                      </td>
                      <td style={{minWidth: '110px', maxWidth: 'max-content'}}>
                        <span
                          className='text-dark fw-bolder fs-6'
                        >
                          ₦{data.balance}
                        </span>
                      </td>
                      {location.pathname === '/crafted/pages/ledgers' && data.balance != '0' && (
                        <td style={{minWidth: '50px', maxWidth: 'max-content'}}>
                          <span
                            className='text-dark fw-bolder fs-6'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_4'
                            style={{cursor: 'pointer'}}
                            onClick={() => {
                              setTitle(data.material)
                              setSelectedID(data.id)
                            }}
                            data-toggle='tooltip'
                            data-placement='left'
                            title={`Add payment for ${data.material}`}
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen041.svg'
                              className='svg-icon-3 svg-icon-2x'
                            />
                          </span>
                        </td>
                      )}
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={10}>
                    <h3 style={{margin: '1rem auto', width: 'max-content'}}>No Ledgers Data</h3>
                  </td>
                </tr>
              )}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}

      <div className='modal fade' tabIndex={-1} id='kt_modal_4'>
        <form noValidate onSubmit={formik.handleSubmit} className='pForm'>
          <div className='modal-dialog' style={{maxWidth: '500px'}}>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Add Payment for {title}</h5>
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

              <div className='modal-body'>
                <div className='fv-row'>
                  <div className='d-flex fv-row fv-plugins-icon-container'>
                    <input
                      id='paymentf'
                      min={0}
                      required
                      className='form-control form-control-solid'
                      placeholder='Enter Payment'
                      {...formik.getFieldProps('Payment')}
                    />
                    {formik.touched.Payment && formik.errors.Payment && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block text-danger'>{formik.errors.Payment}</div>
                      </div>
                    )}
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
  )
}

export {Ledgers}
