import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

const cc = require('cryptocompare');
const TIME_UNITES = 10;
 
 export const AppContext = React.createContext();

 export default class AppProvider extends Component {
    constructor(props){
        super(props);
        this.state = { 
            page:'dashboard',
            favorites:['BTC','ETH','XMR','DOGE'],
            currentFavorite:'',
            coinList:'',
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
        this.fetchCoins();
        this.fetchPrices();
        this.fetchHistorical();
    }

    fetchCoins = async()=>{
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
    } 

    fetchPrices = async() =>{
        if(this.state.firstVisit) return;
        let prices = await this.prices();
        prices = prices.filter(price=>Object.keys(price).length);
        this.setState({prices});
    }

    fetchHistorical = async() =>{
        if(this.state.firstVisit) return;
        let results = await this.historical();
        let historical = [
            {
                name:this.state.currentFavorite,
                data:results.map((ticker, index) => [
                    moment().subtract({months: TIME_UNITES-index}).valueOf(),
                    ticker.USD
                ])
            }
        ]
        this.setState({historical});
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

    historical = () =>{
        let promises = [];
        for (let units = TIME_UNITES; units>0; units--){
            promises.push(
                cc.priceHistorical(
                    this.state.currentFavorite,
                    ['USD'],  
                    moment().subtract({months: units}).toDate()
                )
            )
        }
        return Promise.all(promises);
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
            currentFavorite,
            prices:null,
            historical:null
        },()=>{
            this.fetchPrices();
            this.fetchHistorical();
        })
        localStorage.setItem('cryptoDash',JSON.stringify({
            favorites:this.state.favorites,
            currentFavorite
        }));
    }  

    setCurrentFavorite = (sym) =>{
        this.setState({
            currentFavorite:sym,
            historical:null
        },this.fetchHistorical);
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
  