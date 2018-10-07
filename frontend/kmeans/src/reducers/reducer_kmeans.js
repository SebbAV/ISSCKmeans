import _ from 'lodash';
import { IRIS  } from '../actions';



export default function(state = {},action){
    console.log("seh")
    switch (action.type){
        case IRIS:
            return action.payload.data

        default:
            return state;
    }
}