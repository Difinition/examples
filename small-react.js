import React from 'react';
import Product from './Product';
import Basket from './Basket';
import './App.css';
import './css/btn.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cost: [],
      productsText: '',
      costText: '',
      saleText: '',
      saleMassive: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.saleClickHandler = this.saleClickHandler.bind(this);
  }

  saleClickHandler(event) {
    let cost = this.state.cost,
        length = cost.length,
        saleText = this.state.saleText,
        sum = 0, sale = [];

    cost.forEach((el) => sum += Number(el));

    cost.forEach((el, i) => sale[i] = Math.round(Number(el) - (Number(el) / sum * Number(saleText))));

    if (length > 0) {
      this.setState(state => ({
        saleMassive: sale,
        saleText: ''
      }));
    }
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  clickHandler(event) {
    event.preventDefault();

    const newItem = {
      products: this.state.productsText,
      cost: this.state.costText
    }

    if (this.state.productsText && this.state.costText) {
      this.setState(state => ({
      products: state.products.concat(newItem.products),
      cost: state.cost.concat(newItem.cost),
      productsText: '',
      costText: ''
    }));
    }
  }

  render() {
    return (
      <div className='main'>
        <Product productsText={this.state.productsText} costText={this.state.costText} handleChange={this.handleChange} click={this.clickHandler}/>
        <Basket products={this.state} saleClick={this.saleClickHandler} handleChange={this.handleChange}/>
      </div>
    )
  }
}

export default App;
