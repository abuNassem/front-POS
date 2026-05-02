'use client';

import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { Store, Menu, X } from 'lucide-react';

const navItems = [
    { label: 'المميزات', href: '#features' },
    { label: 'الأسعار', href: '#pricing' },
    { label: 'تواصل معنا', href: '#contact' },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <AppBar 
                position="sticky" 
                color="inherit" 
                elevation={0} 
                className="border-b border-gray-100 backdrop-blur-md bg-white/90 z-50"
            >
                <Container maxWidth="lg">
                    <Toolbar disableGutters className="justify-between">
                        {/* Logo & Brand */}
                        <Link href="/" className="flex items-center gap-2 no-underline text-inherit hover:opacity-80 transition-opacity">
                            <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-200">
                                <Store className="text-white" size={24} />
                            </div>
                            <Typography
                                variant="h6"
                                className="font-black tracking-tighter text-gray-900"
                                sx={{ fontSize: '1.25rem', fontFamily: 'var(--font-tajawal)' }}
                            >
                                SaaS POS
                            </Typography>
                        </Link>

                        {/* Desktop Navigation */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.href}
                                    component={Link}
                                    href={item.href}
                                    className="text-gray-600 font-bold hover:text-blue-600 transition-colors"
                                    sx={{ px: 2, fontFamily: 'var(--font-tajawal)' }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                            <Box className="w-px h-6 bg-gray-200 mx-2" />
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                href="/auth/login"
                                disableElevation
                                className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl font-bold py-2 shadow-lg shadow-blue-100"
                                sx={{ fontFamily: 'var(--font-tajawal)' }}
                            >
                                تسجيل الدخول
                            </Button>
                        </Box>

                        {/* Mobile Toggle Button */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ display: { md: 'none' } }}
                        >
                            <Menu size={28} className="text-gray-700" />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Navigation Drawer */}
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                PaperProps={{ className: "w-72 rounded-l-3xl p-4" }}
            >
                <Box className="flex justify-between items-center mb-8 px-2">
                    <Typography className="font-black text-blue-600">القائمة</Typography>
                    <IconButton onClick={handleDrawerToggle}>
                        <X size={24} />
                    </IconButton>
                </Box>
                <List>
                    {navItems.map((item) => (
                        <ListItem key={item.href} disablePadding>
                            <ListItemButton 
                                component={Link} 
                                href={item.href} 
                                onClick={handleDrawerToggle}
                                className="rounded-xl mb-1"
                            >
                                <ListItemText 
                                    primary={item.label} 
                                    primaryTypographyProps={{ className: "font-bold text-gray-700 text-right" }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Box className="mt-auto pb-6">
                    <Button
                        fullWidth
                        variant="contained"
                        component={Link}
                        href="/auth/login"
                        className="bg-blue-600 py-4 rounded-2xl font-black shadow-xl shadow-blue-100"
                    >
                        ابدأ الآن مجاناً
                    </Button>
                </Box>
            </Drawer>
        </>
    );
}