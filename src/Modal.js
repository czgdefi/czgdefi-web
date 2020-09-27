import React, { useState, useEffect } from 'react'
import { CSSTransition, Transition } from 'react-transition-group'
import { Scrollbars } from 'react-custom-scrollbars'

export default function Modal({ title, visible, children, onOk, style, okText ='确定' }) {
  return (
    <CSSTransition timeout={300} in={visible} classNames="p-pop" unmountOnExit>
      <div className="p-pop">
        <CSSTransition
          classNames="p-pop-panel"
          timeout={400}
          unmountOnExit
          in={visible}>
          <div className="p-pop-panel" style={style}>
            {title && <div className="p-pop-title">{title}</div>}
            <div className="p-pop-scroll">
              {children}
            </div>
            <div className="p-pop-bar">
              <div className="c-button" onClick={onOk}>{okText}</div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  )
}
