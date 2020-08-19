import {
  ADD_COUNT,
  ADD_CART
} from './mutations-type'
export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = null;
      oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit(ADD_COUNT, oldProduct)
        resolve('当前商品数量加1')
      } else {
        context.commit(ADD_CART, payload)
        resolve('加入购物车')
      }
    })

  }
}
