import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './page/main/Nav';
import Main from './page/main/Main';
import Detail from './page/detail/Detail';
import Basket from './page/basket/Basket';
import './scss/chapter07.scss';

const App = () => {
    const [isNaviMenu, setIsNaviMenu] = useState(false);
    const [isDimed, setIsDimed] = useState(false);
    const [cateName, setCateName] = useState('');

    const onNaviMenu = () => {
        setIsNaviMenu(!isNaviMenu);
        setIsDimed(!isDimed);
    };

    return (
        <div className="App">
            <Nav 
                className={isNaviMenu ? "nav on" : "nav"}
                onNaviMenu={onNaviMenu}
                setIsDimed={setIsDimed}
                setIsNaviMenu={setIsNaviMenu}
            />
            <Switch>
                <Route exact path="/" render={() => <Main onNaviMenu={onNaviMenu} />} />
                <Route exact path="/detail" render={() => <Detail onNaviMenu={onNaviMenu} cateName={cateName} />} />
                <Route path="/detail/category/:id" render={() => <Detail onNaviMenu={onNaviMenu} cateName={cateName} />} />
                <Route exact path="/basket" render={() => <Basket onNaviMenu={onNaviMenu} />} />
            </Switch>
        </div>
    );
}

export default App;
