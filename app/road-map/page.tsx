import React from 'react';
import PageLayout from "@/app/components/PageLayout";
import BenefitsSection from "@/app/components/BenefitsSection";
import SolutionArchitecture from "@/app/components/SolutionArchitecture";
import DynamicSlaDataModel from "@/app/components/DynamicSlaDataModel";
import RealTime from "@/app/components/RealTime";
import ImplementationPhases from "@/app/components/ImplementationPhases";

function Page() {
    return (
        <PageLayout>
            <SolutionArchitecture/>
            <DynamicSlaDataModel/>
            <RealTime/>
            <ImplementationPhases/>
        </PageLayout>
    );
}

export default Page;