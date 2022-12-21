import React from 'react';
import './ErrorBar.css'
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import cn from 'classnames'
import {appSetError} from '../../app/AppReducer';

export const ErrorBar = () => {
  const error = useAppSelector(state => state.app.error)
  const dispatch = useAppDispatch()
  const closeHandler = () => {
    dispatch(appSetError({error: null}))

  }
  if (error) {
    setTimeout(() => {
      dispatch(appSetError({error: null}))
    }, 10000)
  }

  return <div className='errorBlock'>
    {error && <div className={cn({['alert']: error}, 'alert-danger')}>{error}
        <div className="close" onClick={closeHandler}>close</div>
    </div>}
  </div>
}