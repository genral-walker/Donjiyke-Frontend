import React, { useState } from 'react'
import { KTSVG } from '../../../_metronic/helpers'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { TablesWidget13 } from '../../../_metronic/partials/widgets'
import http, { useAppDispatch } from '../../../setup/redux/useRedux'
import { addNewStock, addStock } from '../../../setup/redux/reducers/stocks'
import moment from 'moment'



const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Stocks',
    path: '/crafted/pages/stocks',
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
STOCKS PAGE
*/
const StocksPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const submitStock = async (evt: React.FormEventHandler<HTMLFormElement> | any) => {
    evt.preventDefault();
    setLoading(true);
    let dateInConvert = new Date((document.getElementById('dateIn') as HTMLInputElement).value);
    const formatedDate = moment(dateInConvert).format('DD/MM/YYYY, h:mm a');
    const formData = {
      date_in: formatedDate,  
      kg: (document.getElementById('kg') as HTMLInputElement).value,
      metre_run: (document.getElementById('metre-run') as HTMLInputElement).value,
      balance: (document.getElementById('metre-run') as HTMLInputElement).value,
      colour: (document.getElementById('colour') as HTMLInputElement).value,
      description: (document.getElementById('description') as HTMLInputElement).value,
    }

    try {
      let res: any = await http.post('/stocks', formData);

      dispatch(addNewStock(res.data));
      setLoading(false)
      alert('Stock created successfully!!')
      evt.target.reset();

    } catch (error: any) {
      setLoading(false)
      console.log(error.message ?? error);
      alert('Network error, please try again.')
    }
  }


  return (
    <>
      <PageTitle breadcrumbs={accountBreadCrumbs}>Stocks Page</PageTitle>
      <div className='row gy-5 g-xl-8'>
        <TablesWidget13
          className='card-xxl-stretch-50 mb-14 mb-xl-18'
        />

        {/* MODAL */}

        <button type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_1"
        >
          Add New Stock
        </button>
        <div className="modal fade" tabIndex={-1} id="kt_modal_1">

          <form onSubmit={submitStock}>
            <div className="modal-dialog" style={{ maxWidth: '700px' }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Stock</h5>
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

                  <div className="row g-3 mb-8">

                    <div className="col-md-6 fv-row">
                      <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                          <span className="required">Date In</span>
                        </label>
                        <input type={'datetime-local'} id="dateIn" required className="form-control form-control-solid" placeholder="Select Date In" />
                      </div>
                    </div>

                    <div className="col-md-6 fv-row">
                      <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                          <span className="required">Kg</span>
                        </label>
                        <input type="number" id="kg" min={0} required className="form-control form-control-solid" placeholder="Enter Kg" />
                      </div>
                    </div>

                    <div className="col-md-6 fv-row">
                      <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                          <span className="required">Metre Run</span>
                        </label>

                        <input type="number" id="metre-run" min={0} required className="form-control form-control-solid" placeholder="Enter Metre Run" />
                      </div>
                    </div>

                    <div className="col-md-6 fv-row">
                      <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                          <span className="required">Roll Colour</span>
                        </label>

                        <input style={{ height: '44px' }} type="color" id="colour" required className="form-control form-control-solid" placeholder="Select Colour" />
                      </div>
                    </div>

                    <div className="col fv-row">
                      <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                          <span className="required">Description</span>
                        </label>
                        <textarea style={{ resize: 'none' }} name="description" id="description" rows={3} required className="form-control form-control-solid" placeholder="Enter Description"></textarea>
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

export default StocksPage
