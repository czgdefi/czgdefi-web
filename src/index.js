import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './styles.less'
import { useWallet, UseWalletProvider } from 'use-wallet'

ReactDOM.render(
  <UseWalletProvider
    chainId={1}
    connectors={{
      // This is how connectors get configured
      portis: { dAppId: 'my-dapp-id-123-xyz' },
    }}
  >
    <App />
  </UseWalletProvider>, document.getElementById('app'))
