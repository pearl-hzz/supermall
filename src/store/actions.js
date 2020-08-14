import {ADD_COUNT, ADD_CART} from './mutations-type'
export default {
  addCart(context, payload) {
    let oldProduct = null;
    // for(let item of state.cartList){
    //   if(item.iid === payload.iid){
    //     oldProduct = item
    //   }
    // }
    oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    if (oldProduct) {
      context.commit(ADD_COUNT, oldProduct)
    } else {
      context.commit(ADD_CART, payload)
    }

  }
}
