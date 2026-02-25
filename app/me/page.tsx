'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            router.replace('/login');
            return;
        }

        fetch('/api/auth/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (res) => {
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error || 'Unauthorized');
                }
                return res.json();
            })
            .then((data) => {
                setUser(data.user);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setErrorMsg(err.message);
                localStorage.removeItem('auth_token');
                router.replace('/login');
            });
    }, [router]);

    if (loading) return <div className="p-8 text-center">در حال بارگذاری...</div>;

    if (errorMsg) {
        return <div className="p-8 text-red-600 text-center">{errorMsg}</div>;
    }

    return (
        <div dir="rtl" className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">خوش آمدید، {user?.name || 'کاربر'}</h1>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
                <p className="mb-2"><strong>ایمیل:</strong> {user?.email}</p>
                <p><strong>ID:</strong> {user?._id}</p>
            </div>
        </div>
    );
}