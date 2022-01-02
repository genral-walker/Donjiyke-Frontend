/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { addNewUSer, addUser } from '../../../../setup/redux/reducers/users';
import http, { useAppSelector, useAppDispatch } from '../../../../setup/redux/useRedux';
import { KTSVG, toAbsoluteUrl } from '../../../helpers'


type Props = {
  className: string
}

// USERS COMPONENT

const TablesWidget10: React.FC<Props> = ({ className }) => {

  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users);
  const user = useAppSelector(state => state.user);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  // const isCreated = userListsData.email && userListsData;


  const randomPass = (count: number) => {
    const letter = "0123456789ABCDEFGHIJabcdefghijklmnopqrstuvwxyzKLMNOPQRSTUVWXYZ0123456789abcdefghiABCDEFGHIJKLMNOPQRST0123456789jklmnopqrstuvwxyz";
    let randomString = "";
    for (let i = 0; i <= count; i++) {
      const randomStringNumber = Math.floor(1 + Math.random() * (letter.length - 1));
      randomString += letter.substring(randomStringNumber, randomStringNumber + 1);
    }
    return (document.getElementById('password') as HTMLInputElement).value = randomString;
  }


  const createUSer = async (evt: React.FormEventHandler<HTMLFormElement> | any) => {
    evt.preventDefault();
    evt.target.style.pointerEvents = 'none';
    setLoading(true);

    try {
      let res: any = await http.post('/create', {
        email: `${(document.getElementById('email') as HTMLInputElement).value}`,
        password: `${(document.getElementById('password') as HTMLInputElement).value}`
      });

      dispatch(addNewUSer(res.data))
      setLoading(false);
      evt.target.reset();
      alert('User created successfully!!')
      evt.target.style.pointerEvents = 'all';


    } catch (error: any) {
      setLoading(false);
      console.log(error.message ?? error);
      alert('Error creating user, please try again.');
      evt.target.style.pointerEvents = 'all';
    }
  }

  const deleteUser = async (id: string) => {
    const comfirmed = window.confirm('Are you sure you want to delete this user?');
    if (comfirmed) {
      setDeleting(true);
      try {
        const res = await http.delete(`/users/${id}`)
        if (res) {
          const datas = await http.get('/users');
          dispatch(addUser(datas.data));
          setDeleting(false);   
        }
      } catch (error: any) {
        setDeleting(false);   
        console.log(error);
        alert('Network Error, Please try again.')
      }
    }
  };

     
  return (
    <div className={`card ${className}`} style={{ display: user.role === 'admin' ? 'unset' : 'none', pointerEvents: deleting ? 'none' : 'all' }}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>Accounts List</span>
        </h3>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >

          {
            location.pathname === '/crafted/account' ?
              <a
                href='#'
                className='btn btn-sm btn-light-primary'
                data-bs-toggle="modal"
                data-bs-target="#kt_modal_1"

              >
                <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
                Add New
              </a> : ''
          }
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bolder text-muted'>
                <th className='min-w-150px'>Accounts</th>
                <th className='min-w-140px'>Info</th>
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>


              {users.length ? users.map((data: any) => {
                return (
                  <tr key={data.id}>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='symbol symbol-35px me-5'>
                          <img src={data.image_path ? data.image_path : toAbsoluteUrl('/media/avatars/blank.png')} alt='' />
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                          <a className='text-dark fw-bolder text-hover-primary fs-6' style={{ textTransform: 'capitalize' }}>        
                            {data?.name}
                          </a>
                          <span className='text-muted fw-bold text-muted d-block fs-7' style={{ textTransform: 'capitalize' }}>
                            {data.role}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <a className='text-dark fw-bolder d-block fs-6'>
                        {data.email}
                      </a>
                      <span className='text-muted fw-bold text-muted d-block fs-7'>
                        {data?.mobile}
                      </span>
                    </td>
                    <td>
                      <div className='d-flex justify-content-end flex-shrink-0'>
                        {data.role !== 'admin' &&
                          <a

                            className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm'
                            id="delete-user"
                            onClick={() => deleteUser(data.id)}
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen027.svg'
                              className='svg-icon-3'
                            />
                          </a>
                        }
                      </div>
                    </td>
                  </tr>
                )
              }) :
                <tr><td colSpan={10}><h3 style={{ margin: '1rem auto', width: 'max-content' }}>No Users Data</h3></td></tr>
              }
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}

      <div className="modal fade" tabIndex={-1} id="kt_modal_1">

        <form onSubmit={createUSer}>
          <div className="modal-dialog" style={{ maxWidth: '500px' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New User</h5>
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


                <div className="fv-row">
                  <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                    <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                      <span className="required">Email</span>
                    </label>
                    <input type="text" id="email" required className="form-control form-control-solid" placeholder="Enter Email" />
                  </div>
                </div>

                <div className="fv-row">
                  <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                    <label className="d-flex align-items-center fs-6 fw-bold mb-2">

                      <button type="button" className="btn btn-secondary" onClick={() => randomPass(15)}>
                        <span className="required">Generate Password</span>
                      </button>
                    </label>

                    <input type="text" id="password" required className="form-control form-control-solid mt-2" placeholder="Enter Password" />
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
  )
}

export { TablesWidget10 }
