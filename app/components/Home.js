import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import { Button } from 'react-photonkit';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2>Dissolution editor</h2>
          <Link to="/counter">
             <Button text="To counter"/>
          </Link>
        </div>
      </div>
    );
  }
}
