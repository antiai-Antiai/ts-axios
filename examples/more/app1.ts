import axios from '../../src/index'

document.cookie = 'a=b'

// axios.get('/more/get').then(res => {
//   console.log(res)
// })

// axios.post('http://localhost:8088/more/server2',{
//   withCredentials: true
// }).then(res => {
//   console.log(res)
// })

axios.get('/more/get',{
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
}).then(res => {
  console.log(res)
})
