import { includes, keys } from 'lodash'
import endpoints_map from './concern_endpoint_map'


const resolver = function(map) {
  // [Key:String, ]:Array => URL:String
  let endpoint = ''
  for (var i = 0; i < map.length; i++) {
    endpoint += endpoints_map[map[i]]
  }

  return endpoint
}

const is_leggit_key = function(key) {
  // ENUM:String => :Boolean
  if (includes(keys(endpoints_map), key)) {
    return true
  } else {
    console.error(key + ' doesn\'t match any key in endpoints_map')
    return false
  }
}

const base_url = function(key) {
  // ENUM:String => URL:String
  let map = ['BASE', 'VERSION']
  if (is_leggit_key(key)) {
    map.push(key)
    return resolver(map)
  }
}

const domain_url = function(key) {
  // ENUM:String => URL:String
  if (is_leggit_key(key)) {
    return resolver([key])
  }
}

const make_url_param_string = function(params) {
  let url_string = '?'
  Object.keys(params).map((k,i) => {
    url_string += k + '=' + params[k]
  })
  return url_string
}

const request = function(endpoint, type='GET') {
  /*
  Args:
    - Key:String
    - ['GET', 'POST', 'PUT', ]:String Default:GET

  => fetch function(thenable):Promise
  */

  return fetch(endpoint, { mode: 'cors' }).then((response) => {
    console.log('Remote call for ' + endpoint);
    if(!response.ok || !!response.error) {
      console.error(response)
      console.log(endpoint + '');
    } else {
      return response.json()
    }
  })
}


export default {
  base_url,
  domain_url,
  request,
  make_url_param_string
}
