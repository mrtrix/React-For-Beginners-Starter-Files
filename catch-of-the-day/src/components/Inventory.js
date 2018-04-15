import React from "react";
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import firebase from 'firebase';
import base, { firebaseApp } from '../base'

class Inventory extends React.Component {

  state = {
    uid: null,
    owner: null
  }

  componentDidMount() {
    // Check whether user's already logged in
    firebase.auth().onAuthStateChanged( user => {
      if(user) {
        this.authHandler({user});
      }
    });
  }

  authHandler = async (authData) => {
    // 1. Look up the current store in firebase
    const store = await base.fetch(this.props.storeId, {context: this});
    console.log(store);
    // 2. Claim it if there is no owner
    if(!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    // 3. Set the state of the inventory component to reflect the curent user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });

    console.log(authData)
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  }

  logout = async () => {
    console.log("Logged out");
    await firebase.auth().signOut();
    this.setState({ uid:null })
  }

  render() {
    const logout = <button onClick={this.logout}>Logout</button>

    // 1. Check logged in
    if(!this.state.uid) {
      return <Login authenticate={this.authenticate} />
    }

    // 2. Check ownership
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you're not the owner!</p>
          {logout}
        </div>
      )
    }

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key =>(
           <EditFishForm
             key={key}
             index={key}
             fish={this.props.fishes[key]}
             updateFish={this.props.updateFish}
             deleteFish={this.props.deleteFish}
           />
         ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Inventory;
