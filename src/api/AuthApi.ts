import {instance} from './Api';
import {AuthType, ResponseType} from './Types';

export const AuthApi = {
  authMe () {
    return instance.get<ResponseType<AuthType>>('/auth/me')
  },

}

