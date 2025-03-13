import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const AuthModal = ({
  type,
  open,
  onClose,
  switchAuthModal,
}: {
  type: "login" | "register";
  open: boolean;
  onClose: () => void;
  switchAuthModal: (type: "login" | "register" | null) => void;
}) => {
  if (!open) return null;  

  return (
    <>
      <Modal open={open} onClose={onClose}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          
          <IconButton
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <CloseIcon />
          </IconButton>

          {/* Renderizar el formulario según el tipo */}
          {type === "login" ? (
          <LoginForm switchAuthModal={switchAuthModal} onClose={onClose}/>
        ) : (
          <RegisterForm onClose={onClose} />
        )}
        </Box>
      </Modal>
    </>
  );
};

export default AuthModal;
