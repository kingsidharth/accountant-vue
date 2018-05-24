
const endpoints_map = {
  BASE: 'http://local.appserver.com:5000/',
  VERSION: 'v1/',
  ACCOUNTS_LIST: 'accounts/',
  ACCOUNT_DETAILS: 'accounts/',
  ACCOUNT_TRANSACTIONS: 'transactions/'
}


const mapper = function(key) {
  map = ['BASE', 'VERSION']

  switch (key) {
    case 'ACCOUNTS_LIST':
      map.push(key)
      break;
    default:
      return map
  }
}


const resolver = function(map) {
  endpoint = ''
  for (var i = 0; i < map.length; i++) {
    endpoint += s_map[map[i]]
  }

  return endpoint
}

export default function(endpoint_key, type='GET') {
  /*
  Args:
    - URL:String
    - ['GET (Default)', 'POST', 'PUT', ]:String

  => fetch function(thenable):Promise
  */

  return fetch(endpoint_key, { mode: 'cors' }).then((response) => {
    if(!response.ok) {
      console.error(response)
      console.log(endpoint + '');
    } else {
      return response.json()
    }
  })
}
