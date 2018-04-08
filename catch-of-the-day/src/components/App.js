import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from '../sample-fishes';

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

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seefood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
      </div>
    );
  }
}

export default App;
