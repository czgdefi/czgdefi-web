import React, { useState } from 'react'
import { hot } from 'react-hot-loader/root'
import { IntlProvider } from 'react-intl'
import Modal from './Modal'

import { useWallet, UseWalletProvider } from 'use-wallet'
function Blocks(props) {
  return (
    <div className={`c-block-item ${props.className}`}>
      <div className="c-block-attr">
        {props.name}
      </div>
      <div className="c-block-value">
        {props.value}{!props.showUnit && <span>CZG</span>}
      </div>
    </div>
  )
}

const base = [
  {
    name: '矿产产出',
    value: 999,
  },
  {
    name: '昨日挖矿产出',
    value: 80,
  },
  {
    name: '当前区块奖励',
    value: 0.0023,
  }
]

const total = [
  {
    name: '累计挖矿收益',
    value: 999,
  },
  {
    name: '可提取收益',
    value: 80,
  },
  {
    name: '当前可以提取收益',
    value: 0.0023,
  }
]

const power = [
  {
    name: '昨日矿机算力',
    value: 999,
  },
  {
    name: '双轨算力',
    value: 80,
  },
  {
    name: '引力算力',
    value: 12,
  }
]
function App() {
  const [powerStatus, setPowerStatus] = useState(false)
  const [outStatus, setOutstatus] = useState(false)
  const [selfStatus, setSelfStatus] = useState(false)
  const wallet = useWallet()
  const blockNumber = wallet.getBlockNumber()
  const { account, connect } = useWallet()

  return (
    <IntlProvider>
      <h1>Wallet</h1>
      {wallet.connected ? (
        <div>
          <div>Account: {wallet.account}</div>
          <div>Balance: {wallet.balance}</div>
          <button onClick={() => wallet.deactivate()}>disconnect</button>
        </div>
      ) : (
          <div>
            Connect:
            <button onClick={() => connect('injected')}>MetaMask</button>
            <button onClick={() => connect('walletconnect')}>Frame</button>
            <button onClick={() => connect('portis')}>Portis</button>
          </div>
        )}
      <div className="c-f-sb c-head">
        <h1 className="c-logo">CZG</h1>
        <div className="c-bag">
          您还未连接到钱包
        </div>
      </div>
      <div className="c-container">
        <div className="c-block-col">
          {
            base.map((item, index) => {
              return <Blocks className="col" {...item} key={index} />
            })
          }
        </div>


        <div className="c-block">
          <h3>提取收益</h3>
          {
            total.map((item, index) => {
              return <Blocks {...item} key={index} />
            })
          }
          <div className="c-button" onClick={() => setOutstatus(true)}>提取收益</div>
        </div>

        <div className="c-block">
          <h3>我的算力</h3>
          <div className="c-power">昨日全网算力：<span>102912</span></div>
          {
            power.map((item, index) => {
              return <Blocks showUnit={true} {...item} key={index} />
            })
          }
          <div>
            <div className="c-button" onClick={() => setPowerStatus(true)}>增加矿机算力</div>
            <div className="c-button c-button-line" onClick={() => setSelfStatus(true)}>增加双轨/引力算力</div>
          </div>
        </div>
      </div>
      <Modal
        visible={outStatus}
        title="提取收益"
        key="outsell"
        onOk={() => setOutstatus(false)}
      >
        <div className="c-form">
          <div className="c-form-label">当日可提取收益 <span>99CZG</span></div>
          <div className="c-input-col">
            <div className="c-input-inner">
              <input className="c-input" placeholder="请输入您要提取的CZG"></input>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        visible={powerStatus}
        title="增加矿工算力"
        okText="购买/增加算力"
        key="power"
        onOk={() => setPowerStatus(false)}
      >
        <div className="c-form">
          <div className="c-form-label">当日剩余算力额度 <span>911119USDT</span></div>
          <div className="c-input-col">
            <div className="c-input-inner">
              <div className="c-select">
                <select className="c-select-dom">
                  <option>10</option>
                  <option>20</option>
                  <option>60</option>
                  <option>100</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        visible={selfStatus}
        title="增加双轨/引力算力"
        onOk={() => setSelfStatus(false)}
      >
        <div className="c-form">
          <div className="c-form-label">输入邀请人地址增加算力</div>
          <div className="c-input-col">
            <input className="c-input" placeholder="请输入邀请人地址"></input>
          </div>
          <div className="c-input-col">
            <input className="c-input" placeholder="请输入被邀请人地址"></input>
          </div>
        </div>
      </Modal>
    </IntlProvider>
  )
}

export default hot(App)
