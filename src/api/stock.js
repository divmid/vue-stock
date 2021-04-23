import request from '@/utils/request'

export function getStockList() {
  return request({
    url: '/api/v1/stock/',
    method: 'get',
  })
}
export function getStockDetail(id) {
  return request({
    url: '/api/v1/stock/'+String(id)+'/',
    method: 'get',
  })
}


export function addStock(data) {
    return request({
      url: '/api/v1/stock/',
      method: 'post',
      data
    })
}

export function putStock(id, data) {
    return request({
      url: '/api/v1/stock/'+String(id)+'/',
      method: 'put',
      data
    })
}

export function deleteStock(id) {
    return request({
      url: '/api/v1/stock/'+ String(id)+'/',
      method: 'delete',
    })
}