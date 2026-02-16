'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Menu as MenuIcon, ShoppingCart, Package, Users, BarChart, Settings, LogOut, Store } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const drawerWidth = 240;

const MENU_ITEMS = [
    { text: 'Point of Sale', icon: <ShoppingCart size={20} />, path: '/dashboard' },
    { text: 'Overview', icon: <BarChart size={20} />, path: '/dashboard/Overview' },
    { text: 'History', icon: <Package size={20} />, path: '/dashboard/History' },
    { text: 'Customers', icon: <Users size={20} />, path: '/dashboard/customers' },
    { text: 'Settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        router.push('/auth/login');
    };

    const drawer = (
        <div>
            <Toolbar className="bg-gray-900 text-white">
                <div className="flex items-center gap-2">
                    <Store className="text-blue-400" />
                    <Typography variant="h6" noWrap component="div" className="font-bold">
                        SaaS POS
                    </Typography>
                </div>
            </Toolbar>
            <Divider />
            <List className="px-2 py-4">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
                    return (
                        <ListItem key={item.text} disablePadding className="mb-1">
                            <ListItemButton
                                component={Link}
                                href={item.path}
                                className={`rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                                selected={isActive}
                            >
                                <ListItemIcon className={`min-w-[40px] ${isActive ? 'text-blue-700' : 'text-gray-500'}`}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        className: `font-medium ${isActive ? 'font-bold' : ''}`
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
            <Box className="mt-auto p-4">
                <ListItemButton onClick={handleLogout} className="rounded-lg text-red-600 hover:bg-red-50">
                    <ListItemIcon className="min-w-[40px] text-red-600">
                        <LogOut size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out" />
                </ListItemButton>
            </Box>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
                className="bg-white border-b border-gray-200 shadow-sm"
                color="inherit"
                elevation={0}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box className="flex items-center gap-4">
                        <Typography variant="body2" className="text-gray-600 hidden sm:block">
                            Welcome, Admin
                        </Typography>
                        <IconButton onClick={handleMenuClick} size="small">
                            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>A</Avatar>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            onClick={handleMenuClose}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogOut size={16} />
                                </ListItemIcon>
                                Sign out
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid #e5e7eb' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, minHeight: '100vh', bgcolor: '#f9fafb' }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
