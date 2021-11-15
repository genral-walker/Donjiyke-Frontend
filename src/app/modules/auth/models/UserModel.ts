import {AuthModel} from './AuthModel'
import {UserAddressModel} from './UserAddressModel'
import {UserCommunicationModel} from './UserCommunicationModel'
import {UserEmailSettingsModel} from './UserEmailSettingsModel'
import {UserSocialNetworksModel} from './UserSocialNetworksModel'

export interface UserModel {
  id?: number
  email?: string
  name?: string
  mobile?: string
  role?: string
  avatar?: string
  email_verified_at?: any
  created_at?: any
  updated_at?: any
  auth: AuthModel
}

/*
{
    "user": {
        "id": 1,
        "name": "Walker",
        "mobile": "08164344955",
        "role": "admin",
        "email": "lukmansanni60@gmail.com",
        "image_path": null,
        "email_verified_at": null,
        "created_at": null,
        "updated_at": "2021-10-29T14:30:20.000000Z"
    },
    "token": "13|vrQWqMbbyaHXjjhNXD8AXtmVcjeiHPRyYjxYVS0S"   
}
*/