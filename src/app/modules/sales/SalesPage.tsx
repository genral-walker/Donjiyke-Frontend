import React, { useState } from 'react'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { KTSVG } from '../../../_metronic/helpers'
import { SalesTable } from '../../../_metronic/partials/widgets'
import http, { useAppDispatch, useAppSelector } from '../../../setup/redux/useRedux'
import { addSales } from '../../../setup/redux/reducers/sales'


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
  const user = useAppSelector(state => state.user);
  const stocks = useAppSelector(state => state.stocks);
  const dispatch = useAppDispatch();

  const submitSale = async (evt: React.FormEventHandler<HTMLFormElement> | any) => {
    evt.preventDefault();
    const metreValue = (document.getElementById('meter') as HTMLInputElement).value;
    return console.log(metreValue, stocks[0].metre_run);     
    /*
    IF the user is admin, allow them to make a sale.
    else if the user isn't admin...
      Check if they have filled their name, if yes then allow them make a sale.
      else prompt them to fill their name first, then direct them to the profile page to fill in their name.
    */
    try {
      let res: any = await http.post('/sales', {  
        /*
        If the metre out is taken fromm more than one row... divide the call according to the row. when all the calls succeed 
        only then will u show success.
         else show suucess to where it reached.
        */ 

        /*
        check how much metre run was inputed.
        divide or just make a single call if all meter out can be gotten from the current row which isn't empty.
        */  
        target_roll: (document.getElementById('material') as HTMLInputElement).value, //role we are making the sale from
        metre_run: '', // get the previous object metre run or get the balance data from stocks.
        metre_out: (document.getElementById('meter') as HTMLInputElement).value, // get from the input field... calculate how the meter out and deermine how many roles you'd take from. show error if it's more than the availabe row and give them the total they can take. also determine how many was taken from each row so it'll be shown when fetched again.
        balance: (document.getElementById('balance') as HTMLInputElement).value, // deduct metre out from metre run.
        issuer: user.email // if admin, use the status else use the name of the issuer.
      });

      if (res) {
        alert('Sale created successfully!!')
        evt.target.reset();

        try {
          let sales = await http.get('/sales');

          if (sales) {
            dispatch(addSales(sales.data))
          }

        } catch (error: any) {
          console.log(error.message ?? error)
          alert('Network error, please try again.')
        }

      }

    } catch (error: any) {
      console.log(error.message ?? error)
      alert('Network error, please try again.')
    }

  }

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
          <form onSubmit={submitSale}>

            <div className="modal-dialog" style={{ maxWidth: '400px' }}>
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
                    <div className="col fv-row">
                      <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                        <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                          <span className="required">Metre Out</span>
                        </label>
                        <input type="number" id="meter" required className="form-control form-control-solid" placeholder="Enter Metre Out" />
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

export default SalesPage
