import {configureStore} from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice'
import locationReducer from '../features/location/locationSlice'
import weatherReducer from '../features/weather/weatherSlice'
import ebirdsReducer from '../features/ebirds/ebirdsSlice'
import birdReducer from '../features/bird/birdSlice'
import lastReducer from '../features/last/lastSlice'
import sessionReducer from '../features/session/sessionSlice'
import singleReducer from '../features/singleBird/singleSlice'
import lastSessionReducer from '../features/lastSession/lastSessionSlice'
import seenReducer from '../features/seen/seenSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        location: locationReducer,
        weather: weatherReducer,
        ebirds: ebirdsReducer,
        bird: birdReducer,
        last: lastReducer,
        session: sessionReducer,
    single: singleReducer,
    lastSession: lastSessionReducer,
        seen: seenReducer
  },});