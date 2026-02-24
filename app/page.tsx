// app/page.tsx
import Hero from "@/app/components/Hero";

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
            {/*<Header/>*/}
            <Hero/>
        </main>
    )
}