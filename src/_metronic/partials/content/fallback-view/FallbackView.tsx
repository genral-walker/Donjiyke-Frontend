import {toAbsoluteUrl} from '../../../helpers'

export function FallbackView() {
  return (
    <div className='splash-screen'>   
      <img src={toAbsoluteUrl('/media/donjiyke.jpg')} style={{ width: '80px', borderRadius: '7px' }} alt='Start logo' />   
      <span>Loading ...</span>
    </div>
  )
}
