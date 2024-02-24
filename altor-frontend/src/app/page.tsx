import Image from "next/image";
import Table from "./devices/page";
import PiechartDemo from "./piechart/page"
import { Navbar } from "@/components/navbar";
import BarChart from "./barchart/page";

export default function Home() {
  return (
    <>
      <Navbar/>
      <div>
      <Table/>
      </div>
      <div className="">
        <PiechartDemo/>
      </div>
      <div>
        <BarChart/>
      </div>
      
    </>
  );
}
