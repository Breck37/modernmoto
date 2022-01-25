import React from "react";
import { Modal } from "../../components";

export default {
  title: "components/Modal",
  component: Modal,
};

export const ModalNormal = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Modal>
        <h1>This is a normal modal</h1>
      </Modal>
    </div>
  );
};
