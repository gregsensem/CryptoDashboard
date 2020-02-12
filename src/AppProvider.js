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
            confirmFavorites:this.confirmFavorites,
            setCurrentFavorite:this.setCurrentFavorite,
            setFilteredCoins:this.setFilteredCoins
         }
    }

    componentDidMount =()=>{
        this.fetchConins();
        this.fetchPrices();
    }

    fetchConins = async()=>{
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
    } 

    fetchPrices = async() =>{
        if(this.state.firstVisit) return;
        let prices = await this.prices();
        prices = prices.filter(price=>Object.keys(price).length);
        this.setState({prices});
    }

    prices = async() => {
         let returnData = [];
         for(let i=0; i<this.state.favorites.length; i++){
             try {
                 let priceData = await cc.priceFull(this.state.favorites[i],'USD');
                 returnData.push(priceData)
             } catch(e){
                 console.warn('fetch price error',e);
             }
        }
        return returnData;
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
        let {favorites,currentFavorite} = cryptoDashData;
        return {favorites,currentFavorite}
    }

    confirmFavorites=()=>{
        let currentFavorite = this.state.favorites[0];
        this.setState({
            firstVisit:false, 
            page:'dashboard',
            currentFavorite
        },()=>{
            this.fetchPrices();
        })
        localStorage.setItem('cryptoDash',JSON.stringify({
            favorites:this.state.favorites,
            currentFavorite
        }));
    }  

    setCurrentFavorite = (sym) =>{
        this.setState({
            currentFavorite:sym
        })
        localStorage.setItem('cryptoDash',JSON.stringify({
            ...JSON.parse(localStorage.getItem('cryptoDash')),
            currentFavorite:sym
        }))
    }

    setPage = page => this.setState({page});

    setFilteredCoins = (filteredCoins) => this.setState({filteredCoins})

    render(){
        return(
            <AppContext.Provider value = {this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
 }
  