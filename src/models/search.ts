import type { Effect, Reducer } from "umi";
import { fakeActivatePromo, fakeGetAll, fakeLoadMore, fakeSearch } from "@/services/searchService";
import { message } from "antd";



export interface Service{
  key: string;
  name: string;
  description: string;
  promo: string;
  isActivated: boolean;
}

export interface ServiceState{
  serviceList?: Service[]
  data?: Service[]
}
export interface ServiceModelType{
  namespace: string;
  state: ServiceState;
  effects: {
    getService: Effect;
    searchService: Effect;
    activateService: Effect;
    loadMore: Effect;

  };
  reducers: {
    saveGetService: Reducer<ServiceState>;
    saveSearchService: Reducer<ServiceState>;
    saveActivate: Reducer<ServiceState>;
    saveLoadMore: Reducer<ServiceState>;
  }
}

const SearchModel: ServiceModelType ={
  namespace: 'search',
  state: {
    serviceList:[]
  },
  effects: {
    /**
     *
     *
     * @param {*} _
     * @param {*} {call,put}
     */
    *getService(_,{call,put}){
      const service = yield call(fakeGetAll);

        yield put({type: 'saveGetService',payload: service});

    },
    /**
     *
     *
     * @param {*} {payload}
     * @param {*} {call,put}
     */
    *searchService({payload},{call,put}){
      const response = yield call(fakeSearch, payload);
      if(response.status === 'ok'){
        yield put({type: 'saveSearchService', payload: response.result});
      }
    },

    /**
     *
     *
     * @param {*} {payload}
     * @param {*} {call,put}
     */
    *activateService({payload},{call,put}){
      const response = yield call(fakeActivatePromo, payload);
      if(response.status === 'ok'){
        yield put({type:'getService'});
        message.success("activation was successful")
      }
    },
    *loadMore({payload},{call,put}){
      const response = yield call(fakeLoadMore, payload)
      if(response.status === 'ok'){

        yield put({type:'saveLoadMore',payload:  response.body})
      }
    },
  },
  reducers:{

    /**
     *
     *
     * @param {*} state
     * @param {*} {payload}
     * @returns
     */
    saveGetService(state,{payload}){
      return {...state, serviceList: payload,data:payload}
    },
    /**
     *
     *
     * @param {*} state
     * @param {*} {payload}
     * @returns
     */
    saveSearchService(state,{payload}){
      return {...state, serviceList: payload, data: payload}
    },
    /**
     *
     *
     * @param {*} state
     * @param {*} {payload}
     * @returns
     */
    saveActivate(state,{payload}){
      return {...state, serviceList: payload}
    },
    /**
     *
     *
     * @param {*} state
     * @param {*} {payload}
     * @returns
     */
    saveLoadMore(state,{payload}){

      return {...state, serviceList:payload}
    }
  },

}

export default SearchModel;
