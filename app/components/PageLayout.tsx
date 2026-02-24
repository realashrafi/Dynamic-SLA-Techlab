import React from 'react';

function PageLayout({children}:any) {
    return (
        <main className={' text-white overflow-x-hidden h-screen'}>
            {children}
        </main>
    );
}

export default PageLayout;