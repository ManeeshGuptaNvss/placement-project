import React from 'react';
import Toolbar from './Toolbar'
import SideDrawer from './SideNav';
import Backdrop from "./Backdrop";
import {Route} from 'react-router-dom'

class Navbar extends React.Component{
    state={
        sideDrawerOpen:false
      }
      sideDrawerToggler=()=>{
        this.setState((cs)=>({sideDrawerOpen:!cs.sideDrawerOpen}))
      }
      backdropHandler=(handle={})=>{
        this.setState((cs)=>({sideDrawerOpen:false}))
       if((typeof handle)==="function") handle();
      }
      render() {
    
        let backdrop;
        if(this.state.sideDrawerOpen){
          
          backdrop=<Backdrop />
        }
        return (
          <div>
            <SideDrawer
              show={this.state.sideDrawerOpen}
              click={this.backdropHandler}
            />
            {backdrop}
            <Route
              render={({history}) => (
                <Toolbar sideDrawerToggler={this.sideDrawerToggler} history={ history}/>
              )}
            />
          </div>
        )
      }
}

export default Navbar;