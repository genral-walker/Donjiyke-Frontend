import React, { useState } from 'react'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { KTSVG } from '../../../_metronic/helpers'
import { SalesTable } from '../../../_metronic/partials/widgets'
import { useAppDispatch, useAppSelector } from '../../../setup/redux/useRedux'
import axios from 'axios'


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

const SalesPage: React.FC = () => {
  const [sale, setSale] = useState<any>();


  let userStorage: any = window.localStorage.getItem('user');
  userStorage = JSON.parse(`${userStorage}`);
  
  let user = useAppSelector(state => state.user);

  user = user.email? user : userStorage;

  const userToken = useAppSelector(state => state.user.auth.accessToken) || userStorage.auth.accessToken;

  const submitSale = async (evt: React.FormEventHandler<HTMLFormElement> | any)=> {
  evt.preventDefault();


  const config = {
    headers: { Authorization: `Bearer ${userToken}` }
  }

  try {
    let res: any = await axios.post('http://localhost:8000/api/sales', {
      material: (document.getElementById('material') as HTMLInputElement).value,
      meter: (document.getElementById('meter') as HTMLInputElement).value,    
      payment: (document.getElementById('payment') as HTMLInputElement).value,            
      cost: (document.getElementById('cost') as HTMLInputElement).value,   
      balance: (document.getElementById('balance') as HTMLInputElement).value,
      issuer: user.email 
    }, config);

    if (res) {
      alert('Sale created successfully!!')
      evt.target.reset();   


      try {
        let sales = await axios.get('http://localhost:8000/api/sales', config);
  
        if (sales) {
          setSale(sales.data)
          window.localStorage.setItem('sales', JSON.stringify(sales.data))
        }
  
      } catch (error: any) {      
        alert(error.message ?? error)
      }

    }      

  } catch (error: any) {       
    alert(error.message ?? error)
  }


}

return (
  <>
    <PageTitle breadcrumbs={accountBreadCrumbs}>Sales Page</PageTitle>
    <div className='row gy-5 g-xl-8'>
      <SalesTable datum={sale}
        className='card-xxl-stretch-50 mb-14 mb-xl-18'
      />

      {/* MODAL */}

      <button type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#kt_modal_1"
      >
        Add New Sale
      </button>

      <div className="modal fade" tabIndex={-1} id="kt_modal_1">
        <form onSubmit={submitSale}>

          <div className="modal-dialog" style={{ maxWidth: '1000px' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Sale</h5>
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

              {/* <form> */}
              <div className="modal-body">

                {/* <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                  <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                    <span className="required">Target Title</span>
                    <i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="" data-bs-original-title="Specify a target name for future usage and reference" aria-label="Specify a target name for future usage and reference"></i>
                  </label>
                 
                  <input type="text" className="form-control form-control-solid" placeholder="Enter Target Title" />
                  <div className ="fv-plugins-message-container invalid-feedback"></div>
                  </div> */}


                <div className="row g-9 mb-8">
                  <div className="col-md-3 fv-row">
                    <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                      <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                        <span className="required">Meter</span>
                      </label>
                      <input type="number" id="meter" required className="form-control form-control-solid" placeholder="Enter Meter" />
                    </div>
                  </div>

                  <div className="col-md-3 fv-row">
                    <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                      <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                        <span className="required">Payment</span>
                      </label>

                      <input type="number" id="payment" required className="form-control form-control-solid" placeholder="Enter Payment" />
                    </div>
                  </div>
                  <div className="col-md-3 fv-row">
                    <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                      <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                        <span className="required">Cost</span>
                      </label>

                      <input type="number" id="cost" required className="form-control form-control-solid" placeholder="Enter Cost" />
                    </div>
                  </div>
                  <div className="col-md-3 fv-row">
                    <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                      <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                        <span className="required">Balance</span>
                      </label>

                      <input type="number" id="balance" required className="form-control form-control-solid" placeholder="Enter Balance" />
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column mb-8">
                  <label className="fs-6 fw-bold mb-2 required">Material</label>
                  <textarea className="form-control form-control-solid" id="material" rows={3} required placeholder="Enter Material"></textarea>
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
                <button type="submit" className="btn btn-primary">
                  Submit
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
