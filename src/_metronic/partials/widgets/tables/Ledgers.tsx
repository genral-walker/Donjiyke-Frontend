/* eslint-disable jsx-a11y/anchor-is-valid */
// LEDGERS COMPONENT 
import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { addStock } from '../../../../setup/redux/reducers/stocks'
import http, { useAppDispatch, useAppSelector } from '../../../../setup/redux/useRedux'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'


type Props = {
  className: string
}

interface PaymentUpdate {
  Payment: string
}

const paymentValidationSchema = Yup.object().shape({
  Payment: Yup.number().required()
    .min(3, 'Minimum 3 symbols')
})

const Ledgers: React.FC<Props> = ({ className }) => {

  const dispatch = useAppDispatch()
  const ledgers = useAppSelector(state => state.ledgers)
  const [loading, setLoading] = useState(false)

  const location = useLocation();
  const history = useHistory();

  const formik = useFormik<PaymentUpdate>({
    initialValues: {
      Payment: ''
    },
    validationSchema: paymentValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      return console.log(values, 'Helloo values')
      try {
        // const updatedInfo = await http.patch(`/users/${user.id}`, {password: values.newPassword})
        setLoading(false);
        alert('Payment Added Successfully!')
      } catch (error) {
        setLoading(false);
        console.log(error);
        alert('Network Error, Please try again')
      }
    },
  })



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
          {
            location.pathname === '/dashboard' &&
            <button className='btn btn-sm btn-primary' onClick={() => history.push('/crafted/pages/ledgers')}>
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
              <tr className='fw-bolder text-muted text-gray-700'>
                <th className='min-w-120px'>Date</th>
                <th className='min-w-120px'>Material</th>
                <th className='min-w-120px'>Meter</th>
                <th className='min-w-120px'>Cost</th>
                <th className='min-w-120px'>Payment</th> {/*text-center*/}  
                <th className='min-w-120px'>Balance</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {ledgers.length ?
                ledgers.map((data: any) => {

                  return (
                    <tr>
                      <td>
                        <span className='text-dark fw-bolder fs-6'>
                          {data.created_at}
                        </span>
                      </td>
                      <td>
                        <span className='text-dark fw-bolder fs-6'>
                          {data.material}
                        </span>
                      </td>
                      <td>
                        <span className='text-dark fw-bolder fs-6'>
                          {data.meter} mtr
                        </span>
                      </td>
                      <td>
                        <span className='text-dark fw-bolder fs-6'>
                          ₦{data.cost}
                        </span>

                      </td>
                      <td style={{ maxWidth: '200px' }}>
                        <span className='text-dark fw-bolder fs-6'>  
                          {data.payment === 'Nill' ? data.payment : '₦' + data.payment}

                          {/* <form className="fv-row" noValidate onSubmit={formik.handleSubmit}>
                            <div className="d-flex fv-row fv-plugins-icon-container">
                              <input
                                id="meter"
                                min={0} required className="form-control form-control-solid"
                                placeholder="Enter Payment"
                                {...formik.getFieldProps('Payment')} />
                              {formik.touched.Payment && formik.errors.Payment && (
                                <div className='fv-plugins-message-container' style={{ maxWidth: '200px' }}>
                                  <div className='fv-help-block text-danger'>{formik.errors.Payment}</div>
                                </div>
                              )}
                              {!loading && <a
                                className='btn btn-icon btn-bg-light btn-active-color-success btn-sm'
                                type='submit'
                              >
                                <KTSVG
                                  path='/media/icons/duotune/general/gen027.svg'
                                  className='svg-icon-3 p-4'

                                />
                                <a
                                  className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm'
                                >
                                  <KTSVG
                                    path='/media/icons/duotune/general/gen027.svg'
                                    className='svg-icon-3'
                                  />
                                </a>
                              </a>}
                              {loading && (
                                <span className='indicator-progress' style={{ display: 'block' }}>
                                  <span className='spinner-border spinner-border-sm align-middle mx-2'></span>
                                </span>
                              )}
                            </div>
                          </form>

                          <div className='accordion mt-2 d-none' id='kt_accordion_1'>
                            <div className='accordion-item'>
                              <h2 className='accordion-header' id='kt_accordion_1_header_1'>
                                <button
                                  className='accordion-button px-5 py-4 text-dark fw-bolder fs-6 collapsed'
                                  type='button'
                                  data-bs-toggle='collapse'
                                  data-bs-target='#kt_accordion_1_body_1'
                                  aria-expanded='false'
                                  aria-controls='kt_accordion_1_body_1'
                                >
                                  Payments Info
                                </button>
                              </h2>
                              <div
                                id='kt_accordion_1_body_1'
                                className='accordion-collapse collapse'
                                aria-labelledby='kt_accordion_1_header_1'
                                data-bs-parent='#kt_accordion_1'
                              >
                                <div className='accordion-body px-5 pt-0'>
                                  <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-4'>
                                    <tr className='fw-bolder text-muted text-gray-700'>
                                      <th>Date</th>
                                      <th>Payment</th>
                                    </tr>
                                    <tr>
                                      <td>21-32-2901</td>
                                      <td>33442</td>
                                    </tr>
                                    <tr>
                                      <td>21-32-2901</td>
                                      <td>33442</td>
                                    </tr>
                                    <tr>
                                      <td>21-32-2901</td>
                                      <td>33442</td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div> */}
                        </span>
                      </td>
                      <td>
                        <span className='text-dark fw-bolder fs-6'>
                          ₦{data.balance}
                        </span>
                      </td>
                    </tr>
                  )
                }) :
                <tr><td colSpan={10}><h3 style={{ margin: '1rem auto', width: 'max-content' }}>No Ledgers Data</h3></td></tr>
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

export { Ledgers }
