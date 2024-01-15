import { AppBar, Button, Toolbar } from '@mui/material';

export function Navbar() {
    return (
        <AppBar position="fixed" variant="elevation" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
            <Toolbar>
                <img src="/DevHunter.svg" alt="DevHunter" />
                <div style={{ flexGrow: 1 }} />
                <Button variant="contained">Generate new candidate</Button>
            </Toolbar>
        </AppBar>
    );
}
