import React from 'react'
import { AppContext } from '../AppProvider';
import { CenterDiv } from './confirmbutton';

const WelcomeMessage = () => {
    return ( 
        <AppContext.Consumer>
            {({firstVisit}) =>
                firstVisit ? <div>Welcome to CryptoDash, please select your favorite coins to begin.{' '}</div>:null
            }
        </AppContext.Consumer>
     );
}
 
export default WelcomeMessage;  