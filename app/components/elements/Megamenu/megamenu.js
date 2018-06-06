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

      // TODO: convert into props
      // slide lists 
      let list1 = [
        {title: 'ITEM 1A'},
        {title: 'ITEM 2A'},
        {title: 'ITEM 3A'},
      ] 

      let list2 = [
        {title: 'ITEM 1B'},
        {title: 'ITEM 2B'},
        {title: 'ITEM 3B'},
        {title: 'ITEM 4B'},
        {title: 'ITEM 5B'},
      ]

      let list3 = [
        {title: 'ITEM 1C', do: () => { console.log('do something') }},
        {title: 'ITEM 2C', do: () => { console.log('do something') }},
        {title: 'ITEM 3C', do: () => { console.log('do something') }},
        {title: 'ITEM 4C', do: () => { console.log('do something') }},
      ] 

      // map keypress rules and list properties
      let matrixId = 0
      list1.map((item, index) => {        
        item.id = matrixId;        
        item.active = (index === 0);
        item.onDown = (index === list1.length - 1 ? list1.length - 1 : matrixId + 1)
        item.onRight = (list2.length > index ? list1.length + matrixId : null)
        item.onLeft = null
        item.onUp = (index === 0 ? 0 : matrixId - 1) 
        item.area = {self: 0, right: 1, left: 0};
        matrixId++;
        return item
      })

      list2.map((item, index) => {        
        item.id = matrixId;        
        item.active = false
        item.onDown = (index === list2.length - 1 ? null : matrixId + 1)
        item.onUp = (index === 0 ? null : matrixId - 1)                
        item.onLeft = (index >= list1.length ? null : matrixId - list1.length)        
        item.onRight = (index >= list3.length ? null : matrixId + list2.length)        
        item.area = {self: 1, right: 2, left: 0};
        matrixId++;
        return item
      })
      list3.map((item, index) => {      
        item.id = matrixId;        
        item.active = false
        item.onDown = (index === list3.length - 1 ? null : matrixId + 1)
        item.onUp = (index === 0 ? null : matrixId - 1)                
        item.onLeft = (index >= list2.length ? null : matrixId - list2.length)        
        item.onRight = null
        item.area = {self: 2, right: 2, left: 1};
        matrixId++;
        return item
      })   

      // component state
      this.state = {
        selected: 0,
        selectedMax: matrixId,
        currentSlide: 1,
        clickLock: false,
        isOpen: false,
        searchList: [...list1, ...list2, ...list3],
        lists: [list1, list2, list3]   
      }

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
    }

    componentDidMount() {
      this.closeAll();
    }


    keyPressLogic(key) {
      if (this.state.isOpen) {
        let {selected, searchList, currentSlide} = this.state;
        let c;
        switch (key) {
          case 'ENTER': 
            this.openSlide(currentSlide + 1)
          break     
          case 'BACK':             
            this.closeAll();
          break                      
          case 'TAB': 
            c = searchList.filter((item) => {
              return item.id === selected
            })        
            if (c[0].onDown !== null) {
              this.setState({selected: c[0].onDown})
              this.makeActive(c[0].area.self)
            }    
          break      
          case 'DOWN': 
            c = searchList.filter((item) => {
              return item.id === selected
            })        
            if (c[0].onDown !== null) {
              this.setState({selected: c[0].onDown})
              this.makeActive(c[0].area.self)
            }
          break
          case 'UP': 
            c = searchList.filter((item) => {
              return item.id === selected
            })        
            if (c[0].onUp !== null) {
              this.setState({selected: c[0].onUp})
              this.makeActive(c[0].area.self)
            }
          break   
          case 'RIGHT': 
            c = searchList.filter((item) => {
              return item.id === selected
            })        
            if (c[0].onRight !== null) {
              this.setState({selected: c[0].onRight})
              this.makeActive(c[0].area.right)
              if (c[0].area.right >= currentSlide) {
                this.openSlide(c[0].area.right + 1)
              }              
            }
          break    
          case 'LEFT': 
            c = searchList.filter((item) => {
              return item.id === selected
            })        
            if (c[0].onLeft !== null) {
              this.setState({selected: c[0].onLeft})
              this.makeActive(c[0].area.left)
            }
          break                              
          default:
        }
      }
    }

    activeSetOnClick(area, index, openSlide) {
      let {lists, currentSlide} = this.state;
      this.setState({selected: lists[area][index].id})
      setTimeout(() => {        
        this.makeActive(area)  
        if (openSlide !== null) {
          this.openSlide(openSlide)   
        }
      })
    }

    resetActive() {
      let {lists} = this.state;
      lists.map((list) => {
        return list.forEach((item) => {
          item.active = false
        })
      })      
    }

    makeActive(cell) {      
      let {selected, lists, currentSlide} = this.state;      
      this.resetActive();
      lists[cell].filter((item) => {        
        if (selected === item.id) { item.active = true }
        return item
      })
      this.setState({lists})
    }

    checkDrawerState() {
      if (!this.state.clickLock) {      
        this.setState(prevState => ({
          isOpen: !prevState.isOpen,
          clickLock: true
        }));

        if (this.state.isOpen) {
          this.closeAll()
        } else {
          // turn on first one by default
          this.state.lists[0][0].active = true
          this.openDrawer()
        }
      }

      let el = document.getElementsByTagName('html')[0];
      el.style.overflow = 'hidden';
    }

    closeAll() { 
      this.resetActive()   
      
      anime({
        targets: '.mm-container',
        translateX: ('-100%'),
        duration: 0
      })
      anime({
        targets: '.mm-container .slide-1',
        translateX: ('-100%'),
        duration: 0
      })
      anime({
        targets: '.mm-container .slide-2',
        translateX: ('-200%'),
        duration: 0
      })        
      anime({
        targets: '.mm-container .slide-3',
        translateX: ('-300%'),
        duration: 0,
        complete: () => {
          let el = document.getElementsByTagName('html')[0];
          el.style.overflow = 'auto';            
          this.setState({ clickLock: false, isOpen: false, selected: 0}); 
        }
      });      
    }

    openDrawer() {
      anime.timeline()
        .add({
          targets: '.mm-container',
          translateX: 0,
          easing: 'easeInOutQuad',
          duration: 0 
        })  
      this.openSlide(1)
    }

    openSlide(value) {     
      this.setState({currentSlide: value})

      for (let i = value; i <= 3; i++) {
        anime.timeline()
        .add({
          targets: `.mm-container .slide-${i}`,
          translateX: (`${i * -100}%`),
          duration: 0,       
        })     
      }
    
      anime.timeline()
        .add({
          targets: `.mm-container .slide-${value}`,
          easing: 'easeInOutQuad',
          translateX: ('0%'),
          duration: 200,
          complete: () => {
            this.setState(prevState => ({ clickLock: false }));             
          }            
        })             
    }

    closeSlide(value) {     
        for (let i = value + 1; i <= 3; i++) {
          anime.timeline()
          .add({
            targets: `.mm-container .slide-${i}`,
            translateX: (`${i * -100}%`),
            duration: 0,       
          })     
        }

        anime({
          targets: `.mm-container .slide-${value}`,
          easing: 'easeInOutQuad',
          translateX: (`${value * -100}%`),
          duration: 200         
        })       
    }

    render() {   
      let { lists, isOpen } = this.state      
      return pug`
        div(onKeyDown=${() => this.checkKeyPress()})
          a.mm-trigger(role="button" onClick=${this.checkDrawerState} )
            p ${isOpen ? 'close' : 'open'}
          .mm-container
            .mm-back-slide( onClick=${this.checkDrawerState} )
            .mm-slide.slide-1
              ${lists[0].map((item, index) => {
                item.key = `list_id_${index}`;
                return pug`
                  a(role="button" key=${item.key} class=${item.active ? 'active' : ''} onClick=${() => this.activeSetOnClick(0, index, 2)} ) ${item.title} ${item.active}      
                    br
                `
                })}
              // a(onClick=${(() => this.closeAll())}) Close
            .mm-slide.slide-2
              ${lists[1].map((item, index) => {
                item.key = `list_id_${index}`;
                return pug`
                  a(role="button" key=${item.key} class=${item.active ? 'active' : ''} onClick=${() => this.activeSetOnClick(1, index, 3)}) ${item.title} ${item.active}      
                    br
                `
                })}
              // a(onClick=${(() => this.closeSlide(2))}) Back
            .mm-slide.slide-3              
              ${lists[2].map((item, index) => {
                item.key = `list_id_${index}`;
                return pug`
                  a(role="button" key=${item.key} class=${item.active ? 'active' : ''} onClick=${() => this.activeSetOnClick(2, index, null)}) ${item.title} ${item.active}         
                    br
                `
              })}
              // a(onClick=${(() => this.closeSlide(3))}) Back
      `
    }     
}

megaMenu.propTypes = {

};

export default megaMenu;
