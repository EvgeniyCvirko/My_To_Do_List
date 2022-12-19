import React, {useState} from 'react';
import './ErrorBar.css'
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import cn from 'classnames'
import {appSetError} from '../../app/AppReducer';

export const ErrorBar = () => {
  const [isClose, setIsClose] = useState<boolean>(true)
  const error = useAppSelector(state => state.app.error)
  const dispatch = useAppDispatch()
  const closeHandler = () => {
    setIsClose(!isClose)
    dispatch(appSetError({error: null}))

  }
  if (isClose) {
    setTimeout(() => {
      setIsClose(!isClose)
      dispatch(appSetError({error: null}))
    }, 10000)
  }

  return <div className='errorBlock'>
    {error && isClose && <div className={cn({['alert']: error}, 'alert-danger')}>{error}
        <div className="close" onClick={closeHandler}>close</div>
    </div>}
  </div>
}