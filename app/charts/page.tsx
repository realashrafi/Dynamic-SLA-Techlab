import React from 'react';
import PageLayout from "@/app/components/PageLayout";
import TrendChartSection from "@/app/components/TrendChartSection";
import PathChartsSection from "@/app/components/PathChartsSection";

function Page() {
    return (
        <PageLayout>
            <TrendChartSection/>
            <PathChartsSection/>
        </PageLayout>
    );
}

export default Page;