import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { CiCoffeeCup } from "react-icons/ci";
export default function ModalButton() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}><CiCoffeeCup />  Buy me a Coffee</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Pay now</ModalHeader>
              <ModalBody className="flex justify-center items-center  ">
                <p> 
                  <strong>
                    UPI - 8953176600@ybl
                  </strong>
                </p>
                
               {/* <Image src="upi.jpeg" alt="ybl" width={200} height={200}  /> */}
               <img src="upi.jpeg" alt="logo" className="w-[250px] h-[250px]"/>
              </ModalBody>
              <ModalFooter>
                {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button> */}
                <Button color="primary" onPress={onClose}>
                Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
