/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useLayout} from '../core'

const Footer: FC = () => {
  const {classes} = useLayout()
  return (
    <div className='footer py-4 d-flex flex-lg-column' id='kt_footer'>
      {/* begin::Container */}
      <div
        className={`${classes.footerContainer} d-flex flex-column flex-md-row align-items-center justify-content-between`}
      >
        {/* begin::Copyright */}
        <div className='text-dark order-2 order-md-1'>
        <span className='text-muted fw-bold me-2'>{new Date().getFullYear()} &copy;</span> Don Jiyke Aluminium Ltd. 
          &nbsp;
          Made with&nbsp;
          <a href='https://www.sqtwebsolutions.com/' target='_blank' rel='noreferrer' className='text-gray-800 text-hover-primary'>
           ❤️ by SQT Web Solutions
          </a>
        </div>
        {/* end::Copyright */}

      </div>
      {/* end::Container */}
    </div>
  )
}

export {Footer}
