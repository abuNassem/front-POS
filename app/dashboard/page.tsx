'use client';

import * as React from 'react';
import {
    Typography,
    Box,
    TextField,
    InputAdornment,
    Card,
    CardContent,
    CardActions,
    Button,
    IconButton,
    Divider,
    List,
    ListItem,
    Paper
} from '@mui/material';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Search, Scan, Plus, Trash2, Minus, CreditCard, Banknote } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useBarcodeScanner } from '@/hooks/useBarcodeScanner';
import { api } from '@/services/api';
import { Product } from '@/types';

function Alert({ message }: { message: string | null }) {
    if (!message) return null;
    return (
        <Box className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50">
            {message}
        </Box>
    );
}

export default function POSPage() {
    const { cart, addToCart, removeFromCart, updateQuantity, clearCart, total } = useCart();
    const [products, setProducts] = React.useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);
    const [transactionId, setTransactionId] = React.useState('');

    React.useEffect(() => {
        api.products.getAll().then(setProducts);
        setTransactionId((Math.random() * 10000).toFixed(0));
    }, []);

    const handleScan = async (decodedText: string) => {
        const product = products.find(p => p.barcode === decodedText);
        if (product) {
            addToCart(product);
        } else {
            setError(`Product not found: ${decodedText}`);
            setTimeout(() => setError(null), 3000);
        }
    };

    const { startScanning, stopScanning, isScanning } = useBarcodeScanner({
        onResult: handleScan,
        fps: 10,
        qrbox: 250
    });

    const toggleScanner = () => {
        if (isScanning) {
            stopScanning();
        } else {
            setTimeout(() => startScanning('reader'), 100);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.barcode.includes(searchQuery)
    );

    const handleCheckout = async () => {
        if (cart.length === 0) return;
        try {
            await api.sales.create(cart, total, 'cash');
            clearCart();
            setTransactionId((Math.random() * 10000).toFixed(0));
            alert('تمت عملية البيع بنجاح!');
        } catch (e) {
            setError('Checkout failed');
        }
    };

    return (
        <DashboardLayout>
            <Alert message={error} />
            <Box className="h-[calc(100vh-100px)] flex flex-col md:flex-row gap-4">

                {/* Left Side: Product Selection */}
                <Box className="flex-grow flex flex-col md:w-2/3 gap-6">

                    {/* ENHANCED SEARCH SECTION - Centered and Larger */}
                    <Paper className="p-6 flex flex-col md:flex-row gap-4 items-center justify-center bg-white shadow-sm border border-gray-100 rounded-xl">
                        <TextField
                            fullWidth
                            placeholder="بحث عن طريق الاسم أو الباركود..."
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            // Increased Height and Font via InputProps
                            InputProps={{
                                className: "h-16 text-xl rounded-lg",
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search size={28} className="text-gray-400 ml-2" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            variant={isScanning ? "contained" : "outlined"}
                            color={isScanning ? "error" : "primary"}
                            onClick={toggleScanner}
                            startIcon={<Scan size={24} />}
                            // Larger Button
                            className="h-16 px-8 text-lg font-bold rounded-lg whitespace-nowrap border-2"
                        >
                            {isScanning ? 'إيقاف' : 'مسح باركود'}
                        </Button>
                    </Paper>

                    {/* Scanner Viewport */}
                    <div id="reader" className={`w-full ${isScanning ? 'block' : 'hidden'} rounded-lg overflow-hidden border-2 border-dashed border-blue-400 mb-4 bg-black`}></div>

                    {/* Product Grid */}
                    <Box className="flex-grow overflow-y-auto pr-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-start">
                        {filteredProducts.map(product => (
                            <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow h-full flex flex-col border border-gray-100" onClick={() => addToCart(product)}>
                                <Box className="h-32 bg-gray-50 flex items-center justify-center border-b border-gray-50">
                                    <Typography variant="h4" className="text-gray-300 font-bold uppercase">
                                        {product.name.charAt(0)}
                                    </Typography>
                                </Box>
                                <CardContent className="p-3 flex-grow">
                                    <Typography variant="subtitle1" className="font-bold leading-tight mb-1 text-gray-800">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.category}
                                    </Typography>
                                </CardContent>
                                <CardActions className="p-3 pt-0 flex justify-between items-center">
                                    <Typography variant="h6" color="primary" className="font-bold">
                                        ${product.price.toFixed(2)}
                                    </Typography>
                                    <Box className="bg-blue-600 text-white p-1 rounded-md">
                                        <Plus size={18} />
                                    </Box>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                </Box>

                {/* Right Side: Cart Summary */}
                <Paper className="md:w-1/3 flex flex-col shadow-xl border-l border-gray-200 rounded-xl overflow-hidden">
                    <Box className="p-4 border-b border-gray-200 bg-gray-900 text-white">
                        <Typography variant="h6" className="font-bold flex items-center gap-2">
                            <CreditCard size={20} /> السلة الحالية
                        </Typography>
                        <Typography variant="caption" className="text-gray-400">
                            رقم العملية: #{transactionId}
                        </Typography>
                    </Box>

                    <List className="flex-grow overflow-y-auto px-2">
                        {cart.length === 0 ? (
                            <Box className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                                <ShoppingCartIcon size={64} className="mb-4 opacity-20" />
                                <Typography>السلة فارغة</Typography>
                            </Box>
                        ) : (
                            cart.map(item => (
                                <ListItem key={item.id} divider className="py-4">
                                    <Box className="flex-grow">
                                        <Box className="flex justify-between mb-1">
                                            <Typography variant="subtitle1" className="font-bold">{item.name}</Typography>
                                            <Typography variant="subtitle1" className="font-bold text-blue-600">${(item.price * item.quantity).toFixed(2)}</Typography>
                                        </Box>
                                        <Box className="flex items-center justify-between mt-2">
                                            <Typography variant="body2" color="text.secondary">
                                                ${item.price.toFixed(2)} وحدة
                                            </Typography>
                                            <Box className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1">
                                                <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-0">
                                                    <Minus size={16} />
                                                </IconButton>
                                                <Typography variant="body2" className="font-bold min-w-[20px] text-center">{item.quantity}</Typography>
                                                <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-0">
                                                    <Plus size={16} />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <IconButton edge="end" onClick={() => removeFromCart(item.id)} className="ml-4 text-gray-300 hover:text-red-500">
                                        <Trash2 size={20} />
                                    </IconButton>
                                </ListItem>
                            ))
                        )}
                    </List>

                    <Box className="p-6 bg-gray-50 border-t border-gray-200">
                        {/* TAX REMOVED AS REQUESTED */}
                        <Box className="flex justify-between mb-6">
                            <Typography variant="h4" className="font-black">الإجمالي</Typography>
                            <Typography variant="h4" className="font-black text-blue-700">${total.toFixed(2)}</Typography>
                        </Box>

                        <Box className="flex flex-col gap-3">
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                startIcon={<Banknote size={24} />}
                                size="large"
                                onClick={handleCheckout}
                                disabled={cart.length === 0}
                                className="py-4 text-xl font-bold shadow-none rounded-xl"
                            >
                                دفع نقدي (Cash)
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<CreditCard size={24} />}
                                size="large"
                                onClick={handleCheckout}
                                disabled={cart.length === 0}
                                className="py-4 text-xl font-bold rounded-xl border-2"
                            >
                                بطاقة بنكية
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </DashboardLayout>
    );
}

// Icon component (remains the same)
function ShoppingCartIcon({ size, className }: { size?: number, className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    )
}