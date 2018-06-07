import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import React from 'react';
import anime from 'animejs';

import styles from './megamenu.css';
import mainLogo from '../../../assets/images/react-logo.png';

class megaMenu extends React.Component {
    constructor() {
      super()

      // This binding is necessary to make `this` work in the callback
      this.checkDrawerState = this.checkDrawerState.bind(this);
      this.activeSetOnClick = this.activeSetOnClick.bind(this);

      // this is how many layers are available for menus
      let menuList = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: []
      }
            
      // // component state
      this.state = {   
        numberOfSlides: [0, 1, 2, 3, 4],             
        clickLock: false,
        isOpen: false,
        menuList  
      }      
    }

    componentDidMount() {
      // bind keydown 
      document.onkeydown = (evt) => { 
        evt.preventDefault();
        let key = null;        
        switch (evt.keyCode) {          
          case 37:
            key = 'LEFT'
          break
          case 39:
            key = 'RIGHT'
          break  
          case 38:
            key = 'UP'
          break
          case 40:
            key = 'DOWN'
          break   
          case 13:
            key = 'ENTER'
          break  
          case 9:
            key = 'TAB'
          break  
          case 27:
            key = 'BACK'
          break                                        
          case 8:
            key = 'BACK'
          break                                                  
          default:
            key = null
          break
        }
        this.keyPressLogic(key)     
      }; 
      
      // dummy data
      let data = [
        { 
          text: '1A', 
          leads: [
            {
              text: '_1A', 
              leads: [
                {text: '__1A', 
                  leads: [
                    {
                      text: '___1A', 
                      leads: [
                        {text: '____1A'},
                        {text: '____2A'},
                        {text: '____3A'},
                        {text: '____4A'},
                      ]
                    },
                    {text: '___2A'},
                  ]
                },
                {text: '__2A'},
                {text: '__3A'},
                {text: '__4A'},
                {text: '__5A'},
              ]
            },
            {
              text: '_1B', 
              leads: [
                {text: '__1B'},
              ]
            },
            {
              text: '_1C', 
              leads: [
                {text: '__1C'},
              ]
            }            
          ]
        },
        { 
          text: '2A', 
          leads: [
            {
              text: '_2A', 
              leads: [
                {text: '__2A'}
              ]
            }
          ]
        }        
      ]        
      
      // build initial menu
      this.buildInitial(data)
      // then hide from view until ready
      this.closeDrawer();
    }

    buildInitial(data) {
      let {menuList} = this.state                
      menuList[0] = data;
      menuList[0].map((item) => {
        item.tier = 0
        return item;
      })
      this.setState({menuList})    

      // build the first tier and setup matrix
      this.buildList(menuList[0], 1)
    }
    
    buildList(data, index) {     
      let {menuList} = this.state    
      if (!!data.leads) {
        menuList[index] = data.leads;      
      } else {
        menuList[index] = []
      }
      menuList[index].map((item) => {
        item.tier = index
        return item;
      })            
      this.setState({menuList})
      this.buildMatrix();
    }

    buildMatrix() {
      let {menuList, numberOfSlides} = this.state;

      let id = 0;       
      numberOfSlides.forEach((val) => {
        let order = 0;
        menuList[val].map((item, index) => {        
          item.id = id
          item.order = order                      
          if (item.active === undefined) {
            item.active = (val === 0 && index === 0)      
          }
          id++
          order++
          return item
        })
      })

      numberOfSlides.forEach((val) => {
        menuList[val].map((item, index) => {
          // get items on left
          let l = (val - 1) < 0 ? null : (val - 1)          
          item.onLeft = null;
          if (l !== null) {            
            item.onLeft = (!!menuList[l][index]) ? menuList[l][index].id : null
          }          

          // get items on right
          let r = (val + 1) >= numberOfSlides.length ? null : (val + 1)        
          item.onRight = null;
          if (r !== null) {            
            item.onRight = (!!menuList[r][index]) ? menuList[r][index].id : null
          }  
          
          // get items on up   
          let u = menuList[val][index - 1]       
          item.onUp = u === undefined ? null : u.id;

          // get items on down   
          let d = menuList[val][index + 1]       
          item.onDown = d === undefined ? null : d.id;          
          return item
        })
      })
      
      this.setState({menuList})
    }

    findItemOnId(id) {
      let {menuList, numberOfSlides} = this.state;      
      let result = null
      numberOfSlides.forEach((val) => {
        let order = 0;
        menuList[val].map((item, index) => {            
          if (item.id === id) {
            result = item
            return item
          }
          return null
        })          
      })
      return result;
    }

    resetActive(setToDefault = false) {
      let {menuList, numberOfSlides} = this.state      
      // clear all actives
      numberOfSlides.forEach((val) => {
        let order = 0;
        menuList[val].map((item, index) => {    
          item.active = false
          return item
        })
      })   
      // set first item to active by default (used for reset)
      if (setToDefault) {
        menuList[0][0].active = true
        this.setState({menuList})
      }
    }

    makeActive(tier, order) {
      this.resetActive() 
      let {menuList} = this.state;
      menuList[tier][order].active = true;
      this.setState({menuList})
    }

    keyPressLogic(key) {
      let {menuList, numberOfSlides} = this.state;
      if (this.state.isOpen) {
        // find item that has the active flag        
        let activeItem = []
        numberOfSlides.forEach((val) => {
          let order = 0;
          menuList[val].map((item, index) => {  
            if (item.active) {
              activeItem = item
            }
            return item.active
          })          
        })
        
        switch (key) {
          case 'ENTER': 
            this.activeSetOnClick(activeItem)
          break     
          case 'BACK':             
            this.closeDrawer();
          break                      
          case 'TAB': 
            // c = searchList.filter((item) => {
            //   return item.id === selected
            // })        
            // if (c[0].onDown !== null) {
            //   this.setState({selected: c[0].onDown})
            //   this.makeActive(c[0].area.self)
            // }    
          break      
          case 'DOWN':             
            if (activeItem.onDown !== null) {
              let i = this.findItemOnId(activeItem.onDown)
              this.makeActive(i.tier, i.order)              
            }
          break
          case 'UP': 
            if (activeItem.onUp !== null) {
              let i = this.findItemOnId(activeItem.onUp)
              this.makeActive(i.tier, i.order)              
            }
          break   
          case 'RIGHT': 
            if (activeItem.onRight !== null) {
              let i = this.findItemOnId(activeItem.onRight)
              this.makeActive(i.tier, i.order)              
            }
          break    
          case 'LEFT': 
            if (activeItem.onLeft !== null) {
              let i = this.findItemOnId(activeItem.onLeft)
              this.makeActive(i.tier, i.order)              
            }
          break                              
          default:
        }
      }
    }

    activeSetOnClick(_item) {  
      let {menuList} = this.state
      // build next tier
      this.buildList(_item, _item.tier + 1)    

      // clear all actives
      this.resetActive()

      // set item to active state
      _item.active = true;

      // open/close next slides
      if (!!_item.leads && _item.leads.length > 0) {        
        this.openSlide(_item.tier + 1)    
      } else {
        this.closeSlide(_item.tier + 1)
      }    
    }

    checkDrawerState() {
      // if drawer is closed and unlocked, open it and vice versa
      if (!this.state.clickLock) {      
        this.setState(prevState => ({
          isOpen: !prevState.isOpen,
          clickLock: true
        }));
        if (this.state.isOpen) {
          this.closeDrawer()
        } else {                    
          this.openDrawer()
          // hide the scroll bar
          let el = document.getElementsByTagName('html')[0];
          el.style.overflow = 'hidden';          
        }
      }
    }

    closeDrawer() { 
      anime({
        targets: '.mm-container',
        translateX: ('-100%'),
        duration: 0
      })      
      this.resetActive(true);
      this.closeAllSlides();
      this.setState({ clickLock: false, isOpen: false});       

      // reveal the scroll bar
      let el = document.getElementsByTagName('html')[0];
      el.style.overflow = 'auto';                  
    }

    openDrawer() {
      anime.timeline()
        .add({
          targets: '.mm-container',
          translateX: 0,
          easing: 'easeInOutQuad',
          duration: 0 
        })  
      this.openSlide(0)
    }

    openSlide(value) {     
      this.closeAllSlides(value);
      anime.timeline()
        .add({
          targets: `.mm-container .slide-${value}`,
          easing: 'easeInOutQuad',
          translateX: ('0%'),
          duration: 400,          
          complete: () => {
            this.setState(prevState => ({ clickLock: false }));             
          }            
        })             
    }

    closeSlide(value) {     
        let {numberOfSlides} = this.state
        numberOfSlides.forEach((i) => {
          anime.timeline()
            .add({
              targets: `.mm-container .slide-${i}`,
              translateX: (`${i * -100}%`),
              duration: 0,       
            })     
        })
    }

    closeAllSlides(startAt = 0) {
      let {numberOfSlides} = this.state
      for (let i = startAt; i <= numberOfSlides.length; i++) {        
        anime({
          targets: `.mm-container .slide-${i}`,
          translateX: (`${(i + 1) * -100}%`),
          duration: 0,       
        })     
      }      
    }

    render() {
      let { menuList, isOpen } = this.state 
      return pug`
      div(onKeyDown=${() => this.checkKeyPress()})
        a.mm-trigger(role="button" onClick=${this.checkDrawerState} )
          p ${isOpen ? 'close' : 'open'}
        .mm-container
          .mm-back-slide( onClick=${this.checkDrawerState} )
          .mm-slide.slide-0
            ${menuList[0].map((item, index) => {                            
              return pug`
                a(role="button" key=${item.text} class=${item.active ? 'active' : ''} onClick=${() => this.activeSetOnClick(item)} ) ${item.text} ${item.active}      
                  br
              `
              })}
          .mm-slide.slide-1
            ${menuList[1].map((item, index) => {     
              return pug`
                a(role="button" key=${item.text} class=${item.active ? 'active' : ''} onClick=${() => this.activeSetOnClick(item)} ) ${item.text} ${item.active}      
                  br
              `
            })}
          .mm-slide.slide-2
            ${menuList[2].map((item, index) => {
              return pug`
                a(role="button" key=${item.text} class=${item.active ? 'active' : ''} onClick=${() => this.activeSetOnClick(item)} ) ${item.text} ${item.active}      
                  br
              `
            })}
          .mm-slide.slide-3      
            ${menuList[3].map((item, index) => {   
              return pug`
                a(role="button" key=${item.text} class=${item.active ? 'active' : ''} onClick=${() => this.activeSetOnClick(item)} ) ${item.text} ${item.active}      
                  br
              `
            })}
          .mm-slide.slide-4
            ${menuList[4].map((item, index) => {  
              return pug`
                a(role="button" key=${item.text} class=${item.active ? 'active' : ''} onClick=${() => this.activeSetOnClick(item)} ) ${item.text} ${item.active}      
                  br
              `
            })}
      `
    }
}

megaMenu.propTypes = {

};

export default megaMenu;
