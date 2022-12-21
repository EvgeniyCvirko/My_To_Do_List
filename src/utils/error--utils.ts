import {appSetError, appSetStatus} from '../app/AppReducer';
import {ResponseType} from '../api/Types';
import {AxiosError} from 'axios';

type ThunkAPIType = {
  dispatch: (action: any) => any
  rejectWithValue: Function
}

export const asyncServerAppError = (thunkApi: ThunkAPIType, data: ResponseType, showError = true) => {
  if (showError) {
    thunkApi.dispatch(appSetError(({error: data.messages.length ? data.messages[0] : 'Some error occurred'})))
  }
  thunkApi.dispatch(appSetStatus({status: 'failed'}))
  return thunkApi.rejectWithValue({errors: data.messages[0], fieldsErrors: data.fieldsErrors})
}

export const asyncServerNetworkError = (thunkApi: ThunkAPIType, error: AxiosError, showError = true) => {
  if (showError) {
    thunkApi.dispatch(appSetError(({error: error.message.length ? error.message : 'Some error occurred'})))
  }
  thunkApi.dispatch(appSetStatus({status: 'failed'}))
  return thunkApi.rejectWithValue({errors: error.message[0], fieldsErrors: undefined})
}