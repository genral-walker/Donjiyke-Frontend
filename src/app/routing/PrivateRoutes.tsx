import React, { Suspense, lazy, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { loadLedgers } from '../../setup/redux/reducers/ledgers'
import { addSales } from '../../setup/redux/reducers/sales'
import { addStock } from '../../setup/redux/reducers/stocks'
import { addUser } from '../../setup/redux/reducers/users'
import http, { useAppDispatch, useAppSelector } from '../../setup/redux/useRedux'
import { FallbackView } from '../../_metronic/partials'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'


export function PrivateRoutes() {

  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const StocksPage = lazy(() => import('../modules/stocks/StocksPage'))
  const SalesPage = lazy(() => import('../modules/sales/SalesPage'))
  const LedgersPage = lazy(() => import('../modules/ledgers/LedgersPage'))

  const fetchUIs = async () => {
    let data: any;

    try {
      if (user.role === 'admin') {
        const res = await Promise.all([
          http.get('/sales'),
          http.get('/stocks'),
          http.get('/users'),
          http.get('/ledgers')
        ]);

        data = { sales: res[0].data, stocks: res[1].data, users: res[2].data, ledgers: res[3].data };    
        dispatch(addSales(data.sales))
        dispatch(addStock(data.stocks))
        dispatch(addUser(data.users))
        dispatch(loadLedgers(data.ledgers))

      } else {

        const res = await Promise.all([   
          http.get('/sales'),
          http.get('/stocks'),
          http.get('/ledgers')
        ]);

        data = { sales: res[0].data, stocks: res[1].data, ledgers: res[2].data };
        dispatch(addSales(data.sales))
        dispatch(addStock(data.stocks))
        dispatch(loadLedgers(data.ledgers))
      }
      
    } catch (err) {
      console.log(err)
      alert('Error loading page data. Please reload the page.')
    }
  };

  useEffect(() => {
    fetchUIs()
  }, [])


  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/builder' component={BuilderPageWrapper} />
        <Route path='/crafted/pages/profile' component={ProfilePage} />
        <Route path='/crafted/pages/wizards' component={WizardsPage} />
        <Route path='/crafted/widgets' component={WidgetsPage} />
        <Route path='/crafted/account' component={AccountPage} />
        <Route path='/apps/chat' component={ChatPage} />
        <Route path='/menu-test' component={MenuTestPage} />
        <Route path='/crafted/pages/stocks' component={StocksPage} />
        <Route path='/crafted/pages/sales' component={SalesPage} />
        <Route path='/crafted/pages/ledgers' component={LedgersPage} />   
        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
