import React, { lazy } from 'react';
const BmiCanvas = lazy(() => import('./components/BmiCanvas'))
const FetusCanvas = lazy(() => import('./components/FetusCanvas'))
const FetusCanvasNICHD = lazy(() => import('./components/FetusCanvasNICHD'))
const Pregnogram = lazy(() => import('./components/Pregnogram'))
import { curve_api } from './components/api'
export {
    BmiCanvas,
    FetusCanvas,
    FetusCanvasNICHD,
    Pregnogram,
    curve_api
}