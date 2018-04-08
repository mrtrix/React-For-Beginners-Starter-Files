import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  constructor () {
    super();
    this.goToStore = this.goToStore.bind(this);
  }
  myInput = React.createRef();

  // optionally: goToStore = (event) => { no bind in constructor needed
  goToStore(event) {
    // 1. Stop form from submitting
    event.preventDefault();
    // 2. get the test from that input
    console.log(this.myInput.value.value);
    // 3. change the page to /store/a-store
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a Store</h2>
      <input type="text" ref={this.myInput} required placeholder="Store name" defaultValue={getFunName()} />
        <button type="submit">Visit Store →</button>
      </form>
    );
  }
}

export default StorePicker;
