import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";
import { X } from "lucide-react"; // Close icon

const Modal = ({
  children,
  fullScreen,
  style,
  zIndex = 1000,
  onClose,
  clickOutsideEnable = true,
}) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling when modal opens
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.style.overflow = ""; // Restore scrolling when modal closes
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      clickOutsideEnable && onClose();
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="modal-overlay" style={{ zIndex }}>
      {fullScreen ? (
        <div className="modal_container full_screen">{children}</div>
      ) : (
        <div className="backdrop_container">
          <div
            className="modal_container modal_design"
            ref={wrapperRef}
            style={style}
          >
            {children}
          </div>
        </div>
      )}
    </div>,
    document.getElementById("root")
  );
};

export default Modal;

export const ModalBody = ({ style, children }) => {
  return (
    <div className="modal_body_container scrollbar" style={style}>
      {children}
    </div>
  );
};
