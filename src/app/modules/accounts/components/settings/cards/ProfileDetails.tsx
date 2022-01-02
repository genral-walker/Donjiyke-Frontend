import React, { useMemo, useState } from 'react'
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'
import { IProfileDetails, profileDetailsInitValues as initialValues } from '../SettingsModel'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import http, { useAppDispatch, useAppSelector } from '../../../../../../setup/redux/useRedux'
import { updateProfile } from '../../../../../../setup/redux/reducers/user'
import { addUser } from '../../../../../../setup/redux/reducers/users'

const profileDetailsSchema = Yup.object().shape({
  fName: Yup.string().required('First name is required'),
  lName: Yup.string().required('Last name is required'),
  contactPhone: Yup.number().required('Phone number is required'),
  email: Yup.string().email('Please input a valid email').required('Email is required')
})

const ProfileDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user)
  const [loading, setLoading] = useState(false)
                

  const formik = useFormik<IProfileDetails>({
    initialValues, 
    enableReinitialize: true,
    validationSchema: profileDetailsSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = {
        name: values.fName + ' ' + values.lName,
        mobile: values.contactPhone,
        email: values.email
      };
      try {
        const updatedInfo = await http.patch(`/users/${user.id}`, formData)
        dispatch(updateProfile(updatedInfo.data));
        const usersData = await http.get('/users')
        dispatch(addUser(usersData.data));
        setLoading(false);
        alert('Account Details updated!')
      } catch (error) {
        setLoading(false);
        console.log(error);
        alert('Network Error, Please try again')
      }

    },
  })

  return (
    <div className='card mb-5 my-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
        style={{ pointerEvents: 'none' }}
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Account Settings</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Full Name</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='First name'
                      style={{ textTransform: 'capitalize' }}
                      {...formik.getFieldProps('fName')}
                    />
                    {formik.touched.fName && formik.errors.fName && (
                      <div className='fv-plugins-message-container text-danger'>
                        <div className='fv-help-block'>{formik.errors.fName}</div>
                      </div>
                    )}
                  </div>

                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mt-lg-0 mt-5'
                      placeholder='Last name'
                      style={{ textTransform: 'capitalize' }}
                      {...formik.getFieldProps('lName')}
                    />
                    {formik.touched.lName && formik.errors.lName && (
                      <div className='fv-plugins-message-container text-danger'>
                        <div className='fv-help-block'>{formik.errors.lName}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Phone Number</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type={'tel'}
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Phone number'
                  {...formik.getFieldProps('contactPhone')}
                />
                {formik.touched.contactPhone && formik.errors.contactPhone && (
                  <div className='fv-plugins-message-container text-danger'>
                    <div className='fv-help-block'>{formik.errors.contactPhone}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Email</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='email'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Email'
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='fv-plugins-message-container text-danger'>
                    <div className='fv-help-block'>{formik.errors.email}</div>
                  </div>
                )}
              </div>
            </div>

          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='submit' className='btn btn-primary' disabled={loading}>
              {!loading && 'Save Changes'}
              {loading && (
                <span className='indicator-progress' style={{ display: 'block' }}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { ProfileDetails }
