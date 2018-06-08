import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import React from 'react';
import anime from 'animejs';

import styles from './megamenu.css';
import mainLogo from '../../../assets/images/react-logo.png';

class megaMenu extends React.Component {
    constructor(props) {
      super(props)
      // get props
      let {data = []} = this.props;

      // This binding is necessary to make `this` work in the callback
      this.checkDrawerState = this.checkDrawerState.bind(this);
      this.activeNextSlide = this.activeNextSlide.bind(this);

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
        shiftDown: false,
        isOpen: false,
        menuList,
        data
      }      
    }

    componentDidMount() {
      // bind keydown 
      document.onkeyup = (evt) => { 
        evt.preventDefault();
        let key = null;        
        switch (evt.keyCode) {          
          case 16:
            this.setState({shiftDown: false})   
          break   
          default:
        }
      }

      document.onkeydown = (evt) => { 
        evt.preventDefault();
        let key = null;        
        switch (evt.keyCode) {    
          case 16:
            this.setState({shiftDown: true})   
          break   
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
            key = 'ESC'
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
      
      // build initial menu
      this.buildInitial(this.state.data)
      
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
      let {menuList, numberOfSlides} = this.state    
      // build menuList data
      if (!!data.leads) {
        menuList[index] = data.leads;      
      } else {
        menuList[index] = []
      }
      // map tier data
      menuList[index].map((item) => {
        item.tier = index
        return item;
      })     
      
      // remove data thats unused
      for (let i = index + 1; i < numberOfSlides.length; i++) {
        menuList[i] = []
      }
      
      // add back property
      let hasBackCheck = menuList[index].filter((item) => {
        return !!item.goBack
      })        
      if (hasBackCheck.length === 0) {
        menuList[index].push({text: 'BACK', tier: index, goBack: true})      
      }

      
      // set state
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

      // map key logic
      numberOfSlides.forEach((val) => {
        menuList[val].map((item, index) => {
          // onclick default 
          //item.do = () => { console.log('do something') }
 
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

    findLastListItem() {
      let {menuList, numberOfSlides} = this.state;
      let lastItem = []
      numberOfSlides.forEach((val) => {
        let order = 0;
        menuList[val].map((item, index) => {  
          lastItem = item
          return null
        })          
      })   
      return lastItem;
    }

    findActiveItem() {
      let {menuList, numberOfSlides} = this.state;
      let activeItem = []
      let total = -1;
      numberOfSlides.forEach((val) => {
        let order = 0;
        menuList[val].map((item, index) => {  
          total++;
          if (item.active) {
            activeItem = item
          }
          return null
        })          
      })   
      return {activeItem, total}
    }

    findFirstItemInLastTier() {
      let {menuList, numberOfSlides} = this.state;
      let firstItem = [];
      numberOfSlides.forEach((val) => {
        menuList[val].map((item, index) => {          
          if (item.order === 0) {
            firstItem = item
          }
          return null
        })          
      })   
      return firstItem;
    }

    makeActiveViaId(id) {
      let {menuList, numberOfSlides} = this.state;
      let qItem = []
      numberOfSlides.forEach((val) => {
        menuList[val].map((item, index) => {  
          if (item.id === id) {
            qItem = item
          }
          return null
        })          
      })           
      this.makeActive(qItem.tier, qItem.order)
    }    

    closeLastSlide() {            
      if (this.findFirstItemInLastTier().tier > 0) {
        // close last slide if not the last one
        // first close the last open slide
        let lastItem = this.findLastListItem()            
        this.closeSlide(lastItem.tier - 1)

        // then make active the first item on the last open slide      
        this.makeActiveViaId(this.findFirstItemInLastTier().id)      
      } else {
        // otherwise close all 
        this.closeDrawer()
      }
    }

    keyPressLogic(key) {
      let {menuList, numberOfSlides, shiftDown} = this.state;
      if (this.state.isOpen) {
        // find item that has the active flag        
        let {activeItem, total} = this.findActiveItem();
        
        switch (key) {
          case 'ENTER': 
            this.activeNextSlide(activeItem)
          break     
          case 'ESC':             
            this.closeDrawer();
          break 
          case 'BACK':             
            this.closeLastSlide();
          break                                
          case 'TAB': 
            let next = shiftDown ? activeItem.id - 1 : activeItem.id + 1 
            if (!shiftDown) {            
              if (next <= total) {
                this.makeActiveViaId(next)            
              }
            } else {
              if (next >= 0) {                
                this.makeActiveViaId(next)            
              }       
            }                   
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
              if (!!i) {
                this.makeActive(i.tier, i.order)              
              }
            }
          break    
          case 'LEFT': 
            if (activeItem.onLeft !== null) {
              let i = this.findItemOnId(activeItem.onLeft)
              if (!!i) {
                this.makeActive(i.tier, i.order)              
              }
            }
          break                              
          default:
        }
      }
    }

    activeNextSlide(_item) {  
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
        let next = this.findFirstItemInLastTier();
        this.makeActive(next.tier, next.order)
      } else {
        this.closeSlide(_item.tier + 1)
      }    

      // if go back property is is availble
      if (!!_item.goBack) {
        this.closeSlide(_item.tier - 1)
        this.makeActiveViaId(this.findFirstItemInLastTier().id)      
      }

      // if do property is available, execute it
      if (!!_item.do) {
        _item.do()
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
      let {menuList, numberOfSlides} = this.state  
      // remove data thats unused
      for (let i = value + 1; i < numberOfSlides.length; i++) {
        menuList[i] = []

        anime.timeline()
          .add({
            targets: `.mm-container .slide-${i}`,
            easing: 'easeInOutQuad',
            translateX: (`${i * -100}%`),
            duration: 500,       
          })           
      }        
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

    makeid() {
      return Math.random().toString(36).substring(7);
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
                a(role="button" key=${this.makeid()} class=${item.active ? 'active' : ''} onClick=${() => this.activeNextSlide(item)} ) ${item.text} 
                  br
              `
              })}
          .mm-slide.slide-1
            ${menuList[1].map((item, index) => {     
              return pug`
                a(role="button" key=${this.makeid()} class=${item.active ? 'active' : ''} onClick=${() => this.activeNextSlide(item)} ) ${item.text}     
                  br
              `
            })}
          .mm-slide.slide-2
            ${menuList[2].map((item, index) => {
              return pug`
                a(role="button" key=${this.makeid()} class=${item.active ? 'active' : ''} onClick=${() => this.activeNextSlide(item)} ) ${item.text}     
                  br
              `
            })}
          .mm-slide.slide-3      
            ${menuList[3].map((item, index) => {   
              return pug`
                a(role="button" key=${this.makeid()} class=${item.active ? 'active' : ''} onClick=${() => this.activeNextSlide(item)} ) ${item.text}     
                  br
              `
            })}
          .mm-slide.slide-4
            ${menuList[4].map((item, index) => {  
              return pug`
                a(role="button" key=${this.makeid()} class=${item.active ? 'active' : ''} onClick=${() => this.activeNextSlide(item)} ) ${item.text}  
                  br
              `
            })}
      `
    }
}


megaMenu.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
};

export default megaMenu;
