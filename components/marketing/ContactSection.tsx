'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactSection() {
    return (
        <Box id="contact" className="bg-gray-900 text-white py-20">
            <Container maxWidth="lg">
                <Box className="text-center mb-12">
                    <Typography variant="h3" component="h2" className="font-bold mb-4">
                        Get in Touch
                    </Typography>
                    <Typography variant="h6" className="text-gray-400">
                        Have questions? We&apos;re here to help you grow your business.
                    </Typography>
                </Box>
                <Box className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <Box className="p-6 bg-gray-800 rounded-xl">
                        <Mail className="mx-auto text-blue-400 mb-4" size={32} />
                        <Typography variant="h6" className="font-bold mb-2">Email Us</Typography>
                        <Typography className="text-gray-400">support@saaspos.com</Typography>
                    </Box>
                    <Box className="p-6 bg-gray-800 rounded-xl">
                        <Phone className="mx-auto text-blue-400 mb-4" size={32} />
                        <Typography variant="h6" className="font-bold mb-2">Call Us</Typography>
                        <Typography className="text-gray-400">+1 (555) 123-4567</Typography>
                    </Box>
                    <Box className="p-6 bg-gray-800 rounded-xl">
                        <MapPin className="mx-auto text-blue-400 mb-4" size={32} />
                        <Typography variant="h6" className="font-bold mb-2">Visit Us</Typography>
                        <Typography className="text-gray-400">123 Tech Street, Silicon Valley</Typography>
                    </Box>
                </Box>
                <Box className="mt-12 text-center border-t border-gray-800 pt-8">
                    <Typography variant="body2" className="text-gray-500">
                        © {new Date().getFullYear()} SaaS POS System. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
