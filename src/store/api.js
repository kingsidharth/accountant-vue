import _ from 'lodash'

const endpoints_map = {
  BASE: 'http://local.appserver.com:5000/',
  VERSION: 'v1/',
  ACCOUNTS: 'accounts/',
}

const resolver = function(map) {
  // [Key:String, ]:Array => URL:String
  let endpoint = ''
  for (var i = 0; i < map.length; i++) {
    endpoint += endpoints_map[map[i]]
  }

  return endpoint
}

const mapper = function(key) {
  // ENUM:String => URL:String
  let map = ['BASE', 'VERSION']

  if (!_.includes(_.keys(endpoints_map), key)) {
    console.error(key + ' doesn\'t match any key in endpoints_map')
  } else {
    map.push(key)
    return resolver(map)
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
  base_url: mapper,
  request
}
