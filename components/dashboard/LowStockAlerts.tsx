'use client';

import * as React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip } from '@mui/material';
import { AlertTriangle } from 'lucide-react';

const LOW_STOCK_ITEMS = [
    { id: '1', name: 'Wireless Mouse', stock: 5 },
    { id: '4', name: 'Monitor 24"', stock: 2 },
    { id: '8', name: 'USB Hub', stock: 0 },
];

export default function LowStockAlerts() {
    return (
        <Box>
            <Box className="flex items-center gap-2 mb-4">
                <AlertTriangle className="text-orange-500" size={24} />
                <Box>
                    <Typography variant="h6" className="font-bold text-gray-800">Low Stock Alerts</Typography>
                    <Typography variant="body2" color="text.secondary">Items requiring attention</Typography>
                </Box>
            </Box>

            <List disablePadding>
                {LOW_STOCK_ITEMS.map((item, index) => (
                    <ListItem
                        key={item.id}
                        disableGutters
                        divider={index !== LOW_STOCK_ITEMS.length - 1}
                        className="py-3"
                    >
                        <ListItemAvatar>
                            <Avatar className="bg-orange-50 text-orange-600">
                                {item.name.charAt(0)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Typography className="font-medium text-gray-900">{item.name}</Typography>}
                            secondary={`Stock: ${item.stock}`}
                        />
                        <Chip
                            label={item.stock === 0 ? "Out of Stock" : "Low Stock"}
                            color={item.stock === 0 ? "error" : "warning"}
                            size="small"
                            variant="outlined"
                            className="font-medium"
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
