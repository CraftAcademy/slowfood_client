import React, { Component } from 'react'
import axios from "axios";

class Menu extends Component {
  state = {
    products: []
  }

  componentDidMount = async () => {
    let response = await axios.get("/products")
    this.setState({ products: response.data.products })
  }

  render() {
    let menu
    this.state.products && (
      menu = this.state.products.map(product => {
        return (
          <li id={"product-" + product.id}>{product.name}</li>
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
