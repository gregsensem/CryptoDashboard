import React from 'react';
import {Tile} from '../Shared/Tile';
import { AppContext } from '../AppProvider';
import ReactHighcharts from 'react-highcharts';
import highchartsConfig from './HighchartsConfig';
import HighchartsTheme from './HighchartsTheme';
ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

export default function(){
    return(
        <AppContext.Consumer>
            {({historical})=>
                <Tile>
                    <ReactHighcharts config={highchartsConfig(historical)} />
                </Tile>
            }
        </AppContext.Consumer>
    )
}
