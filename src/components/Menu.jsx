import React, { Component } from 'react'
import axios from "axios";

class Menu extends Component {
  state = {
    products: [],
    orderMessage: null
  }

  componentDidMount = async () => {
    let response = await axios.get("/products")
    this.setState({ products: response.data.products })
  }

  addToOrder = async (event) => {
    let id = event.target.parentElement.dataset.id
    let response = await axios.post('http://localhost:3000/api/v1/orders', { id: id } )
    this.setState({orderMessage: response.data.message})
  }

  render() {
    let menu
    let message
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
            <button onClick={this.addToOrder}>Add to order</button>
          </div>
        )
      })
    )

    this.state.orderMessage && (
      message = <p id="order-message">{this.state.orderMessage}</p>
    )

    return (
      <>
        <h2>Menu</h2>
        {message}
        <ul id="menu">
          {menu}
        </ul>
      </>
    )
  }
}

export default Menu;
