import Image from "next/image";
import Table from "./devices/page";
import PiechartDemo from "./piechart/page"

export default function Home() {
  return (
    <>
      Dashboard
      <Table/>
      <div className="container">
        <PiechartDemo/>
      </div>
      
    </>
  );
}