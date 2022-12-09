import {instance} from './Api';
import {LoginDataType} from '../types/CommonTypes';
import {ResponseType} from './Types';

export const LoginApi = {
  setLogin (loginData: LoginDataType ) {
    return instance.post<ResponseType<{userId:string}>>('/auth/login', {loginData})
  },
  deletLogin () {
    return instance.delete<ResponseType>('/auth/login')
  },
}

