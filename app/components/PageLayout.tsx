import React from 'react';

function PageLayout({children}:any) {
    return (
        <main className={' text-white overflow-x-hidden pr-0 md:pr-64 lg:pr-70 mx-auto h-screen'}>
            {children}
        </main>
    );
}

export default PageLayout;