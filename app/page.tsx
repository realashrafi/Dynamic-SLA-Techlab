// app/page.tsx
'use client'

import {motion} from 'framer-motion'
import Hero from "@/app/components/Hero";
import ExecSummary from "@/app/components/ExecSummary";
import ProblemSection from "@/app/components/ProblemSection";
import BenefitsSection from "@/app/components/BenefitsSection";
import AnalysisMethod from "@/app/components/AnalysisMethod";
import ComparisonTable from "@/app/components/ComparisonTable";
import TrendChartSection from "@/app/components/TrendChartSection";
import PathChartsSection from "@/app/components/PathChartsSection";
import FactorsSection from "@/app/components/FactorsSection";
import SolutionArchitecture from "@/app/components/SolutionArchitecture";
import QuestionsAndThankYou from "@/app/components/QuestionsAndThankYou";
import DynamicDashboardSection from "@/app/components/DynamicDashboardSection";
import SlaFlowDiagram from "@/app/components/SlaFlowDiagram";
import Header from "@/app/components/Header";
import DynamicSlaDataModel from "@/app/components/DynamicSlaDataModel";
import RealTime from "@/app/components/RealTime";
import ImplementationPhases from "@/app/components/ImplementationPhases";

const staggerContainer = {
    hidden: {opacity: 1},
    visible: {
        opacity: 1,
        transition: {staggerChildren: 0.18},
    },
}

export default function Home() {
    return (
        <main className="bg-[#0A1F44] text-white overflow-x-hidden">
            <Header/>
            {/* Hero – full screen, no motion section wrapper */}
            <Hero/>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="relative z-10"
            >
            </motion.div>
            <ExecSummary/>
            <ProblemSection/>
            <QuestionsAndThankYou/>
            <BenefitsSection/>
            <AnalysisMethod/>
            <ComparisonTable/>
            <TrendChartSection/>
            <PathChartsSection/>
            <FactorsSection/>
            <SlaFlowDiagram/>
            <DynamicDashboardSection/>
            <SolutionArchitecture/>
            <DynamicSlaDataModel/>
            <RealTime/>
            <ImplementationPhases/>
        </main>
    )
}