import React, { Component } from 'react'
import fetch from 'cross-fetch'
import logo from '../../images/logo.png'

import {
  navigation,
  search,
  icon,
  searchContainer,
  opacity,
  results,
  product,
  imageContainer,
  details,
  resultsDetails,
  seeAll,
  inputWrapper,
  close
} from './navigation.module.scss'

export default class Navigation extends Component {
  constructor(props) {
    super(props)
    this.fetchURL = '/products'
    this.state = {
      searchValue: '',
      toggled: false,
      results: [],
      placeholder: 'What are you searching for?',
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

  fetchQuery = () => {
    const value = this.state.searchValue

    if (value.length > 3) {
      fetch(this.fetchURL)
        .then(response => response.json())
        .then(results => {
          this.setState({
            results
          })
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  handleInput = e => {
    const value = e.target.value
    this.setState({
      searchValue: value
    })
    this.fetchQuery()
  }

  handleMouseOver = e => {
    this.setState({
      toggled: true
    })
  }

  handleClose = e => {
    this.setState({
      toggled: false
    })
  }

  generateResults = () => {
    return (
      <>
        <div className={resultsDetails}>
          Displaying {this.state.results.length} of {this.state.results.length} results
          <a href='https://www.maccosmetics.com/esearch?form_id=perlgem_search_form&search=lipsticK#' className={seeAll}>See all results</a>
        </div>
        <ul className={results}>
          {
            this.state.results.map((result, index) => {
              return (
                <li key={index}>

                  <div className={imageContainer}>
                    <a href='/' title={result.name}>
                      <img src={result.image} alt={result.name} />
                    </a>
                  </div>

                  <div className={product}>

                    <h3>
                      <a href='/' title={result.name}>
                        {result.name}
                      </a>
                    </h3>

                    <div className={details}>
                      {result.tags.map((tag, index) => {
                        if (result.tags.length - 1 === index) {
                          return (
                            <span key={`tag-${index}`}>
                              {tag}
                            </span>
                          )
                        } else {
                          return (
                            <p key={`tag-${index}`}>
                              {tag},
                          </p>
                          )
                        }
                      })}
                    </div>

                  </div>

                </li>
              )
            })
          }
        </ul>
      </>
    )
  }

  generateSearch = () => {
    return (
      <li className={search}>
        <i className={icon}
          onMouseOver={this.handleMouseOver}
        />
        <div
          className={searchContainer}
        >

          {/* NEVER REMOVE INPUT FOCUS - ACCESSIBILITY MATTERS!!! */}
          <div className={inputWrapper}>
            <input
              type='text'
              value={this.state.searchValue}
              onChange={this.handleInput}
              placeholder={this.state.placeholder}
            />
          </div>

          {this.state.results.length > 0 ? this.generateResults() : null}

        </div>
      </li>
    )
  }

  generateOpacity = () => {
    return (
      <div className={opacity} />
    )
  }

  render() {
    return (
      <>
        <nav className={navigation}>
          <h1>
            <a href='/' title='Home page link'>
              <img src={logo} alt='Accessible friendly text here' />
            </a>
          </h1>
          <ul>
            {this.generateLinks()}
            {this.generateSearch()}
          </ul>

        </nav>
        {this.state.toggled ? this.generateOpacity() : null}
      </>
    )
  }
}
