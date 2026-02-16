'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { Store } from 'lucide-react';

export default function Header() {
    return (
        <AppBar position="sticky" color="inherit" elevation={0} className="border-b border-gray-200 backdrop-blur-sm bg-white/80">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Link href="/" passHref className="flex items-center gap-2 no-underline text-inherit cursor-pointer">
                        <Store className="text-blue-600" size={32} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            className="font-bold tracking-tight text-gray-900"
                            sx={{ display: { xs: 'none', md: 'flex' } }}
                        >
                            SaaS POS
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button color="inherit" component={Link} href="#features">
                            Features
                        </Button>
                        <Button color="inherit" component={Link} href="#pricing">
                            Pricing
                        </Button>
                        <Button color="inherit" component={Link} href="#contact">
                            Contact
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            href="/auth/login"
                            disableElevation
                        >
                            Sign In
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
