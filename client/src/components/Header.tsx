import { Avatar, Box, Button, Popover } from "@mui/material";
import mflixLogo from '../assets/mflix-logo.png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../state-management/user"; // <-- import zustand store

export default function Header() {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    // Get reset actions from zustand
    const resetToken = useUserData(state => state.resetToken);
    const resetRole = useUserData(state => state.resetRole);

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
        setAnchorEl(null);
    };

    const handleLogout = () => {
        resetToken();
        resetRole(); 
        handleClose();
        navigate('/login');
    };

    return (
        <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
        >
            <Avatar src={mflixLogo} variant="rounded"/>

            <Box position="relative">
                <Avatar 
                    onClick={handleAvatarClick}
                    sx={{ cursor: 'pointer' }}
                >
                    T
                </Avatar>

                <Popover
                    open={openDialog}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{
                        sx: {
                            backgroundColor: 'white',
                            boxShadow: 3,
                            borderRadius: 1,
                            minWidth: 120,
                            mt: 1,
                        }
                    }}
                >
                    <Box sx={{ p: 1 }}>
                        <Button 
                            color="error" 
                            onClick={handleLogout}
                            fullWidth
                            sx={{ 
                                color: 'white',
                                fontWeight: 'bold',
                                backgroundColor: 'red',
                                '&:hover': {
                                    backgroundColor: 'rgb(151, 10, 0)'
                                }
                            }}
                        >
                            Log out
                        </Button>
                    </Box>
                </Popover>
            </Box>
        </Box>
    );
}
