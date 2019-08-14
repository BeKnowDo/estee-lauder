import React, { Component } from 'react'
import {
  navigation,
  search,
  icon
} from './navigation.module.scss'

export default class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      links: [
        {
          name: `What's New`,
          url: '//google.com'
        },
        {
          name: `Products`,
          url: '//google.com'
        },
        {
          name: `Best-Sellers`,
          url: '//google.com'
        },
        {
          name: `Goodbyes`,
          url: '//google.com'
        },
        {
          name: `Stores`,
          url: '//google.com'
        },
        {
          name: `More`,
          url: '//google.com'
        }
      ]
    }
  }

  generateLinks = () => {
    return this.state.links.map((link, index) => {
      return (
        <li key={index}>
          <a href={link.url} title={link.name}>
            {link.name}
          </a>
        </li>
      )
    })
  }

  generateSearch = () => {
    return (
      <li className={search}>
        <i className={icon} />
      </li>
    )
  }

  render() {
    return (
      <nav className={navigation}>
        <ul>
          {this.generateLinks()}
          {this.generateSearch()}
        </ul>
      </nav>
    )
  }
}
