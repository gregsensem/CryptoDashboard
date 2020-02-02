import React, { Component } from 'react';
import _ from 'lodash';

const cc = require('cryptocompare')
 
 export const AppContext = React.createContext();

 export default class AppProvider extends Component {
    constructor(props){
        super(props);
        this.state = { 
            page:'dashboard',
            favorites:['BTC','ETH','XMR','DOGE'],
            MAX_FAVORITES:10,
            firstVisit:false,
            ...this.savedSettings(),
            setPage:this.setPage,
            addCoin:this.addCoin,
            removeCoin:this.removeCoin,
            isInFavorites:this.isInFavorites,
            confirmFavorites:this.confirmFavorites
         }
    }

    componentDidMount =()=>{
        this.fetchConins();
    }

    fetchConins = async()=>{
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
    } 

    addCoin = key =>{
        let favorites = [...this.state.favorites];
        if(favorites.length<this.state.MAX_FAVORITES){
            favorites.push(key);
            this.setState({favorites}); 
        }
    }

    removeCoin = key =>{
        let favorites = [...this.state.favorites];
            this.setState({favorites:_.pull(favorites,key)}); 
        
    }

    isInFavorites = key =>_.includes(this.state.favorites,key)

    savedSettings=()=>{
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if(!cryptoDashData){
            return({page:'settings',firstVisit:true});
        }
        let {favorites} = cryptoDashData;
        return {favorites}
    }

    confirmFavorites=()=>{
        this.setState({
            firstVisit:false, 
            page:'dashboard'
        })
        localStorage.setItem('cryptoDash',JSON.stringify({
            favorites:this.state.favorites
        }));
    }

    setPage = page => this.setState({page});

    render(){
        return(
            <AppContext.Provider value = {this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
 }
  