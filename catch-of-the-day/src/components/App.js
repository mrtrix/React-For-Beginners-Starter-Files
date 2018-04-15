import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef) {
      this.setState({order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    const { params } = this.props.match;
    localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
  }

  addFish = fish => {
    // 1. Take a copy of existing state
    const fishes = {...this.state.fishes};
    //2. Add new fish
    fishes[`fish${Date.now()}`] = fish;
    //3. Set the new fishes object to state
    this.setState({
      fishes : fishes // because key and value are the same it can be used only fishes once
    })
  };

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  deleteFish = key => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null
    this.setState({ fishes });
  }

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
  }

  addToOrder = (key) => {
    // 1. Take a copy of state
    const order = {...this.state.order};
    // 2. Add to the order or update the number in the order
    order[key] = order[key] + 1 || 1;
    // 3. Update the state
    this.setState({ order });
  }

  removeFromOrder = (key) => {
    // 1. Take a copy of state
    const order = {...this.state.order};
    // 2. remove from order
    delete order[key];
    // 3. Update the state
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seefood Market" />
          <ul className="">
            {Object.keys(this.state.fishes).map(key =>
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            )}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId = {this.props.match.params.storeId}
         />
      </div>
    );
  }
}

export default App;
