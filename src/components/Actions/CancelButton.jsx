import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class CancelButton extends Component {
    state = {  }
    handleCancel = () => {
        this.props.history.push('/');
    }
    render() { 
        return ( 
            <Button color="secondary" className="cancel-button" onClick={ this.handleCancel }>Cancel</Button>
        )
    }
}
 
export default withRouter(CancelButton);