import React from 'react'
import WelcomeMessage from './welcomeMessage';
import ConfirmButton from './confirmbutton';
import Page from '../Shared/Page';

export default function(){
    return (
        <Page name="settings">
                <WelcomeMessage />
                <ConfirmButton />
        </Page>
    )
}
 