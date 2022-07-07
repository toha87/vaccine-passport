import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";

export const useModal = ({ modalTitle, modalBody}) => {

  const display =
    <div>
      <Button
        color="danger"
        onClick={function noRefCheck(){}}
      >
        Click Me
      </Button>
      <Modal
        toggle={function noRefCheck(){}}
      >
        <ModalHeader toggle={function noRefCheck(){}}>
          {modalTitle}
        </ModalHeader>
        <ModalBody>
          {modalBody}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={function noRefCheck(){}}
          >
            Submit
          </Button>
          {' '}
          <Button onClick={function noRefCheck(){}}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>;

  return {
    display
  }
}