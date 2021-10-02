import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Settings} from './components/settings/Settings'
import {AccountHeader} from './AccountHeader'
import {
  TablesWidget10
} from '../../../_metronic/partials/widgets'

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Account',
    path: '/crafted/account/overview',
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

const AccountPage: React.FC = () => {
  return (
    <>
      <AccountHeader />
      <PageTitle breadcrumbs={accountBreadCrumbs}>Account</PageTitle>
        <Settings />
        <div className='card mb-5 mb-xl-10'>
          {/* card-xxl-stretch mb-5 mb-xl-8*/}
      <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />
    </div>
    </>
  )
}

export default AccountPage
