'use client';

import * as React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const router = useRouter();
    const [step, setStep] = React.useState(1);
    const [loading, setLoading] = React.useState(false);

    const [formData, setFormData] = React.useState({
        phone: '',
        password: '',
        birthDate: '',
        documentId: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Box className="flex flex-col gap-y-5">
            {step === 1 ? (
                <>
                    <TextField
                        fullWidth
                        label="رقم الهاتف"
                        name="phone"
                        variant="outlined"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        label="كلمة المرور"
                        name="password"
                        type="password"
                        variant="outlined"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={() => setStep(2)}
                        disabled={!formData.phone || !formData.password}
                        className="h-12 bg-blue-600 rounded-xl"
                        endIcon={<ChevronRight size={18} />}
                    >
                        المتابعة
                    </Button>
                </>
            ) : (
                <>
                    <TextField
                        fullWidth
                        label="تاريخ الميلاد"
                        name="birthDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={formData.birthDate}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        label="رقم الوثيقة"
                        name="documentId"
                        value={formData.documentId}
                        onChange={handleChange}
                    />
                    <Box className="flex gap-3">
                        <Button
                            onClick={() => setStep(1)}
                            className="min-w-[56px] h-12 border-gray-200 text-gray-500 border rounded-xl"
                        >
                            <ChevronLeft size={20} />
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            onClick={() => {
                                setLoading(true);
                                setTimeout(() => router.push('/dashboard'), 1000);
                            }}
                            disabled={loading || !formData.birthDate || !formData.documentId}
                            className="h-12 bg-blue-600 rounded-xl"
                        >
                            {loading ? 'جاري التحقق...' : 'دخول'}
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
}