/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {useIntl} from 'react-intl'
import {useAppSelector} from '../../../setup/redux/useRedux'
import {PageTitle} from '../../../_metronic/layout/core'
import {
  MixedWidget1,
  TablesWidget13,
  TablesWidget10,
  SalesTable,
} from '../../../_metronic/partials/widgets'
import {Ledgers} from '../../../_metronic/partials/widgets/tables/Ledgers'

const DashboardPage: FC = () => {
  const user = useAppSelector((state) => state.user)
  return (
    <>
      {/* begin::Row */}
      <div className='row gy-5 g-xl-8'>
        <MixedWidget1 className='card-xxl-stretch-50 mb-14 mb-xl-18' color='primary' />
      </div>

      <div className='row gy-5 g-xl-8'>
        <SalesTable className='card-xxl-stretch-50 mb-14 mb-xl-18' />
      </div>

      <div className='row gy-5 g-xl-8'>
        <TablesWidget13 className='card-xxl-stretch-50 mb-14 mb-xl-18' />
      </div>

      <div className='row gy-5 g-xl-8'>
        <Ledgers className='card-xxl-stretch-50 mb-14 mb-xl-18' />
      </div>

      {user.role === 'admin' && (
        <div className='row gy-5 gx-xl-8'>
          <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />
        </div>
      )}
    </>
  )
}

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
