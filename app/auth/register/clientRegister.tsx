'use client';

import * as React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/services/user';
import { useApi } from '@/context';

export default function RegisterForm() {
    const router = useRouter();
    
    const [step, setStep] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
const {setNotify}=useApi()
    const [formData, setFormData] = React.useState({
        name: '',
        phone: '',
        password: '',
        birthDate: '',
        documentId: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async() => {
        if(!formData.birthDate||!formData.name||!formData.password||!formData.documentId||!formData.phone){
            setNotify({type:'error',message:"fill your data"})
        }
        setLoading(true);
       const response=await registerUser(formData)
       if(response.status="success"){
               setTimeout(()=>{
                               localStorage.setItem('name',response.data.name)
                router.push('/dashboard')
                       setLoading(false)

               },500)
       }
                              setLoading(false)

      
    };

    return (
        <Box className="flex flex-col gap-y-5">
            {step === 1 ? (
                <>
                    <TextField 
                        fullWidth 
                        label="الاسم الكامل" 
                        name="name" 
                        variant="outlined" 
                        value={formData.name} 
                        onChange={handleChange} 
                    />
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
                        disabled={!formData.name || !formData.phone || !formData.password}
                        className="h-12 bg-green-600 hover:bg-green-700 rounded-xl"
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
                        label="رقم الوثيقة (الهوية)" 
                        name="documentId" 
                        value={formData.documentId} 
                        onChange={handleChange} 
                    />
                    <Box className="flex gap-3">
                        <Button 
                            onClick={() => setStep(1)} 
                            className="min-w-[56px] h-12 border-gray-200 text-gray-500 border rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </Button>
                        <Button 
                            fullWidth 
                            variant="contained" 
                            size="large" 
                            onClick={handleSubmit} 
                            disabled={loading || !formData.birthDate || !formData.documentId}
                            className="h-12 bg-green-600 hover:bg-green-700 rounded-xl"
                        >
                            {loading ? 'جاري الإنشاء...' : 'تسجيل الحساب'}
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
}