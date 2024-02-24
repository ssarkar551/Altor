import Image from "next/image";
import Table from "./devices/page";
import PiechartDemo from "./piechart/page"
import { Navbar } from "@/components/navbar";

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
      
    </>
  );
}
