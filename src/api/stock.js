import request from '@/utils/request'

export function getStockList() {
  return request({
    url: '/stock/',
    method: 'get',
  })
}
export function getStockDetail(id) {
  return request({
    url: '/stock/'+String(id)+'/',
    method: 'get',
  })
}


export function addStock(data) {
    return request({
      url: '/stock/',
      method: 'post',
      data
    })
}

export function putStock(id, data) {
    return request({
      url: '/stock/'+String(id)+'/',
      method: 'put',
      data
    })
}

export function deleteStock(id) {
    return request({
      url: '/stock/'+ String(id)+'/',
      method: 'delete',
    })
}