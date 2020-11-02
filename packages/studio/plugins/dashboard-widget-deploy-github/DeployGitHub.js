import React, { useState, useEffect, useRef } from 'react'
import fetch from 'node-fetch'
import styles from './DeployGitHub.css'
function useInterval(callback, delay) {
  const savedCallback = useRef()
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
const DeployGitHub = () => {
  const role = localStorage.getItem('role')
  const [deployingStudio, setDeployingStudio] = useState(false)
  const [deployingWeb, setDeployingWeb] = useState(false)
  const [disableStudio, setDisableStudio] = useState(false)
  const [disableWeb, setDisableWeb] = useState(false)
  const deployStudio = () => {
    setDeployingStudio(true)
    setDisableStudio(true)
    fetch(
      'https://c2je1jc4ub.execute-api.eu-central-1.amazonaws.com/beta/stackbot/add-webhook/4d56f34f-80e6-438f-acb1-3272046a158f/productdevelopmentatneemconsulting/phillipians-beauty',
      {
        method: 'POST',
        body: JSON.stringify({ event_type: 'studio-build-deploy' }),
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then(res => res.json())
      .then(() => {
        setTimeout(() => setDeployingStudio(false), 180000)
        setTimeout(() => setDisableStudio(false), 180000)
      })
  }
  const deployWeb = () => {
    setDeployingWeb(true)
    setDisableWeb(true)
    console.log(process.env.WEB_URL)
    console.log(process.env.INCOMING_HOOK_URL)
    let url = new URL(process.env['INCOMING_HOOK_URL'] || '');
    fetch(url,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then(res => res.json())
      .then(() => {
        setTimeout(() => setDeployingWeb(false), 600000)
        setTimeout(() => setDisableWeb(false), 600000)
      })
  }
  return (
    <>
      <div
        className={`${role.toLowerCase() == 'administrator' ? styles.container : styles.hidden}`}
      >
        <header className={styles.header}>
          <h2>Build & Deploy</h2>
        </header>
        <p className={styles.note}>
          NOTE: Because these sites are static builds, they need to be re-deployed to see the
          changes when documents are published.
        </p>
        <hr />
        <ul className={styles.mid_container}>
          {/* <li className={styles.list}>
            <figure>
              <img src="../../static/badge-studio.svg" />
              <figcaption>
                <a href="https://github.com/productdevelopmentatneemconsulting/phillipians-beauty/actions?query=workflow%3A%22Studio+%7C+Build+and+Deploy%22">
                  View Studio Deployment
                </a>
              </figcaption>
            </figure>
            <button
              className={styles.button}
              type="button"
              disabled={disableStudio}
              onClick={deployStudio}
            >
              {deployingStudio ? 'Deploying...' : 'Deploy'}
            </button>
          </li> */}

          <li className={styles.list}>
            <figure>
              <img src="../../static/badge.svg" />
              <figcaption>
                <a href="https://github.com/unilever-bpc/beauty-portal/actions">
                  View Web Deployment
                </a>
              </figcaption>
            </figure>
            <div>
              <button
                className={styles.button}
                type="button"
                onClick={deployWeb}
                disabled={disableWeb}
              >
                {deployingWeb ? 'Deploying...' : 'Deploy to Live'}
              </button>
            </div>
          </li>
        </ul>
        <div className={styles.link}>
          <a href="https://www.netlify.com/" target="_blank">
            Manage Sites at Netlify
          </a>
        </div>
      </div>
    </>
  )
}
export default DeployGitHub
