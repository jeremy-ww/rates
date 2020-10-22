import { BrowserRouter as Router, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import { Workbox } from 'workbox-window'
import ReactDOM from 'react-dom'
import { SWRConfig } from 'swr'
import React from 'react'

import { Menu } from 'antd'

import 'antd/dist/antd.css'

import Home from '@/pages/home'
import request from '@/utils/request'

const App = hot(function() {
  return (
    <SWRConfig value={{
      fetcher: request
    }}>
      <Router>
        <Menu selectedKeys={['home']} mode="horizontal">
          <Menu.Item key="home">
            Home
          </Menu.Item>
          <Menu.Item key="settings">
            Settings
          </Menu.Item>
        </Menu>

        <Route path="/" component={Home} />
        <Route path="/settings" component={Home} />
      </Router>
    </SWRConfig>
  )
})

ReactDOM.render(<App />, document.getElementById('app'))

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const wb = new Workbox('service-worker.js')
    wb.addEventListener('waiting', () => {
      if (window.confirm('New service worker available, Refresh now?')) {
        wb.addEventListener('controlling', () => {
          window.location.reload()
        })
        wb.messageSW({ type: 'SKIP_WAITING' })
      }
    })
    wb.register()
      .then(registration => {
        console.log('💖 SW registered:', registration)
      })
      .catch(registrationError => {
        console.log('🙈 SW registration failed:', registrationError)
      })
  })
}
