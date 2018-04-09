import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

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

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seefood Market" />
          <ul className="">
            {Object.keys(this.state.fishes).map(
              key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
            )}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
      </div>
    );
  }
}

export default App;
