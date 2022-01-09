/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {IUpdatePassword, IUpdateEmail, updatePassword, updateEmail} from '../SettingsModel'
import http, { useAppDispatch, useAppSelector } from '../../../../../../setup/redux/useRedux'

const emailFormValidationSchema = Yup.object().shape({
  newEmail: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  confirmPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const passwordFormValidationSchema = Yup.object().shape({
  newPassword: Yup.string()   
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
})

const SignInMethod: React.FC = () => {
  const user = useAppSelector(state => state.user)
  const [emailUpdateData, setEmailUpdateData] = useState<IUpdateEmail>(updateEmail)
  const [passwordUpdateData, setPasswordUpdateData] = useState<IUpdatePassword>(updatePassword)

  const [showEmailForm, setShowEmailForm] = useState<boolean>(false)
  const [showPasswordForm, setPasswordForm] = useState<boolean>(false)

  const [loading1, setLoading1] = useState(false)

  const formik1 = useFormik<IUpdateEmail>({
    initialValues: {
      ...emailUpdateData,
    },
    validationSchema: emailFormValidationSchema,
    onSubmit: (values) => {
      setLoading1(true)
      setTimeout((values) => {
        setEmailUpdateData(values)
        setLoading1(false)
        setShowEmailForm(false)
      }, 1000)
    },
  })

  const [loading2, setLoading2] = useState(false)

  const formik2 = useFormik<IUpdatePassword>({
    initialValues: {
      ...passwordUpdateData,
    },
    validationSchema: passwordFormValidationSchema,
    onSubmit: async (values) => {
      setLoading2(true);  
      try { 
        const updatedInfo = await http.patch(`/users/${user.id}`, {password: values.newPassword})
        setLoading2(false);
        alert('Password updated!')
      } catch (error) {
        setLoading2(false);
        console.log(error);
        alert('Network Error, Please try again')
      }
    },
  })

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_signin_method'
        style={{pointerEvents: 'none'}}
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Password</h3>
        </div>
      </div>

      <div id='kt_account_signin_method' className='collapse show'>
        <div className='card-body border-top p-9'>

          <div className='d-flex flex-wrap align-items-center mb-10'>
            <div id='kt_signin_password' className={' ' + (showPasswordForm && 'd-none')}>
              <div className='fs-6 fw-bolder mb-1'>Password</div>
              <div className='fw-bold text-gray-600'>************</div>
            </div>

            <div
              id='kt_signin_password_edit'
              className={'flex-row-fluid ' + (!showPasswordForm && 'd-none')}
            >
              <form
                onSubmit={formik2.handleSubmit}     
                id='kt_signin_change_password'
                className='form'
                noValidate
              >
                <div className='row mb-1'>
                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='newpassword' className='form-label fs-6 fw-bolder mb-3'>
                        New Password
                      </label>
                      <input
                        type='password'
                        className='form-control form-control-lg form-control-solid '
                        id='newpassword'
                        {...formik2.getFieldProps('newPassword')}
                      />
                      {formik2.touched.newPassword && formik2.errors.newPassword && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik2.errors.newPassword}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='confirmpassword' className='form-label fs-6 fw-bolder mb-3'>
                        Confirm New Password
                      </label>
                      <input
                        type='password'
                        className='form-control form-control-lg form-control-solid '
                        id='confirmpassword'
                        {...formik2.getFieldProps('passwordConfirmation')}
                      />
                      {formik2.touched.passwordConfirmation && formik2.errors.passwordConfirmation && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik2.errors.passwordConfirmation}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='form-text mb-5'>
                  Password must be at least 8 character and contain symbols
                </div>

                <div className='d-flex'>
                  <button
                    id='kt_password_submit'
                    type='submit'
                    className='btn btn-primary me-2 px-6'
                  >
                    {!loading2 && 'Update Password'}
                    {loading2 && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setPasswordForm(false)
                    }}
                    id='kt_password_cancel'
                    type='button'
                    className='btn btn-color-gray-400 btn-active-light-primary px-6'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <div
              id='kt_signin_password_button'
              className={'ms-auto ' + (showPasswordForm && 'd-none')}
            >
              <button
                onClick={() => {
                  setPasswordForm(true)
                }}
                className='btn btn-light btn-active-light-primary'
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {SignInMethod}
