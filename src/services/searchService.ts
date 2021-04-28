import request from '@/utils/request';

export async function fakeGetAll(){
  return request('/api/all')
}
export async function fakeSearch(searchData: any){
  return request('/api/search',{
    method: 'POST',
    data: searchData
  })
}
export async function fakeActivatePromo(id: any){
  return request('/api/activate',{
    method: 'POST',
    data:id
  })

}
export async function fakeLoadMore(skip: any){
  return request('/api/loadMore',{
    method: 'POST',
    data:skip
  })

}
