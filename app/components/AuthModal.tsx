"use client";

import { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "../../app/hooks/useAuth";
// client components can use context to get dataContext from the server
import { AuthenticationContext } from "../context/AuthContext";
import { Alert, CircularProgress } from "@mui/material";

// this is styled component
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 350,
  bgcolor: "background.paper",
  borderRadius: "10px",

  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignin }: { isSignin: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signin, signup } = useAuth();
  const { loadingContext, dataContext, errorContext } = useContext(AuthenticationContext);

  const renderContent = (signinContent: string, signupContent: string) => {
    return isSignin ? signinContent : signupContent;
  };

  /* `Two way binding` 
  is a technique in which changes made to a form input element are immediately
  reflected in the state of the component, and vice versa. In this code, 
  the `inputs` state object is updated whenever the user types into an input field, 
  and the input fields are pre-populated with the values from the `inputs` state object. 
  This allows for a seamless user experience where the form fields are always in sync with the component state. */
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs, // spread operator to copy the existing state
      /* `[e.target.name]: e.target.value` is updating the state object `inputs` with a new key-value
      pair. The key is the `name` attribute of the input field that triggered the `onChange` event,
      and the value is the new value of that input field. This allows for dynamic updating of the
      state object based on user input. */
      [e.target.name]: e.target.value, // update the state with the new value
    });
  };

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    faculty: "",
    password: "",
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (isSignin) {
      if (inputs.password && inputs.email) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.password &&
        inputs.faculty &&
        inputs.phone
      ) {
        return setDisabled(false);
      }
    }

    setDisabled(true);
  }, [inputs, isSignin]);

  const handleClick = () => {
    if (isSignin) {
      signin({ email: inputs.email, password: inputs.password }, handleClose);
    } else {
      signup(inputs, handleClose);
    }
  };

  return (
    <div>
      <button
        className={`${renderContent(
          "bg-green-400 text-white",
          ""
        )} border p-1 px-4 rounded mr-3`}
        onClick={handleOpen}
      >
        {renderContent("เข้าสู่ระบบ", "ลงทะเบียน")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-[350px] md:w-[400px]">
          {loadingContext ? (
            <div className="flex justify-center px-2 py-24">
              <CircularProgress />
            </div>
          ) : (
            <div className="p-2">
              {errorContext ? (
                <Alert severity="error" className="mb-4">
                  {errorContext}
                </Alert>
              ) : null}
              <div className="pb-2 mb-2 font-bold text-center uppercase border-b">
                <p className="text-sm">
                  {renderContent("เข้าสู่ระบบ", "สร้างบัญชี")}
                </p>
              </div>
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  {renderContent(
                    "ลงชื่อเข้าใช้บัญชีของคุณ",
                    "สร้างบัญชี KU sport ของคุณ"
                  )}
                </h2>
                <AuthModalInputs
                  inputs={inputs}
                  handleChangeInput={handleChangeInput}
                  isSignin={isSignin}
                />
                <button
                  className="w-full p-3 mb-5 text-sm text-white uppercase bg-green-600 rounded disabled:bg-gray-400"
                  disabled={disabled}
                  onClick={handleClick}
                >
                  {renderContent("เข้าสู่ระบบ", "สร้างบัญชี")}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
