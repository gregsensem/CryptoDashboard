import React from 'react'
import WelcomeMessage from './welcomeMessage';
import ConfirmButton from './confirmbutton';
import Page from '../Shared/Page';
import CoinGrid from './CoinGrid'
import Search from './Search';

export default function(){
    return (
        <Page name="settings">
                <WelcomeMessage />
                <CoinGrid topSection />
                <ConfirmButton />
                <Search />
                <CoinGrid />
        </Page>
    )
}
  