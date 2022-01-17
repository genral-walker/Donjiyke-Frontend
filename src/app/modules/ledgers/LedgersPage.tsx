import React, { useState } from 'react'
import { KTSVG } from '../../../_metronic/helpers'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import http, { useAppDispatch, useAppSelector } from '../../../setup/redux/useRedux'
import { addLedger } from '../../../setup/redux/reducers/ledgers'
import { Ledgers } from '../../../_metronic/partials/widgets/tables/Ledgers'
import { addPayment } from '../../../setup/redux/reducers/payments'

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Ledgers',
    path: '/crafted/pages/ledgers',
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
/*
LEDGERS PAGE
*/
const LedgersPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const ledgers = useAppSelector(state => state.ledgers)

  const submitLedger = async (evt: React.FormEventHandler<HTMLFormElement> | any) => {
    evt.preventDefault();
    setLoading(true);
    const formData = {
      material: (document.getElementById('material') as HTMLInputElement).value,
      meter: (document.getElementById('mete') as HTMLInputElement).value,   
      payment: (document.getElementById('payment') as HTMLInputElement).value,    
      cost: (document.getElementById('cost') as HTMLInputElement).value,
      balance: ''
    }

    // WE HAVE TO ADD ISSUED BY LATER
    
    if (formData.payment) {
      formData.balance = `${+formData.cost - +formData.payment}`;
    } else {
      formData.payment = 'Nill';
      formData.balance = formData.cost;
    }

    try {
      let res: any = await http.post('/ledgers', {...formData, payment: 'Nill'});

      if (formData.payment !== 'Nill') {
       let paymentRes = await http.post('/payments', {
          target_ledger: `${res.data.id}`,
          payment: formData.payment,
        });
        dispatch(addPayment(paymentRes.data))
      }

      dispatch(addLedger(res.data));
      setLoading(false)
      alert('Ledger created successfully!!')
      evt.target.reset();

    } catch (error: any) {
      setLoading(false)
      console.log(error.message ?? error);
      alert('Network error, please try again.')
    }
  }


  return (
    <>
      <PageTitle breadcrumbs={accountBreadCrumbs}>Ledgers Page</PageTitle>
      <div className='row gy-5 g-xl-8'>
        <Ledgers
          className='card-xxl-stretch-50 mb-14 mb-xl-18'
        />

        {/* MODAL */}

        <button type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_1"
        >
          Add New Ledger
        </button>
        <div className="modal fade" tabIndex={-1} id="kt_modal_1">

          <form onSubmit={submitLedger}>
            <div className="modal-dialog" style={{ maxWidth: '600px' }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Ledger</h5>
                  <div
                    className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <KTSVG
                      path="/media/icons/duotune/arrows/arr061.svg"
                      className="svg-icon svg-icon-2x"
                    />
                  </div>
                </div>

                <div className="modal-body">

                  <div className="row g-9 mb-8">
                    <div className="col-md-6 fv-row">
                      <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                          <span className="required">Material</span>
                        </label>
                        <input type="text" id="material" required className="form-control form-control-solid" placeholder="Enter Material" />
                      </div>
                    </div>

                    <div className="col-md-6 fv-row">
                      <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                          <span className="required">Meter</span>
                        </label>

                        <input type="number" id="mete" step={0.01} min={0} required className="form-control form-control-solid" placeholder="Enter Meter" />
                      </div>
                    </div>

                    <div className="col-md-6 fv-row">
                      <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                          <span className="required">Cost</span>
                        </label>

                        <input type="number" id="cost" min={0} required className="form-control form-control-solid" placeholder="Enter Cost" />
                      </div>
                    </div>

                    <div className="col-md-6 fv-row">
                      <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                          <span>Payment</span>
                        </label>

                        <input type="number" id="payment" min={0} className="form-control form-control-solid" placeholder="Enter Payment" />
                      </div>
                    </div>

                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {!loading && <span className='indicator-label'>Submit</span>}
                    {loading && (
                      <span className='indicator-progress' style={{ display: 'block' }}>
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

export default LedgersPage
