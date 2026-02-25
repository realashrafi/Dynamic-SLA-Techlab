import React from 'react';
import ExecSummary from "@/app/components/ExecSummary";
import PageLayout from "@/app/components/PageLayout";
import AnalysisMethod from "@/app/components/AnalysisMethod";
import ComparisonTable from "@/app/components/ComparisonTable";
import TrendChartSection from "@/app/components/TrendChartSection";
import PathChartsSection from "@/app/components/PathChartsSection";
import FactorsSection from "@/app/components/FactorsSection";

export default Page;

function Page() {
    return (
        <PageLayout>
            <AnalysisMethod/>
            <ComparisonTable/>
            <TrendChartSection/>
            <PathChartsSection/>
            <FactorsSection/>
        </PageLayout>
);
}
