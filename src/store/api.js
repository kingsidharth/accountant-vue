import _ from 'lodash'

const endpoints_map = {
  BASE: 'http://local.appserver.com:5000/',
  VERSION: 'v1/',
  ACCOUNTS: 'accounts/',
  TRANSACTIONS: 'transactions/',
}

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
  if (_.includes(_.keys(endpoints_map), key)) {
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

const request = function(endpoint, type='GET') {
  /*
  Args:
    - Key:String
    - ['GET', 'POST', 'PUT', ]:String Default:GET

  => fetch function(thenable):Promise
  */

  return fetch(endpoint, { mode: 'cors' }).then((response) => {
    console.log('Remote call for ' + endpoint);
    if(!response.ok) {
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
  request
}
