import React from 'react';

function PageLayout({children}:any) {
    return (
        <main className={'bg-gradient-to-b from-[#001F3F] to-[#001F3F] text-white overflow-x-hidden h-screen'}>
            {children}
        </main>
    );
}

export default PageLayout;