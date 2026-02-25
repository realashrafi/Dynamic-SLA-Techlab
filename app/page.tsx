// app/page.tsx
import Hero from "@/app/components/Hero";
import PageLayout from "@/app/components/PageLayout";
import ProblemSection from "@/app/components/ProblemSection";
import React from "react";
import BenefitsSection from "@/app/components/BenefitsSection";

const staggerContainer = {
    hidden: {opacity: 1},
    visible: {
        opacity: 1,
        transition: {staggerChildren: 0.18},
    },
}

export default function Home() {
    return (
        <PageLayout className=" text-white overflow-x-hidden">
            <ProblemSection/>
            <BenefitsSection/>
        </PageLayout>
    )
}