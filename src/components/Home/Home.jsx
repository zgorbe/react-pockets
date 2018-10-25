import React, { Component } from 'react';
import { pockectsRef } from '../../firebase';

class Home extends Component {
    state = { 
        pockets: []
    }
    
    componentWillMount() {
        pockectsRef.on('value', snapshot => {
            let array = [],
                resultObject = snapshot.val();

            array = Object.keys(resultObject).map(key => {
                return resultObject[key];
            });

            this.setState({ pockets: array });
        });
    }
    render() { 
        return ( 
            <div>
                {
                    this.state.pockets.map( (pocket, index) => {
                        return <div key={ index }>{ pocket.name }</div>
                    })
                }
            </div> 
        );
    }
}
 
export default Home;