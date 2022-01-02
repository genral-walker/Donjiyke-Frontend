/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { logOut } from '../../../../setup/redux/reducers/user'
import http, { useAppSelector, useAppDispatch } from '../../../../setup/redux/useRedux'
import { toAbsoluteUrl } from '../../../helpers'

const HeaderUserMenu: FC = () => {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const signOut = () => {
    try {
      http.post('/logout').then(() => dispatch(logOut()))
    } catch (error: any) {
      http.post('/logout');
      dispatch(logOut());
    }
  }

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3' style={{ pointerEvents: 'none' }}>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={user.avatar ? user.avatar : toAbsoluteUrl('/media/avatars/blank.png')} />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {user.name}
              <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Admin</span>
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {user.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <Link to={'/crafted/account'} className='menu-link px-5'>
          My Profile
        </Link>
      </div>

      {/* <div className='menu-item px-5 my-1'>
        <Link to='/crafted/account/settings' className='menu-link px-5'>
          Account Settings
        </Link>
      </div> */}

      <div className='menu-item px-5' onClick={signOut}>
        <span className='menu-link px-5'>
          Sign Out   
        </span>
      </div>   
    </div>
  )
}

export { HeaderUserMenu }
