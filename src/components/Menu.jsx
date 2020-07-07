import React, { Component } from 'react'
import axios from "axios";

class Menu extends Component {
  state = {
    products: [],
    orderMessage: {},
    orderId: null
  }

  componentDidMount = async () => {
    let response = await axios.get("/products")
    this.setState({ products: response.data.products })
  }

  addToOrder = async (event) => {
    let id = event.target.parentElement.dataset.id

    let response
    if (this.state.orderId) {
      response = await axios.put(`http://localhost:3000/api/v1/orders/${this.state.orderId}`, { product_id: id })
    } else {
      response = await axios.post('http://localhost:3000/api/v1/orders', { product_id: id })
    }

    this.setState({ orderMessage: { id: id, message: response.data.message }, orderId: response.data.order_id })
  }

  render() {
    let menu
    this.state.products && (
      menu = this.state.products.map(product => {
        return (
          <div
            key={product.id}
            id={`product-${product.id}`}
            data-id={product.id}
            data-price={product.price}
          >
            <p id={"product-name"}>{product.name}</p>

            {`${product.description} ${product.price}`}

            {this.props.authenticated && <button onClick={this.addToOrder}>Add to order</button>}
            
            {parseInt(this.state.orderMessage.id) === product.id &&
              <p id='order-message'>{this.state.orderMessage.message}</p>}
          </div>
        )
      })
    )

    return (
      <>
        <h2>Menu</h2>
        <ul id="menu">
          {menu}
        </ul>
      </>
    )
  }
}

export default Menu;
