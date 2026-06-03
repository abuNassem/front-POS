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

import {
    ShoppingCart,
    Package,
    BarChart,
    LogOut,
    Store,
    History,
    Menu as MenuIcon,
    RefreshCw,
    CheckCircle2,
    CloudOff
} from 'lucide-react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useApi } from '@/context';
import OfflineBanner from '../offLine';

import { syncSale } from '@/services/sales';

import { db } from '@/localDB';

import { Sale } from '@/types/sale';

const drawerWidth = 260;

const MENU_ITEMS = [
    { text: 'الرئيسية', icon: <ShoppingCart size={20} />, path: '/dashboard' },
    { text: 'الإحصائيات', icon: <BarChart size={20} />, path: '/dashboard/Overview' },
    { text: 'المنتجات', icon: <Package size={20} />, path: '/dashboard/Products' },
    { text: 'السجل', icon: <History size={20} />, path: '/dashboard/History' }
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const pathname = usePathname();

    const router = useRouter();

    const { online } = useApi();

    const [userName, setUserName] = React.useState("");

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const [anchorEl, setAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const [needSync, setNeedSync] =
        React.useState<Sale[]>([]);

    const [syncLoading, setSyncLoading] =
        React.useState(false);

    const [syncSuccess, setSyncSuccess] =
        React.useState(false);

    const handleDrawerToggle = () =>
        setMobileOpen(!mobileOpen);

    const handleMenuClick = (
        event: React.MouseEvent<HTMLElement>
    ) => setAnchorEl(event.currentTarget);

    const handleMenuClose = () =>
        setAnchorEl(null);

    const syncSales = async () => {

        try {

            setSyncLoading(true);

            setSyncSuccess(false);

            const localSales =
                await db.invoices.toArray();

            setNeedSync(localSales);

            console.log("Need Sync", localSales);

            if (
                Array.isArray(localSales) &&
                localSales.length > 0
            ) {

                await syncSale(localSales);

                await db.invoices.clear();

                setNeedSync([]);

                setSyncSuccess(true);

                setTimeout(() => {
                    setSyncSuccess(false);
                }, 3000);
            }

        } catch (error) {

            console.log(error);

        } finally {

            setSyncLoading(false);
        }
    };

    React.useEffect(() => {

       

        const name = localStorage.getItem("name");

        if (name) {
            setUserName(name);
        }

    }, []);

    React.useEffect(()=>{
 const getLocalSales = async () => {

            const localSales =
                await db.invoices.toArray();

            setNeedSync(localSales);
        };

        getLocalSales();
    },[online,needSync])
    const handleLogout = () => {

        handleMenuClose();

        router.push('/auth/login');
    };

    const drawer = (
        <Box className="flex flex-col h-full bg-white" dir="rtl">

            <Toolbar className="bg-gray-900 text-white flex gap-3 px-4">

                <div className="bg-blue-500 p-1.5 rounded-lg shadow-lg shadow-blue-900/20">

                    <Store size={22} className="text-white" />

                </div>

                <Typography
                    variant="h6"
                    className="font-black tracking-tight"
                    sx={{ fontFamily: 'var(--font-tajawal)' }}
                >
                    SaaS POS
                </Typography>

            </Toolbar>

            <Divider />

            <List className="px-3 py-6 flex-grow">

                {MENU_ITEMS.map((item) => {

                    const isActive =
                        pathname === item.path ||
                        (
                            item.path !== '/dashboard' &&
                            pathname.startsWith(item.path)
                        );

                    return (
                        <ListItem
                            key={item.text}
                            disablePadding
                            className="mb-2"
                        >

                            <ListItemButton
                                component={Link}
                                href={item.path}
                                disabled={
                                    item.text != "الرئيسية" &&
                                    !online
                                }
                                prefetch={true}
                                onClick={() =>
                                    setMobileOpen(false)
                                }
                                className={`
                                    rounded-xl transition-all duration-200 group
                                    ${isActive
                                        ? 'bg-blue-50 text-blue-900'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                    }
                                `}
                                selected={isActive}
                            >

                                <ListItemIcon
                                    className={`
                                        min-w-[35px]
                                        ${isActive
                                            ? 'text-blue-700'
                                            : 'text-gray-400 group-hover:text-gray-700'
                                        }
                                    `}
                                >
                                    {item.icon}
                                </ListItemIcon>

                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        className: `
                                            text-sm
                                            ${isActive
                                                ? 'font-black'
                                                : 'font-bold'
                                            }
                                        `,
                                        style: {
                                            fontFamily: 'var(--font-tajawal)',
                                        }
                                    }}
                                />

                            </ListItemButton>

                        </ListItem>
                    );
                })}
            </List>

            <OfflineBanner />

            <Box className="p-4 border-t border-gray-50 bg-gray-50/50">

                <ListItemButton
                    onClick={handleLogout}
                    className="rounded-xl text-red-600 hover:bg-red-100/50 transition-colors"
                >

                    <ListItemIcon className="min-w-[35px] text-red-600">

                        <LogOut size={20} />

                    </ListItemIcon>

                    <ListItemText
                        primary="تسجيل الخروج"
                        primaryTypographyProps={{
                            className: "text-sm font-black",
                            style: {
                                fontFamily: 'var(--font-tajawal)'
                            }
                        }}
                    />

                </ListItemButton>

            </Box>

        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }} dir="rtl">

            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mr: { sm: `${drawerWidth}px` },
                    ml: 0,
                }}
                className="bg-white/80 backdrop-blur-md border-b border-gray-100"
                color="inherit"
                elevation={0}
            >

                <Toolbar className="justify-between">

                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            ml: 2,
                            display: { sm: 'none' }
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="subtitle2"
                        className="text-gray-400 font-medium hidden sm:block"
                    >
                        لوحة التحكم
                    </Typography>

                    <button
                        onClick={syncSales}
                        disabled={!online || syncLoading || needSync.length<1}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-xl
                            transition-all duration-300 text-sm font-bold
                            ${syncSuccess
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            }
                            disabled:opacity-50 disabled:cursor-not-allowed
                        `}
                    >

                        {syncLoading ? (

                            <RefreshCw
                                size={18}
                                className="animate-spin"
                            />

                        ) : syncSuccess ? (

                            <CheckCircle2 size={18} />

                        ) : (

                            <CloudOff size={18} />

                        )}

                        {
                            syncLoading
                                ? 'جاري المزامنة...'
                                : syncSuccess
                                    ? 'تمت المزامنة'
                                    : `مزامنة (${needSync.length})`
                        }

                    </button>

                    <Box className="flex items-center gap-3">

                        <Box className="text-left hidden sm:block">

                            <Typography
                                variant="body2"
                                className="font-bold text-gray-900 leading-none"
                            >
                                {userName || "مستخدم"}
                            </Typography>

                            <Typography
                                variant="caption"
                                className="text-gray-400"
                            >
                                مسؤول
                            </Typography>

                        </Box>

                        <IconButton
                            onClick={handleMenuClick}
                            size="small"
                            className="hover:bg-gray-100 transition-colors"
                        >

                            <Avatar className="bg-blue-600 w-9 h-9 text-sm font-bold shadow-md shadow-blue-100">

                                {userName[0]}

                            </Avatar>

                        </IconButton>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >

                            <MenuItem
                                onClick={handleLogout}
                                className="text-red-500 gap-2 font-bold text-sm py-3"
                            >

                                <LogOut size={16} />

                                خروج

                            </MenuItem>

                        </Menu>

                    </Box>

                </Toolbar>

            </AppBar>

            <Box
                component="nav"
                sx={{
                    width: { sm: drawerWidth },
                    flexShrink: { sm: 0 }
                }}
            >

                <Drawer
                    variant="temporary"
                    anchor="right"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>

                <Drawer
                    variant="permanent"
                    anchor="right"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>

            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4,
                    width: {
                        sm: `calc(100% - ${drawerWidth}px)`
                    },
                    minHeight: '100vh',
                    bgcolor: '#fcfcfd'
                }}
            >

                <Toolbar />

                {children}

            </Box>

        </Box>
    );
}