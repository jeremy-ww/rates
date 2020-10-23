import { BrowserRouter as Router, Route, useLocation, useHistory } from 'react-router-dom'
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react'
import { hot } from 'react-hot-loader/root'
import { Workbox } from 'workbox-window'
import ReactDOM from 'react-dom'
import { SWRConfig } from 'swr'
import { Menu } from 'antd'

import 'antd/dist/antd.css'

import Home from '@/pages/home'
import Settings from '@/pages/settings'
import request from '@/utils/request'

function Header () {
  const location = useLocation()
  const history = useHistory()

  const onMenuClick = useCallback(e => {
    history.push(e.key)
  }, [history])

  return (
    <Menu onClick={onMenuClick} selectedKeys={[location.pathname]} mode="horizontal">
      <Menu.Item key="/" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="/settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
    </Menu>
  )
}

const App = hot(function() {
  return (
    <SWRConfig value={{
      fetcher: request
    }}>
      <Router>
        <Header />

        <main style={{ padding: 40 }}>
          <Route path="/" exact component={Home} />
          <Route path="/settings" component={Settings} />
        </main>
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
