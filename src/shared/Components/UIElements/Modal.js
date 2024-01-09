import { ReactDOM } from "react";
import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";

import "./Modal.css";

function OverLay(props) {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
      </form>

      <footer className={`modal__footer ${props.footerClass}`}>
        {props.footer}
      </footer>
    </div>
  );

  return createPortal(content, document.getElementById("modal-hook"));
}

function Modal(props) {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        mountOnEnter
        unmountOnExit
        timeout={200}
        in={props.show}
        classNames={"modal"}
      >
        <OverLay {...props} />
      </CSSTransition>
    </>
  );
}

export default Modal;
