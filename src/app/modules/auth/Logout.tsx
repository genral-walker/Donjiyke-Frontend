import React, {useEffect} from 'react'
import {Redirect, Switch} from 'react-router-dom'


export function Logout() {

  return (
    <Switch>
      <Redirect to='/auth/login' />
    </Switch>
  )
}
