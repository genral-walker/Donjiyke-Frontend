import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { KTSVG } from '../../../_metronic/helpers'
import { SalesTable} from '../../../_metronic/partials/widgets' 

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
  return (
    <>
    <PageTitle breadcrumbs={accountBreadCrumbs}>Sales Page</PageTitle>
    <div className='row gy-5 g-xl-8'>
        <SalesTable
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
                      <input type="number" required className="form-control form-control-solid" placeholder="Enter Kg" />
                    </div>
                  </div>

                  <div className="col-md-3 fv-row">
                    <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                      <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                        <span className="required">Metre Run</span>
                      </label>

                      <input type="number" required className="form-control form-control-solid" placeholder="Enter Metre Run" />
                    </div>
                  </div>
                  <div className="col-md-3 fv-row">
                    <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                      <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                        <span className="required">Metre Out</span>
                      </label>

                      <input type="number" required className="form-control form-control-solid" placeholder="Enter Metre Out" />
                    </div>
                  </div>
                  <div className="col-md-3 fv-row">
                    <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                      <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                        <span className="required">Balance</span>
                      </label>

                      <input type="number" required className="form-control form-control-solid" placeholder="Enter Balance" />
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column mb-8">
                  <label className="fs-6 fw-bold mb-2 required">Issued To</label>
                  <textarea className="form-control form-control-solid" rows={3} required placeholder="Issued To?"></textarea>
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
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SalesPage
