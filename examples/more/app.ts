import axios from '../../src/index'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import qs from 'qs'
import { AxiosError } from '../../src/helpers/error'

/*
const instance = axios.create()

function calculatePercentage(loaded: number, total: number) {
  return Math.floor(loaded * 1.0) / total
}

function loadProgressBar() {
  const setupStartProgress = () => {
    instance.interceptors.request.use(config => {
      NProgress.start()
      return config
    })
  }

  const setupUpdateProgress = () => {
    const update = (e: ProgressEvent) => {
      console.log(e)
      NProgress.set(calculatePercentage(e.loaded, e.total))
    }
    instance.defaults.onDownloadProgress = update
    instance.defaults.onUploadProgress = update
  }

  const setupStopProgress = () => {
    instance.interceptors.response.use(
      response => {
        NProgress.done()
        return response
      },
      error => {
        NProgress.done()
        return Promise.reject(error)
      }
    )
  }
  setupStartProgress()
  setupUpdateProgress()
  setupStopProgress()
}

loadProgressBar()

const downloadEl = document.getElementById('download')
downloadEl.addEventListener('click', e => {
  instance.get('https://img1.mukewang.com/szimg/5e98339809ac343012000676-360-202.png')
})

const uploadEl = document.getElementById('upload')
uploadEl.addEventListener('click', e => {
  const data = new FormData()
  const fileEl = document.getElementById('file') as HTMLInputElement
  if (fileEl.files) {
    data.append('file', fileEl.files[0])

    instance.post('/more/upload', data)
  }
})
*/
/*
axios
  .post(
    '/more/post',
    {
      auth: {
        username: 'Yee1',
        password: '123456'
      }
    },
    {
      a: 1
    }
  )
  .then(res => {
    console.log(res)
  })


axios
  .get('/more/304')
  .then(res => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log(e.message)
  })

axios
  .get('/more/304', {
    validateStatus(status) {
      return status >= 200 && status < 400
    }
  })
  .then(res => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log(e.message)
  })



axios
  .get('/more/get', {
    params: new URLSearchParams('a=b&c=d')
  })
  .then(res => {
    console.log(res)
  })

axios
  .get('/more/get', {
    params: {
      a: 1,
      b: 2,
      c: ['a', 'b', 'c']
    }
  })
  .then(res => {
    console.log(res)
  })

const instance1 = axios.create({
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
})

instance1
  .get('/more/get', {
    params: {
      a: 1,
      b: 2,
      c: ['a', 'b', 'c']
    }
  })
  .then(res => {
    console.log(res)
  })
*/
// https://img3.mukewang.com/szimg/5e98339809ac343012000676-360-202.png
// const instance2 = axios.create({
//   baseURL: 'https://img3.mukewang.com'
// })

// instance2.get('/szimg/5e98339809ac343012000676-360-202.png')
// instance2.get('https://img3.mukewang.com/szimg/5e98339809ac343012000676-360-202.png')

function getA() {
  return axios.get('/more/A')
}

function getB() {
  return axios.get('/more/B')
}

// axios.all([getA(), getB()]).then(
//   axios.spread(function(resA, resB) {
//     console.log(resA)
//     console.log(resB)
//   })
// )

axios.all([getA(), getB()]).then(([resA, resB]) => {
  console.log(resA)
  console.log(resB)
})

const fakeConfig = {
  baseURL: 'https//www.baidu.com',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'thisIsATest'
  }
}

console.log(axios.getUri(fakeConfig))
