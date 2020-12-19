import React, {Component} from 'react';
import Auxiliary from './HOC/Auxiliary';
import Description from './components/Descriptions/Description';
import Logo from './components/Logo/Logo';
import Charts from './components/Charts/Charts';
import MyInfo from './components/MyInfo/MyInfo';
import {Route} from 'react-router-dom';
import Toolbar from './Toolbar/Toolbar';

class App extends Component {
  componentDidMount () {
    document.title = 'Rank to PP';
  }

  render () {
    return (
      <div className="App">
        <Auxiliary>
          <Toolbar />
          <Logo />
          <Route path="/whatisthis" component={Description}/>
          <Route path="/" component={Charts} />
          {/* <Route path="/mypp" component={MyPP} /> */}
          <MyInfo />
          <a href="https://info.flagcounter.com/FC7B">
            <img
              src="https://s01.flagcounter.com/count2/FC7B/bg_FFFFFF/txt_000000/border_CCCCCC/columns_6/maxflags_15/viewers_0/labels_1/pageviews_1/flags_0/percent_0/"
              alt="Flag Counter"
              border="0"
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '50%',
              }}
            />
          </a>
        </Auxiliary>
      </div>
    );
  }
}

export default App;
