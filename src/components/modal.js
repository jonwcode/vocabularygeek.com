import ReactDOM from "react-dom";

const Modal = ({ children, el }) => {
  return ReactDOM.createPortal(children, document.body);
};

export default Modal;
