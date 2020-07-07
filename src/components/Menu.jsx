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
    let productId = event.target.parentElement.dataset.id

    let credentials = await JSON.parse(sessionStorage.getItem("credentials"))
    let headers = {
      ...credentials,
      "Content-type": "application/json",
      Accept: "application/json"
    }

    let response
    if (this.state.orderId) {
      response = await axios.put(`/orders/${this.state.orderId}`, {
        product_id: productId
      }, {
        headers: headers
      })
    } else {
      response = await axios.post('/orders', {
        product_id: productId
      }, {
        headers: headers
      })
    }

    this.setState({
      orderMessage: {
        message: response.data.message, 
        id: productId
      },
      orderId: response.data.order.id
    })
  }

  render() {
    let menu
    this.state.products && (
      menu = this.state.products.map(product => {
        return (
          <div
            key={product.id}
            id={"product-" + product.id}
            data-id={product.id}
            data-price={product.price}
          >
            <p id="product-name">{product.name}</p>

            {this.props.authenticated && <button onClick={this.addToOrder}>Add to order</button>}

            {parseInt(this.state.orderMessage.id) === product.id && 
              <p id="order-message">{this.state.orderMessage.message}</p>
            }
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
