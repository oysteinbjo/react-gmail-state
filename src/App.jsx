import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {

  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState("")

  const getUnreadEmails = emails.filter(email => email.read === false)

  const getStarredEmails = emails.filter(email => email.starred === true)

  let filteredEmails = emails

  if(hideRead) filteredEmails = getUnreadEmails
  if(currentTab === 'starred') filteredEmails = getStarredEmails

  const toggleRead = target => {
    const updatedEmails = emails.map(function(email){
      if (email === target) {
        return {...email, read: !email.read}
      }
      return email
    })
    setEmails(updatedEmails)
  }

  const toggleStarred = target => {
    const updatedEmails = emails.map(email => 
      email === target ? {...email, starred: !email.starred} : email
      )
    setEmails(updatedEmails)
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === 'inbox' ? ' active' : ''} `}
            onClick={() => {setCurrentTab("inbox")}}
          >
            <span className="label">Inbox</span>
            <span className="count">{getUnreadEmails.length}</span>
          </li>
          <li
            className={`item ${currentTab === 'starred' ? ' active' : ''} `}
            onClick={() => setCurrentTab("starred")}
          >
            <span className="label">Starred</span>
            <span className="count">{getStarredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => setHideRead(!hideRead)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {/* Render a list of emails here */}
        <ul>
          {filteredEmails.map((email, index) => (
            <li key={index} className={`email${email.read ? ' read' : ' unread'}`}>
              <div className='select'>
                <input
                  className='select-checkbox' 
                  type='checkbox'
                  checked={email.read}
                  onClick={() => toggleRead(email)}
                  />
              </div>
                <div className='star'>
                  <input
                    className='star-checkbox'
                    type='checkbox'
                    checked={email.starred}
                    onClick={() => toggleStarred(email)}
                  />
                </div>
                <div className='sender'>{email.sender}</div>
                <div className='title'>{email.title}</div>
            </li>
          ))}

        </ul>
      </main>
    </div>
  )
}

export default App
