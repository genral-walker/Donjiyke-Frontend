import React, {useState} from 'react'
import { KTSVG } from '../../../_metronic/helpers'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { TablesWidget13 } from '../../../_metronic/partials/widgets'
import { useAppDispatch, useAppSelector } from '../../../setup/redux/useRedux'
import axios from 'axios'

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

const StocksPage: React.FC = () => {

  const [stock, setStock] = useState<any>();


  let userStorage: any = window.localStorage.getItem('user');
  userStorage = JSON.parse(`${userStorage}`);   
  
  let user = useAppSelector(state => state.user);

  user = user.email? user : userStorage;

  const userToken = useAppSelector(state => state?.user?.auth?.accessToken) || userStorage?.auth?.accessToken;

  const submitStock = async (evt: React.FormEventHandler<HTMLFormElement> | any)=> {
  evt.preventDefault(); 

  const config = {
    headers: {Authorization: `Bearer ${userToken}` }
  }

  try {
    let res: any = await axios.post('http://localhost:8000/api/stocks', {
      kg: `${(document.getElementById('kg') as HTMLInputElement).value}`,
      metre_run: `${(document.getElementById('metre-run') as HTMLInputElement).value}`,    
      metre_out: `${(document.getElementById('metre-out') as HTMLInputElement).value}`,            
      issued_to: `${(document.getElementById('issued-to') as HTMLInputElement).value}`,   
      cost: `${(document.getElementById('cost') as HTMLInputElement).value}`,
      balance: `${(document.getElementById('balance') as HTMLInputElement).value}`,
      issued_by: user.email

    }, config);

    if (res) {
      alert('Stock created successfully!!')
      evt.target.reset();   


      try {
        let stocks = await axios.get('http://localhost:8000/api/stocks', config);
  
        if (stocks) {
          setStock(stocks.data)
          window.localStorage.setItem('stocks', JSON.stringify(stocks.data))
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
      <PageTitle breadcrumbs={accountBreadCrumbs}>Stocks Page</PageTitle>
      <div className='row gy-5 g-xl-8'>
        <TablesWidget13 datum={stock}
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
            <div className="modal-dialog" style={{ maxWidth: '1000px' }}>
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
                        <span className="required">Kg</span>
                      </label>
                      <input type="number" id="kg" required className="form-control form-control-solid" placeholder="Enter Kg" />
                    </div>
                  </div>

                  <div className="col-md-3 fv-row">
                    <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                      <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                        <span className="required">Metre Run</span>
                      </label>

                      <input type="number" id="metre-run" required className="form-control form-control-solid" placeholder="Enter Metre Run" />
                    </div>
                  </div>
                  <div className="col-md-3 fv-row">
                    <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                      <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                        <span className="required">Metre Out</span>
                      </label>

                      <input type="number" id="metre-out" required className="form-control form-control-solid" placeholder="Enter Metre Out" />
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
                </div>

                <div className="row g-9 mb-8">
                  <div className="col-md-6 fv-row">
                  <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                      <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                        <span className="required">Balance</span>
                      </label>

                      <input type="text" required id="balance" className="form-control form-control-solid" placeholder="Enter Balance" />
                    </div>
                  </div>

                  <div className="col-md-6 fv-row">
                  <div className="d-flex flex-column mb-8">
                  <label className="fs-6 fw-bold mb-2 required">Issued To</label>
                  <textarea className="form-control form-control-solid" id="issued-to" rows={3} required placeholder="Issued To?"></textarea>
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

export default StocksPage
