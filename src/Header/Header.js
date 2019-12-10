import React, { Suspense, lazy   }  from 'react';
import '../css/header.css';
import {
  Link,
  Switch,
  Route
} from "react-router-dom";

const MortageCalculator = lazy(() => import('../Pages/MortageCalculator'));
const CalList = lazy(() => import('../Pages/calList/CalList'));

const Header = () => {
  return (
    <div id="headerDiv">
      <h2 id="headerText">Mortage Calculator</h2>
      <nav id="headerNav">
        <ul>
          <li>
            <Link to="/" className='textLink' ><p className="navP">MortageCalculator</p></Link>
          </li>
          <li>
            <Link to="/GetRates" className='textLink' ><p className="navP">Calculation List</p></Link>
          </li>
        </ul>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={MortageCalculator} />
          <Route path="/GetRates" component={CalList} />
        </Switch>
      </Suspense>
    </div>
    )
}

export default Header;